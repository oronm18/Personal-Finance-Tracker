"""
Main FastAPI application for the budget_tracker project.

Author: Oron Moshe
date: 23/06/2023
"""
# ----- Imports ----- #

import uuid
import bcrypt


# ----- Functions ----- #

def generate_unique_id():
    return str(uuid.uuid4())


def compare_hashes(hash1, hash2):
    return bcrypt.checkpw(hash1.encode('utf-8'), hash2.encode('utf-8'))


def hash_password(password: str):
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return hashed_password.decode('utf-8')
