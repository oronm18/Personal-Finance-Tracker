"""
Module that handles the Budget Tracker API with json.

Author: Oron Moshe
date: 23/06/2023
"""
# ----- Import ----- #

import logging
import json
import os

from common.budget_api.abstract_budget_api_handler import AbstractBudgetApiHandler, USERS_FIELD, \
    USERS_DATA_SAVINGS_GOALS_FIELD, USERS_DATA_TRANSACTIONS_FIELD, USERS_DATA_FIELD, USERS_HASHED_PASSWORD_FIELD, \
    USERS_USERNAME_FIELD, USERS_DATA_SAVINGS_GOALS_ID_FIELD, USERS_DATA_TRANSACTIONS_FIELD_ID, SavingGoal, Transaction
from common.utils import generate_unique_id


class JsonBudgetApiHandler(AbstractBudgetApiHandler):
    """
    A json implementation of the budget api handler.
    """
    def __init__(self, filepath: str):
        self.filepath = filepath
        self.data = {}
        self.fetch_data()

    def get_users(self):
        self.fetch_data()
        return self.data[USERS_FIELD]

    def fetch_data(self):
        self.data = self.get_data()

    def get_data(self) -> dict:
        """
        Fetch data from json file.
        :return: Json content.
        """
        if not os.path.exists(self.filepath):
            return {USERS_FIELD: {}}

        with open(self.filepath, "r") as json_file:
            data = json.load(json_file)
        return data

    def write_json(self, data: dict):
        """
        Write to the json file.
        :param data: Data to write.
        """
        with open(self.filepath, "w") as json_file:
            json.dump(data, json_file, default=lambda x: x.dict(), indent=4)

    def fetch_transactions(self, user_id) -> list[Transaction]:
        self.fetch_data()
        if user_id not in self.data[USERS_FIELD]:
            return []
        user_data = self.data[USERS_FIELD][user_id][USERS_DATA_FIELD]
        return [Transaction(**t) for t in user_data.get(USERS_DATA_TRANSACTIONS_FIELD, [])]

    def fetch_savings_goals(self, user_id) -> list[SavingGoal]:
        self.fetch_data()
        if user_id not in self.data[USERS_FIELD]:
            return []
        user_data = self.data[USERS_FIELD][user_id][USERS_DATA_FIELD]
        return [SavingGoal(**sg) for sg in user_data.get(USERS_DATA_SAVINGS_GOALS_FIELD, [])]

    def add_transactions(self, user_id, transactions: list[Transaction]):
        self.data[USERS_FIELD][user_id][USERS_DATA_FIELD][USERS_DATA_TRANSACTIONS_FIELD] = [t.dict() for t in
                                                                                            transactions]
        self.write_json(self.data)

    def add_savings_goals(self, user_id, savings_goals: list[SavingGoal]):
        self.data[USERS_FIELD][user_id][USERS_DATA_FIELD][USERS_DATA_SAVINGS_GOALS_FIELD] = [sg.dict() for sg in
                                                                                             savings_goals]
        self.write_json(self.data)

    def remove_transaction(self, user_id, transaction_id):
        self.fetch_data()
        for item in self.data[USERS_FIELD][user_id][USERS_DATA_FIELD][USERS_DATA_TRANSACTIONS_FIELD]:
            if item[USERS_DATA_TRANSACTIONS_FIELD_ID] == transaction_id:
                self.data[USERS_FIELD][user_id][USERS_DATA_FIELD][USERS_DATA_TRANSACTIONS_FIELD].remove(item)
                self.write_json(self.data)
                return True
        return False

    def remove_saving_goal(self, user_id, saving_goal_id):
        self.fetch_data()
        for item in self.data[USERS_FIELD][user_id][USERS_DATA_FIELD][USERS_DATA_SAVINGS_GOALS_FIELD]:
            if item[USERS_DATA_SAVINGS_GOALS_ID_FIELD] == saving_goal_id:
                self.data[USERS_FIELD][user_id][USERS_DATA_FIELD][USERS_DATA_SAVINGS_GOALS_FIELD].remove(item)
                self.write_json(self.data)
                return True
        return False

    def add_new_user(self, username, hashed_password):
        self.fetch_data()
        user_id = generate_unique_id()
        if user_id in self.data[USERS_FIELD]:
            logging.warning("User already exist, delete previous one")
        self.data[USERS_FIELD][user_id] = {USERS_USERNAME_FIELD: username,
                                           USERS_HASHED_PASSWORD_FIELD: hashed_password,
                                           USERS_DATA_FIELD: {
                                               USERS_DATA_TRANSACTIONS_FIELD: [],
                                               USERS_DATA_SAVINGS_GOALS_FIELD: []
                                           }}
        self.write_json(self.data)
        return user_id
