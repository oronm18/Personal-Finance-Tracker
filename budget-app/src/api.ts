import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.10.114:8000', // Replace with your API's base URL
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

export const addTransaction = async () => {
  const response = await api.put('/transactions'); 
  console.log(response.data);
  return response.data;
};

export const addSavingsGoal = async () => {
  const response = await api.put('/savings-goals'); 
  return response.data;
};

export const removeTransaction = async () => {
  const response = await api.delete('/transactions'); 
  console.log(response.data);
  return response.data;
};

export const removeSavingsGoal = async () => {
  const response = await api.delete('/savings-goals'); 
  return response.data;
};

// Add more API functions as needed...
