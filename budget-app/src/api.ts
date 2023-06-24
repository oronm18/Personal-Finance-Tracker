import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.10.114:8000',
});

export const fetchTransactions = async () => {
  const response = await api.get('/transactions'); 
  console.log(response.data);
  return response.data;
};

export const fetchSavingsGoals = async () => {
  const response = await api.get('/savings-goals'); 
  return response.data;
};

export const addTransaction = async (transaction: any) => {
  console.log(transaction);

  const response = await api.post('/transactions', transaction); 
  return response.data;
};

export const addSavingsGoal = async (savings_goals: any) => {
  const response = await api.post('/savings-goals', savings_goals); 
  return response.data;
};

export const removeTransaction = async (transaction_id: string) => {
  const response = await api.delete(`/transactions?transaction=${transaction_id}`);
  console.log(response.data);
  return response.data;
};

export const removeSavingsGoal = async (saving_goal_id: string) => {
  const response = await api.delete(`/savings-goals?saving_goal=${saving_goal_id}`);
  return response.data;
};

export const login = async (username: string, password: string) => {
  const response = await api.post(`/login`, { username, password });
  return response.data;
};

