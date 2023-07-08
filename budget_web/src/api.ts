import axios from 'axios';
import { Transaction } from './components/Table/TransactionTable';
import { SavingsGoal } from './components/Table/SavingsGoalTable';
import { User } from './components/User/User';

const api = axios.create({
  baseURL: 'http://192.168.10.115:8000',
});

export const fetchItems = async (user_id: string, itemType: string) => {
  const response = await api.get(`/${itemType}?user_id=${user_id}`);
  console.log(response)
  return response.data;
};

export const addItem = async (user_id: string, item: any, itemType: string) => {
  console.log(item)
  const response = await api.post(`/${itemType}?user_id=${user_id}`, item); 
  return response.data;
};

export const removeItem = async (user_id: string, item: any, itemType: string) => {
  const response = await api.delete(`/${itemType}?user_id=${user_id}&item_id=${item.item_id}`);
  return response.data;
};

export const updateItem = async (user_id: string, item: any, itemType: string) => {
  const response = await api.put(`/${itemType}?user_id=${user_id}`, item);
  return response.data;
};

export const login = async (user: User) => {
  try {
    console.log(user)
    const response = await api.post(`/user_login`, user);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 400) {
        throw new Error("Invalid password!");
      }
      else if (error.response.status === 401) {
        throw new Error("Username does not exist!");
      }
    } else {
      throw new Error("Failed to login.");
    }
  }
};

export const signup = async (user: User) => {
  try {
    const response = await api.post(`/user_signup`, user);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 409) {
        throw new Error("Username already taken.");
      }
      else if (error.response.status === 400) {
        throw new Error("Password is not secured enough!")
      }
    } else {
      throw new Error("Error while signup.", error.message);
    }
  }
};
