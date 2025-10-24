import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getFeedsApi,
  getOrdersApi,
  getOrderByNumberApi,
  orderBurgerApi
} from '../../utils/burger-api';

export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFeedsApi();
      return response;
    } catch (error) {
      const errorMessage =
        (error as Error).message || 'Ошибка при fetch all orders';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrdersApi();
      return response;
    } catch (error) {
      const errorMessage =
        (error as Error).message || 'Ошибка при fetch user orders';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchOrderByNumber = createAsyncThunk(
  'orders/fetchOrderByNumber',
  async (orderNumber: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(orderNumber);
      return response;
    } catch (error) {
      const errorMessage =
        (error as Error).message || 'Ошибка при fetch order by number';
      return rejectWithValue(errorMessage);
    }
  }
);

export const createNewOrder = createAsyncThunk(
  'orders/createNewOrder',
  async (ingredientIds: string[], { rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredientIds);
      return response;
    } catch (error) {
      const errorMessage = (error as Error).message || 'Ошибка создания заказа';
      return rejectWithValue(errorMessage);
    }
  }
);
