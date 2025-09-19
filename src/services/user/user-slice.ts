import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  logoutApi,
  getUserApi,
  updateUserApi,
  TRegisterData,
  TLoginData,
} from '../../utils/burger-api';
import { TUser } from '../../utils/types';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null,
};

export const checkUserAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { rejectWithValue, dispatch }) => {
    const accessToken = getCookie('accessToken');
    
    if (!accessToken) {
      dispatch(setAuthChecked(true));
      return rejectWithValue('No access token');
    }

    try {
      const response = await getUserApi();
      return response.user;
    } catch (error: any) {
      dispatch(logoutUser());
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(userData);
      
      if (response.accessToken) {
        setCookie('accessToken', response.accessToken.split('Bearer ')[1]);
      }
      if (response.refreshToken) {
        setCookie('refreshToken', response.refreshToken);
      }
      
      return response.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (userData: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(userData);
      
      if (response.accessToken) {
        setCookie('accessToken', response.accessToken.split('Bearer ')[1]);
      }
      if (response.refreshToken) {
        setCookie('refreshToken', response.refreshToken);
      }
      
      return response.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      return null;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (userData: { name: string; email: string; password?: string }, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(userData);
      return response.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // checkUserAuth
      .addCase(checkUserAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkUserAuth.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(checkUserAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthChecked = true;
        state.error = action.payload as string;
      })
      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.payload as string;
      })
      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.payload as string;
      })
      // logoutUser
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // updateUser
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setAuthChecked, clearError } = userSlice.actions;
export default userSlice.reducer;