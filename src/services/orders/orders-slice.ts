import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import {
  fetchAllOrders,
  fetchUserOrders,
  fetchOrderByNumber,
  createNewOrder
} from './actions';
import {
  TFeedsResponse,
  TOrderResponse,
  TNewOrderResponse
} from '../../utils/burger-api';

export type TOrderDetailsState = {
  userOrders: TOrder[] | null;
  orderByNumber: TOrder | null;
  newOrder: {
    order: TOrder | null;
    name: string;
    number: number | null;
  };
  feed: TFeedsResponse;
  isRequestPending: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderDetailsState = {
  userOrders: [],
  orderByNumber: null,
  newOrder: {
    order: null,
    name: '',
    number: null
  },
  feed: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0
  },
  isRequestPending: false,
  isLoading: false,
  error: null
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    startOrderRequest: (state) => {
      state.isRequestPending = true;
      state.newOrder.order = null;
    },
    finishOrderRequest: (state) => {
      state.isRequestPending = false;
      state.newOrder = {
        order: null,
        name: '',
        number: null
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchAllOrders
      .addCase(fetchAllOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchAllOrders.fulfilled,
        (state, action: PayloadAction<TFeedsResponse>) => {
          state.isLoading = false;
          state.feed = action.payload;
        }
      )
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.feed = {
          success: false,
          orders: [],
          total: 0,
          totalToday: 0
        };
      })

      // fetchOrderByNumber
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.orderByNumber = null;
      })
      .addCase(
        fetchOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrderResponse>) => {
          state.isLoading = false;
          state.error = null;
          state.orderByNumber = action.payload.orders[0];
        }
      )
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.orderByNumber = null;
      })

      // fetchUserOrders
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchUserOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.isLoading = false;
          state.error = null;
          state.userOrders = action.payload;
        }
      )
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.userOrders = [];
      })

      // createNewOrder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
        state.isRequestPending = true;
        state.error = null;
      })
      .addCase(
        createNewOrder.fulfilled,
        (state, action: PayloadAction<TNewOrderResponse>) => {
          state.isLoading = false;
          state.error = null;
          state.isRequestPending = false;
          state.newOrder = {
            order: action.payload.order,
            name: action.payload.name,
            number: action.payload.order.number
          };
        }
      )
      .addCase(createNewOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isRequestPending = false;
        state.error = action.payload as string;
      });
  },
  selectors: {
    getFeedOrders: (state) => state.feed.orders,
    getOrdersLoading: (state) => state.isLoading,
    getOrderByNumber: (state) => state.orderByNumber,
    getFeed: (state) => state.feed,
    getNewOrder: (state) => state.newOrder,
    getOrderRequest: (state) => state.isRequestPending,
    getUserOrders: (state) => state.userOrders
  }
});

export const { startOrderRequest, finishOrderRequest } = ordersSlice.actions;

export const ordersReducer = ordersSlice.reducer;

export const {
  getFeedOrders,
  getOrdersLoading,
  getOrderByNumber,
  getFeed,
  getNewOrder,
  getOrderRequest,
  getUserOrders
} = ordersSlice.selectors;
