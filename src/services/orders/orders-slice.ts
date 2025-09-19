import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import {
  fetchAllOrders,
  fetchUserOrders,
  fetchOrderByNumber,
  createNewOrder
} from './actions';
import { TFeedsResponse } from '../../utils/burger-api';

type TOrderDetailsState = {
  order: TOrder | null;
  orderByNumber: TOrder | null;
  request: boolean;
  newOrder: {
    order: TOrder | null;
    name: string;
  };
  feed: TFeedsResponse;
  userOrders: TOrder[] | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderDetailsState = {
  order: null,
  orderByNumber: null,
  request: false,
  newOrder: {
    order: null,
    name: ''
  },
  feed: {
    success: false,
    total: 0,
    totalToday: 0,
    orders: []
  },
  userOrders: [],
  isLoading: false,
  error: null
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.newOrder = { order: null, name: '' };
      state.error = null;
    },
    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.request = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchAllOrders
      .addCase(fetchAllOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.feed = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.feed = null;
      })

      // fetchOrderByNumber
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.orderByNumber = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orderByNumber = action.payload.orders[0];
      })
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
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.userOrders = null;
      })

      // createNewOrder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
        state.request = true;
        state.error = null;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.request = false;
        state.newOrder = {
          order: action.payload.order,
          name: action.payload.name
        };
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.request = false;
        state.error = action.payload as string;
      });
  },
  selectors: {
    selectFeedOrders: (state) => state.feed.orders,
    selectOrderLoad: (state) => state.isLoading,
    selectOrderNumber: (state) => state.orderByNumber,
    selectFeed: (state) => state.feed,
    selectNewOrder: (state) => state.newOrder,
    selectRequest: (state) => state.request,
    selectUserOrders: (state) => state.userOrders
  }
});

export const { clearOrder, setOrderRequest, clearError } = ordersSlice.actions;
export default ordersSlice.reducer;

export const {
  selectFeedOrders,
  selectOrderLoad,
  selectOrderNumber,
  selectFeed,
  selectNewOrder,
  selectRequest,
  selectUserOrders
} = ordersSlice.selectors;
