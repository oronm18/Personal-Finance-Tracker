"""
Module that handles the Budget Tracker API.

Author: Oron Moshe
date: 23/06/2023
"""

# ----- Import ----- #

import os

from pymongo import MongoClient
from bson import ObjectId

# ----- MongoDB Configuration ----- #
from common.budget_api.abstract_budget_api_handler import USERS_DATA_FIELD, USERS_DATA_TRANSACTIONS_FIELD, \
    USERS_DATA_SAVINGS_GOALS_FIELD, USERS_DATA_SAVINGS_GOALS_ID_FIELD, USERS_DATA_TRANSACTIONS_FIELD_ID, \
    USERS_HASHED_PASSWORD_FIELD, USERS_USERNAME_FIELD, SavingGoal, AbstractBudgetApiHandler, Transaction

MONGO_URI = "mongodb+srv://oronm18:VHzjGdg7FtiukAtJ@budgetapi.m5jq1ht.mongodb.net/?retryWrites=true&w=majority"
MONGO_DATABASE_NAME = "budgetapi"
MONGO_COLLECTION_NAME = "Project 0"

client = MongoClient(MONGO_URI)
db = client[MONGO_DATABASE_NAME]
collection = db[MONGO_COLLECTION_NAME]


# ----- Classes ----- #


class MongoDBBudgetApiHandler(AbstractBudgetApiHandler):
    """MongoDB implementation for the Budget Tracker API handler."""

    def get_users(self) -> dict:
        """Get all user data."""
        users = collection.find({})
        return {str(user["_id"]): user for user in users}

    def get_data(self) -> dict:
        """Get all data."""
        # Assuming that the structure is {user_id: user_data}
        return self.get_users()

    def fetch_transactions(self, user_id: str) -> list[Transaction]:
        """Fetch transactions from the database for a given user."""
        user = collection.find_one({"_id": ObjectId(user_id)})
        transactions = user[USERS_DATA_FIELD][USERS_DATA_TRANSACTIONS_FIELD]
        return [Transaction(**transaction) for transaction in transactions]

    def fetch_savings_goals(self, user_id: str) -> list[SavingGoal]:
        """Fetch savings goals from the database for a given user."""
        user = collection.find_one({"_id": ObjectId(user_id)})
        savings_goals = user[USERS_DATA_FIELD][USERS_DATA_SAVINGS_GOALS_FIELD]
        return [SavingGoal(**saving_goal) for saving_goal in savings_goals]

    def add_transactions(self, user_id: str, transactions: list[Transaction]) -> bool:
        """Add transactions to the database for a given user."""
        new_transactions = [transaction.dict() for transaction in transactions]
        result = collection.update_one({"_id": ObjectId(user_id)}, {
            "$push": {f"{USERS_DATA_FIELD}.{USERS_DATA_TRANSACTIONS_FIELD}": {"$each": new_transactions}}})
        return result.modified_count > 0

    def add_savings_goals(self, user_id: str, savings_goals: list[SavingGoal]) -> bool:
        """Add savings goals to the database for a given user."""
        new_savings_goals = [saving_goal.dict() for saving_goal in savings_goals]
        result = collection.update_one({"_id": ObjectId(user_id)}, {
            "$push": {f"{USERS_DATA_FIELD}.{USERS_DATA_SAVINGS_GOALS_FIELD}": {"$each": new_savings_goals}}})
        return result.modified_count > 0

    def remove_transaction(self, user_id: str, transaction_id: str) -> bool:
        """Remove a specific transaction for a given user."""
        result = collection.update_one({"_id": ObjectId(user_id)}, {"$pull": {
            f"{USERS_DATA_FIELD}.{USERS_DATA_TRANSACTIONS_FIELD}": {USERS_DATA_TRANSACTIONS_FIELD_ID: transaction_id}}})
        return result.modified_count > 0

    def remove_saving_goal(self, user_id: str, saving_goal_id: str) -> bool:
        """Remove a specific savings goal for a given user."""
        result = collection.update_one({"_id": ObjectId(user_id)}, {"$pull": {
            f"{USERS_DATA_FIELD}.{USERS_DATA_SAVINGS_GOALS_FIELD}": {
                USERS_DATA_SAVINGS_GOALS_ID_FIELD: saving_goal_id}}})
        return result.modified_count > 0

    def update_transaction(self, user_id: str, transaction: Transaction) -> bool:
        """Update a specific transaction for a given user."""
        result = collection.update_one(
            {"_id": ObjectId(user_id), f"{USERS_DATA_FIELD}.{USERS_DATA_TRANSACTIONS_FIELD}.{USERS_DATA_TRANSACTIONS_FIELD_ID}": transaction.transaction_id},
            {"$set": {f"{USERS_DATA_FIELD}.{USERS_DATA_TRANSACTIONS_FIELD}.$": transaction.dict()}}
        )
        return result.modified_count > 0

    def update_savings_goal(self, user_id: str, savings_goal: SavingGoal) -> bool:
        """Update a specific savings goal for a given user."""
        result = collection.update_one(
            {"_id": ObjectId(user_id), f"{USERS_DATA_FIELD}.{USERS_DATA_SAVINGS_GOALS_FIELD}.{USERS_DATA_SAVINGS_GOALS_ID_FIELD}": savings_goal.saving_goal_id},
            {"$set": {f"{USERS_DATA_FIELD}.{USERS_DATA_SAVINGS_GOALS_FIELD}.$": savings_goal.dict()}}
        )
        return result.modified_count > 0

    def add_new_user(self, username: str, hashed_password: str) -> str:
        """Add a new user to the database. return his id."""
        user_data = {
            USERS_USERNAME_FIELD: username,
            USERS_HASHED_PASSWORD_FIELD: hashed_password,
            USERS_DATA_FIELD: {
                USERS_DATA_TRANSACTIONS_FIELD: [],
                USERS_DATA_SAVINGS_GOALS_FIELD: []
            }
        }
        result = collection.insert_one(user_data)
        return str(result.inserted_id)
