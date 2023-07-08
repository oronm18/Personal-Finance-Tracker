"""
Module that handles the Budget Tracker API with json.

Author: Oron Moshe
date: 23/06/2023
"""
# ----- Import ----- #

import logging
import json
import os
from typing import Type

from common.budget_api.abstract_budget_api_handler import AbstractBudgetApiHandler, USERS_FIELD, \
    USERS_DATA_SAVINGS_GOALS_FIELD, USERS_DATA_TRANSACTIONS_FIELD, USERS_DATA_FIELD, USERS_HASHED_PASSWORD_FIELD, \
    USERS_USERNAME_FIELD, USERS_DATA_SAVINGS_GOALS_ID_FIELD, USERS_DATA_TRANSACTIONS_FIELD_ID, SavingGoal, Transaction, \
    BudgetBaseModel
from common.utils import generate_unique_id


class JsonBudgetApiHandler(AbstractBudgetApiHandler):
    """
    A json implementation of the budget api handler.
    """
    def __init__(self, filepath: str):
        self.filepath = filepath
        self.data = {}
        self.fetch_data()

    def get_users(self) -> dict:
        self.fetch_data()
        return self.data[USERS_FIELD]

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

    def fetch_data(self):
        self.data = self.get_data()

    def fetch_items(self, user_id: str, item_class: Type[BudgetBaseModel]) -> list[BudgetBaseModel]:
        self.fetch_data()
        if user_id not in self.data[USERS_FIELD]:
            return []
        user_data = self.data[USERS_FIELD][user_id][USERS_DATA_FIELD]
        field = USERS_DATA_TRANSACTIONS_FIELD if item_class == Transaction else USERS_DATA_SAVINGS_GOALS_FIELD
        return [item_class(**item) for item in user_data.get(field, [])]

    def add_items(self, user_id: str, items: list[BudgetBaseModel]) -> bool:
        if user_id not in self.data[USERS_FIELD]:
            return False
        for item in items:
            if isinstance(item, Transaction):
                self.data[USERS_FIELD][user_id][USERS_DATA_FIELD][USERS_DATA_TRANSACTIONS_FIELD].append(item.dict())
            else:
                self.data[USERS_FIELD][user_id][USERS_DATA_FIELD][USERS_DATA_SAVINGS_GOALS_FIELD].append(item.dict())
        self.write_json(self.data)
        return True

    def remove_item(self, user_id: str, item_id: str, item_class: Type[BudgetBaseModel]) -> bool:
        if user_id not in self.data[USERS_FIELD]:
            return False
        field = USERS_DATA_TRANSACTIONS_FIELD if item_class == Transaction else USERS_DATA_SAVINGS_GOALS_FIELD
        for item in self.data[USERS_FIELD][user_id][USERS_DATA_FIELD][field]:
            if item['item_id'] == item_id:
                self.data[USERS_FIELD][user_id][USERS_DATA_FIELD][field].remove(item)
                self.write_json(self.data)
                return True
        return False

    def update_item(self, user_id: str, item: BudgetBaseModel) -> bool:
        if user_id not in self.data[USERS_FIELD]:
            return False
        field = USERS_DATA_TRANSACTIONS_FIELD if isinstance(item, Transaction) else USERS_DATA_SAVINGS_GOALS_FIELD
        for i, db_item in enumerate(self.data[USERS_FIELD][user_id][USERS_DATA_FIELD][field]):
            if db_item['item_id'] == item.item_id:
                self.data[USERS_FIELD][user_id][USERS_DATA_FIELD][field][i] = item.dict()
                self.write_json(self.data)
                return True
        return False

    def add_new_user(self, username: str, hashed_password: str) -> str:
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

    def write_json(self, data: dict):
        """
        Write to the json file.
        :param data: Data to write.
        """
        with open(self.filepath, "w") as json_file:
            json.dump(data, json_file, default=lambda x: x.dict(), indent=4)