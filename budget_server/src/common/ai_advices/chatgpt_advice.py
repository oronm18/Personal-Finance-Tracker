"""
Chat gpt advice for saving goal.
Author: Oron Moshe
date: 09/07/2023
"""
# ----- Imports ----- #
import json

import openai

# ----- Consts ----- #
import requests

from common.budget_api.abstract_budget_api_handler import Transaction, Income, SavingGoal

openai.api_key = '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'


# ----- Functions ----- #


def generate_chat_prompt(transactions: list[Transaction], incomes: list[Income], saving_goal: SavingGoal) -> str:
    """
    Generate a GPT prompt asking for advice on reaching the savings goal with the current incomes and transactions.

    :param transactions: List of transactions.
    :param incomes: List of incomes.
    :param saving_goal: Saving goal object.
    :return: Generated GPT prompt.
    """
    total_spent = sum([transaction.amount for transaction in transactions])
    total_income = sum([income.amount for income in incomes])

    prompt = f"I have a saving goal called '{saving_goal.name}' with a target of {saving_goal.target} dollars. " \
             f"So far, I've saved {saving_goal.current} dollars.\n" \
             f"Every month, I earn a total of {total_income} dollars and spend about {total_spent} dollars " \
             f"on various expenses.\n" \
             "Based on this information, could you please advise on how I can adjust my budget to reach my savings " \
             "goal? "

    return prompt


def get_advice(transactions: list[Transaction], incomes: list[Income], saving_goal: SavingGoal) -> str:
    """
    Generate a GPT prompt and get advice from GPT-3 based on the prompt.

    :param transactions: List of transactions.
    :param incomes: List of incomes.
    :param saving_goal: Saving goal object.
    :return: GPT-3 response.
    """
    prompt = generate_chat_prompt(transactions, incomes, saving_goal)

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant.",
            },
            {
                "role": "user",
                "content": prompt,
            }
        ]
    )

    # Return the assistant's message
    return response['choices'][0]['message']['content']


def get_advice_rasa(transactions: list[Transaction], incomes: list[Income], saving_goal: SavingGoal) -> str:
    """
    Generate a GPT prompt and get advice from a Rasa bot based on the prompt.

    :param transactions: List of transactions.
    :param incomes: List of incomes.
    :param saving_goal: Saving goal object.
    :return: Rasa response.
    """
    prompt = generate_chat_prompt(transactions, incomes, saving_goal)

    # Send POST request to Rasa server
    url = "http://localhost:5005/model/parse"  # replace with your Rasa server URL
    headers = {"Content-Type": "application/json"}
    data = {"text": prompt}
    response = requests.post(url, headers=headers, data=json.dumps(data))

    # Extract the response text
    if response.status_code == 200:
        return response.json()['intent']['name']
    else:
        return "Error: Could not connect to Rasa server."


def main():
    i = Income(
        item_id="a",
        name="money",
        amount=2000,
        category="salary",
        date="2023/07/01",
    )
    t1 = Transaction(
        item_id="b",
        name="Food",
        amount=50,
        category="fun",
        date="2023/06/15",
    )
    t2 = Transaction(
        item_id="c",
        name="phone",
        amount=500,
        category="fun",
        date="2023/06/20",
    )
    t3 = Transaction(
        item_id="d",
        name="food",
        amount=100,
        category="fun",
        date="2023/06/20",
    )
    t4 = Transaction(
        item_id="e",
        name="rent",
        amount=600,
        category="rent",
        date="2023/06/20",
    )
    s = SavingGoal(
        item_id="f",
        name="Phone",
        current=200,
        target=800,
    )
    get_advice_rasa([t1, t2, t3, t4], [i], s)


if __name__ == '__main__':
    main()
