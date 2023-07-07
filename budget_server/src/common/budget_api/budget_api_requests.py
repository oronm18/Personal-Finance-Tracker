"""
Main FastAPI application for the budget_tracker project.

Author: Oron Moshe
date: 23/06/2023
"""
# ----- Imports ----- #

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

import uvicorn
from common.budget_api.abstract_budget_api_handler import Transaction, USERS_USERNAME_FIELD, \
    USERS_HASHED_PASSWORD_FIELD, SavingGoal
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

WEB_APP_BUILD_DIRECTORY = "../../budget_web/build"

@app.get("/transactions", response_model=list[Transaction])
async def get_transactions(user_id: str):
    return handler.fetch_transactions(user_id)


@app.get("/savings-goals", response_model=list[SavingGoal])
async def get_savings_goals(user_id: str):
    return handler.fetch_savings_goals(user_id)


@app.post("/transactions", response_model=Transaction)
async def add_transaction(user_id: str, transaction: Transaction):
    transaction.transaction_id = generate_unique_id()
    handler.add_transactions(user_id, [transaction])
    return transaction


@app.post("/savings-goals", response_model=SavingGoal)
async def add_saving_goal(user_id: str, saving_goal: SavingGoal):
    saving_goal.saving_goal_id = generate_unique_id()
    handler.add_savings_goals(user_id, [saving_goal])
    return saving_goal


@app.delete("/transactions")
async def delete_transaction(user_id: str, transaction_id: str):
    handler.remove_transaction(user_id, transaction_id)
    return transaction_id


@app.delete("/savings-goals")
async def delete_saving_goal(user_id: str, saving_goal_id: str):
    handler.remove_saving_goal(user_id=user_id, saving_goal_id=saving_goal_id)
    return saving_goal_id


@app.put("/transactions")
async def update_transaction(user_id: str, transaction: Transaction):
    handler.update_transaction(user_id, transaction)
    return {"status": "Transaction updated"}


@app.put("/savings-goals")
async def update_savings_goal(user_id: str, savings_goal: SavingGoal):
    handler.update_savings_goal(user_id, savings_goal)
    return {"status": "Savings goal updated"}


@app.post("/login")
async def login(payload: User):
    username = payload.username
    password = payload.password
    for user_id, user_props in handler.get_users().items():
        if user_props[USERS_USERNAME_FIELD] == username:
            if compare_hashes(password, user_props[USERS_HASHED_PASSWORD_FIELD]):
                return {"user_id": user_id}
            else:
                raise HTTPException(status_code=400, detail="Invalid password!")
    raise HTTPException(status_code=401, detail="Username does not exist!")


@app.post("/signup")
async def login(payload: User):
    username = payload.username
    password = payload.password
    for user_id, user_props in handler.get_users().items():
        if user_props[USERS_USERNAME_FIELD] == username:
            raise HTTPException(status_code=409, detail="Username already taken.")
    user_id = handler.add_new_user(username=username, hashed_password=hash_password(password))
    return {"user_id": user_id}


def run_server():
    app.mount("/static", StaticFiles(directory=f"{WEB_APP_BUILD_DIRECTORY }/static"), name="static")
    app.mount("/", FileResponse(f"{WEB_APP_BUILD_DIRECTORY}/index.html", media_type="text/html"), name="index")
    uvicorn.run(app, host="0.0.0.0", port=8000)


if __name__ == "__main__":
    run_server()
