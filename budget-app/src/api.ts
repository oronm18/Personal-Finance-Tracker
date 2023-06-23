import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Replace with your API's base URL
});

export const fetchTransactions = async () => {
  const response = await api.get('/transactions'); // Replace with your endpoint
  console.log(response.data);
  return response.data;
};

export const fetchSavingsGoals = async () => {
  const response = await api.get('/savings-goals'); // Replace with your endpoint
  return response.data;
};

// Add more API functions as needed...
