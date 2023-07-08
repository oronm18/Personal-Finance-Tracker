"""
Main FastAPI application for the budget_tracker project.

Author: Oron Moshe
date: 23/06/2023
"""
# ----- Imports ----- #
import re
from functools import reduce
from operator import or_
from typing import Union, TypeVar, get_args

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

import uvicorn
from common.budget_api.abstract_budget_api_handler import Transaction, USERS_USERNAME_FIELD, \
    USERS_HASHED_PASSWORD_FIELD, SavingGoal, ITEM_CLASSES, BudgetBaseModel
from common.budget_api.json_budget_api_handler import JsonBudgetApiHandler
from common.budget_api.mongodb_budget_api_handler import MongoDBBudgetApiHandler
from common.utils import generate_unique_id, compare_hashes, hash_password
from fastapi.staticfiles import StaticFiles
from starlette.responses import FileResponse
from starlette.routing import Route


# ----- Application ----- #


class User(BaseModel):
    user_id: str
    username: str
    password: str


app = FastAPI()

# Add the following middleware to enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Initialize the handler
# handler = JsonBudgetApiHandler('C://temp/budget_data.json')
handler = MongoDBBudgetApiHandler()
ItemUnion = Union[tuple(ITEM_CLASSES.values())]


@app.post("/user_login")
async def login(payload: User):
    username = payload.username
    password = payload.password
    print(username, password)
    for user_id, user_props in handler.get_users().items():
        if user_props[USERS_USERNAME_FIELD] == username:
            if compare_hashes(password, user_props[USERS_HASHED_PASSWORD_FIELD]):
                return {"user_id": user_id}
            else:
                raise HTTPException(status_code=400, detail="Invalid password!")
    raise HTTPException(status_code=401, detail="Username does not exist!")


@app.post("/user_signup")
async def signup(payload: User):
    username = payload.username
    password = payload.password

    for user_id, user_props in handler.get_users().items():
        if user_props[USERS_USERNAME_FIELD] == username:
            raise HTTPException(status_code=409, detail="Username already taken.")

    password_pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
    if not re.match(password_pattern, password):
        raise HTTPException(status_code=400, detail="Password does not meet the security requirements.")

    user_id = handler.add_new_user(username=username, hashed_password=hash_password(password))
    return {"user_id": user_id}


@app.get("/{item_type}", response_model=list[ItemUnion])
async def fetch_items(user_id: str, item_type: str):
    if item_type not in ITEM_CLASSES:
        raise HTTPException(status_code=400, detail="Invalid item type")
    return handler.fetch_items(user_id, ITEM_CLASSES[item_type])


@app.post("/{item_type}", response_model=ItemUnion)
async def add_item(user_id: str, item: ItemUnion, item_type: str):
    if item_type not in ITEM_CLASSES or not isinstance(item, ITEM_CLASSES[item_type]):
        raise HTTPException(status_code=400, detail="Invalid item type")
    item.item_id = generate_unique_id()
    handler.add_items(user_id, [item])
    return item


@app.delete("/{item_type}")
async def delete_item(user_id: str, item_id: str, item_type: str):
    if item_type not in ITEM_CLASSES:
        raise HTTPException(status_code=400, detail="Invalid item type")
    handler.remove_item(user_id, item_id, ITEM_CLASSES[item_type])
    return item_id


@app.put("/{item_type}")
async def update_item(user_id: str, item: ItemUnion, item_type: str):
    if item_type not in ITEM_CLASSES or not isinstance(item, ITEM_CLASSES[item_type]):
        raise HTTPException(status_code=400, detail="Invalid item type")
    handler.update_item(user_id, item)
    return {"status": f"{item_type.capitalize()} updated"}


def run_server(build_directory):
    app.mount("/static", StaticFiles(directory=f"{build_directory}/static"), name="static")
    app.mount("/", FileResponse(f"{build_directory}/index.html", media_type="text/html"), name="index")
    uvicorn.run(app, host="0.0.0.0", port=8000)


if __name__ == "__main__":
    run_server("../../budget_web/build")
