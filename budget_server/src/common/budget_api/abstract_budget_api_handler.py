"""
Module that handles the Budget Tracker API.

Author: Oron Moshe
date: 23/06/2023
"""
# ----- Import ----- #

import logging
from abc import ABC, abstractmethod
import json
from typing import Type

from pydantic import BaseModel
import os

from common.utils import generate_unique_id

# ----- Consts ----- #

# Field definitions for user records.
USERS_FIELD = "users"
USERS_USERNAME_FIELD = "username"
USERS_HASHED_PASSWORD_FIELD = "hashed_password"
USERS_DATA_FIELD = "data"

USERS_DATA_TRANSACTIONS_FIELD = "transactions"

USERS_DATA_TRANSACTIONS_FIELD_ID = "transaction_id"
USERS_DATA_TRANSACTIONS_FIELD_NAME = "name"
USERS_DATA_TRANSACTIONS_FIELD_AMOUNT = "amount"
USERS_DATA_TRANSACTIONS_FIELD_CATEGORY = "category"
USERS_DATA_TRANSACTIONS_FIELD_DATE = "date"

USERS_DATA_SAVINGS_GOALS_FIELD = "savings_goals"
USERS_DATA_SAVINGS_GOALS_ID_FIELD = "saving_goal_id"
USERS_DATA_SAVINGS_GOALS_NAME_FIELD = "name"
USERS_DATA_SAVINGS_GOALS_CURRENT_FIELD = "current"
USERS_DATA_SAVINGS_GOALS_TARGET_FIELD = "target"


# ----- Classes ----- #


class BudgetBaseModel(BaseModel):
    """
    Base budget model Class.
    """
    item_id: str


class Transaction(BudgetBaseModel):
    """
    Transaction Class.
    """
    name: str
    amount: float
    category: str
    date: str


class SavingGoal(BudgetBaseModel):
    """
    SavingGoal Class.
    """
    name: str
    current: float
    target: float


ITEM_CLASSES = {
    "transactions": Transaction,
    "savings-goals": SavingGoal
}


class AbstractBudgetApiHandler(ABC):
    """Abstract class for a Budget Tracker API handler."""

    @abstractmethod
    def get_users(self) -> dict:
        """Get all user data."""
        pass

    @abstractmethod
    def get_data(self) -> dict:
        """Get all data."""
        pass

    def fetch_items(self, user_id: str, item_class: Type[BudgetBaseModel]) -> list[BudgetBaseModel]:
        """Fetch items from the database for a given user."""
        pass

    @abstractmethod
    def add_items(self, user_id: str, items: list[BudgetBaseModel]) -> bool:
        """Add items to the database for a given user."""
        pass

    @abstractmethod
    def remove_item(self, user_id: str, item_id: str, item_class: Type[BudgetBaseModel]) -> bool:
        """Remove a specific item for a given user."""
        pass

    @abstractmethod
    def update_item(self, user_id: str, item: BudgetBaseModel) -> bool:
        """Update a specific item for a given user."""
        pass

    @abstractmethod
    def add_new_user(self, username: str, hashed_password: str) -> str:
        """Add a new user to the database. return his id."""
        pass
