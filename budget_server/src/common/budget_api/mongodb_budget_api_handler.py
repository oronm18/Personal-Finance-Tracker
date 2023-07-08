"""
Module that handles the Budget Tracker API.

Author: Oron Moshe
date: 23/06/2023
"""

# ----- Import ----- #

import os
from typing import Type

from pymongo import MongoClient
from bson import ObjectId

# ----- MongoDB Configuration ----- #
from common.budget_api.abstract_budget_api_handler import USERS_DATA_FIELD, USERS_DATA_TRANSACTIONS_FIELD, \
    USERS_DATA_SAVINGS_GOALS_FIELD, USERS_DATA_SAVINGS_GOALS_ID_FIELD, USERS_DATA_TRANSACTIONS_FIELD_ID, \
    USERS_HASHED_PASSWORD_FIELD, USERS_USERNAME_FIELD, SavingGoal, AbstractBudgetApiHandler, Transaction, \
    BudgetBaseModel

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

    def fetch_items(self, user_id: str, item_class: Type[BudgetBaseModel]) -> list[BudgetBaseModel]:
        """Fetch items from the database for a given user."""
        user = collection.find_one({"_id": ObjectId(user_id)})
        item_field = item_class.__name__.lower()
        items = user[USERS_DATA_FIELD][item_field]
        return [item_class(**item) for item in items]

    def add_items(self, user_id: str, items: list[BudgetBaseModel]) -> bool:
        """Add transactions to the database for a given user."""
        does_fail = False
        for item in items:
            item_dict = item.dict()
            result = collection.update_one({"_id": ObjectId(user_id)}, {
                "$push": {f"{USERS_DATA_FIELD}.{item.__class__.__name__.lower()}": {"$each": [item_dict]}}})
            does_fail |= result.modified_count <= 0
        return not does_fail

    def remove_item(self, user_id: str, item_id: str, item_class: Type[BudgetBaseModel]) -> bool:
        """Remove a specific item for a given user."""
        item_field = item_class.__name__.lower()
        result = collection.update_one({"_id": ObjectId(user_id)}, {"$pull": {
            f"{USERS_DATA_FIELD}.{item_field}": {"item_id": item_id}}})
        return result.modified_count > 0

    def update_item(self, user_id: str, item: BudgetBaseModel) -> bool:
        """Update a specific item for a given user."""
        item_field = item.__class__.__name__.lower()
        result = collection.update_one(
            {"_id": ObjectId(user_id), f"{USERS_DATA_FIELD}.{item_field}.item_id": item.item_id},
            {"$set": {f"{USERS_DATA_FIELD}.{item_field}.$": item.dict()}}
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
