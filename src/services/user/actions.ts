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
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'Ошибка при регистрации пользователя'
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (loginUserData: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(loginUserData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при login user');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutApi();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при logout user');
    }
  }
);

export const updateUserData = createAsyncThunk(
  'user/update',
  async (updatedUserData: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(updatedUserData);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'Ошибка при обновлении данных пользователя'
      );
    }
  }
);
