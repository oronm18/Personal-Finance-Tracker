import axios from 'axios';
import { Transaction } from './components/Table/TransactionTable';
import { SavingsGoal } from './components/Table/SavingsGoalTable';
import { User } from './components/User/User';

const api = axios.create({
  baseURL: 'http://192.168.10.114:8000',
});

export const fetchTransactions = async (user_id: string) => {
  const response = await api.get(`/transactions?user_id=${user_id}`);
  return response.data;
};

export const fetchSavingsGoals = async (user_id: string) => {
  const response = await api.get(`/savings-goals?user_id=${user_id}`); 
  return response.data;
};

export const addTransaction = async (user_id: string, transaction: Transaction) => {
  console.log(transaction)
  const response = await api.post(`/transactions?user_id=${user_id}`, transaction); 
  return response.data;
};

export const addSavingsGoal = async (user_id: string, savings_goals: SavingsGoal) => {
  const response = await api.post(`/savings-goals?user_id=${user_id}`, savings_goals); 
  return response.data;
};

export const removeTransaction = async (user_id: string, transaction: Transaction) => {
  const response = await api.delete(`/transactions?user_id=${user_id}&transaction_id=${transaction.transaction_id}`);
  return response.data;
};

export const removeSavingsGoal = async (user_id: string, saving_goal: SavingsGoal) => {
  const response = await api.delete(`/savings-goals?user_id=${user_id}&saving_goal_id=${saving_goal.saving_goal_id}`);
  return response.data;
};

export const login = async (user: User) => {
  const response = await api.post(`/login`, user);
  return response.data;
};

export const signup = async (user: User) => {
  const response = await api.post(`/signup`, user);
  return response.data;
};

export const updateTransaction = async (user_id: string, transaction: Transaction) => {
  const response = await api.put(`/transactions?user_id=${user_id}`, transaction);
  return response.data;
};

export const updateSavingsGoal = async (user_id: string, savings_goal: SavingsGoal) => {
  const response = await api.put(`/savings-goals?user_id=${user_id}`, savings_goal);
  return response.data;
};
