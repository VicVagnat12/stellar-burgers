import { TOrderDetailsState } from '../services/orders/orders-slice';

export const orderStateTest: TOrderDetailsState = {
  userOrders: [],
  orderByNumber: null,
  newOrder: {
    order: null,
    name: '',
    number: null
  },
  feed: {
    orders: [],
    total: 0,
    totalToday: 0,
    success: false
  },
  isRequestPending: false,
  isLoading: false,
  error: null
};
