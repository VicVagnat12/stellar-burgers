import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllOrders = createAsyncThunk(
    'order/getFeeds',
    async (_, { rejectWithValue }) => {
      try {
        // Здесь должен быть вызов API для получения ленты заказов
        // const response = await getFeedsApi();
        // return response;
        throw new Error('getFeedsApi not implemented');
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  export const fetchOrderByNumber = createAsyncThunk(
    'order/getByNumber',
    async (orderNumber: number, { rejectWithValue }) => {
      try {
        // Здесь должен быть вызов API для получения заказа по номеру
        // const response = await getOrderByNumberApi(orderNumber);
        // return response;
        throw new Error('getOrderByNumberApi not implemented');
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  export const fetchUserOrders = createAsyncThunk(
    'order/getUserOrders',
    async (_, { rejectWithValue }) => {
      try {
        // Здесь должен быть вызов API для получения заказов пользователя
        // const response = await getUserOrdersApi();
        // return response;
        throw new Error('getUserOrdersApi not implemented');
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  export const createNewOrder = createAsyncThunk(
    'order/postUserBurger',
    async (ingredientIds: string[], { rejectWithValue }) => {
      try {
        // Здесь должен быть вызов API для создания заказа пользователя
        // const response = await postUserBurgerApi(ingredientIds);
        // return response;
        throw new Error('postUserBurgerApi not implemented');
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );