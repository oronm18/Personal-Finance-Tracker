"""
Module that handles the Budget Tracker API.

Author: Oron Moshe
date: 23/06/2023
"""
# ----- Import ----- #

import logging
from abc import ABC, abstractmethod
import json
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

class Transaction(BaseModel):
    """
    Transaction Class.
    """
    transaction_id: str
    name: str
    amount: float
    category: str
    date: str


class SavingGoal(BaseModel):
    """
    SavingGoal Class.
    """
    saving_goal_id: str
    name: str
    current: float
    target: float


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

    @abstractmethod
    def fetch_transactions(self, user_id: str) -> list[Transaction]:
        """Fetch transactions from the database for a given user."""
        pass

    @abstractmethod
    def fetch_savings_goals(self, user_id: str) -> list[SavingGoal]:
        """Fetch savings goals from the database for a given user."""
        pass

    @abstractmethod
    def add_transactions(self, user_id: str, transactions: list[Transaction]) -> bool:
        """Add transactions to the database for a given user."""
        pass

    @abstractmethod
    def add_savings_goals(self, user_id: str, savings_goals: list[SavingGoal]) -> bool:
        """Add savings goals to the database for a given user."""
        pass

    @abstractmethod
    def remove_transaction(self, user_id: str, transaction_id: str) -> bool:
        """Remove a specific transaction for a given user."""
        pass

    @abstractmethod
    def remove_saving_goal(self, user_id: str, saving_goal_id: str) -> bool:
        """Remove a specific savings goal for a given user."""
        pass

    @abstractmethod
    def update_transaction(self, user_id: str, transaction: Transaction) -> bool:
        """Update a transaction for a given user."""
        pass

    @abstractmethod
    def update_savings_goal(self, user_id: str, savings_goal: SavingGoal) -> bool:
        """Update a savings goal for a given user."""
        pass

    @abstractmethod
    def add_new_user(self, username: str, hashed_password: str) -> str:
        """Add a new user to the database. return his id."""
        pass
