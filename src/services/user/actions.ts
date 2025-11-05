import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  logoutApi,
  getUserApi,
  updateUserApi,
  TRegisterData,
  TLoginData
} from '../../utils/burger-api';
import { getCookie } from '../../utils/cookie';
import { setAuthChecked } from './user-slice';

export const checkUserAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      const response = await getUserApi();
      return response.user;
    } else {
      dispatch(setAuthChecked(true));
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (newUserData: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(newUserData);
      return response;
    } catch (error) {
      const errorMessage =
        (error as Error).message || 'Ошибка при регистрации пользователя';
      return rejectWithValue(errorMessage);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (loginUserData: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(loginUserData);
      return response;
    } catch (error) {
      const errorMessage = (error as Error).message || 'Ошибка при login user';
      return rejectWithValue(errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutApi();
      return response;
    } catch (error) {
      const errorMessage = (error as Error).message || 'Ошибка при logout user';
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateUserData = createAsyncThunk(
  'user/update',
  async (updatedUserData: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(updatedUserData);
      return response;
    } catch (error) {
      const errorMessage =
        (error as Error).message || 'Ошибка при обновлении данных пользователя';
      return rejectWithValue(errorMessage);
    }
  }
);
