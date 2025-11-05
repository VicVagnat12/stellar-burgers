import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getIngredientsApi();
      return response;
    } catch (err) {
      const errorMessage =
        (err as Error).message || 'Ошибка при загрузке ингредиентов';
      return rejectWithValue(errorMessage);
    }
  }
);
