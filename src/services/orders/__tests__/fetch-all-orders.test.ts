import { ordersReducer } from '../orders-slice';
import { fetchAllOrders } from '../actions';
import { orderStateTest } from '../../../constants/test-orders-state';
import {
  firstTestOrder,
  secondTestOrder
} from '../../../constants/test-orders';

describe('fetchAllOrders action', () => {
  const initialState = orderStateTest;

  test('обработка начала запроса - pending', () => {
    const action = { type: fetchAllOrders.pending.type };
    const state = ordersReducer(initialState, action);

    expect(state.isLoading).toBe(true);
  });

  test('обрабатывает успешно полученные данные (feed) - fulfilled', () => {
    const mockResponse = {
      success: true,
      orders: [firstTestOrder, secondTestOrder],
      total: 333,
      totalToday: 13
    };

    const action = {
      type: fetchAllOrders.fulfilled.type,
      payload: mockResponse
    };
    const state = ordersReducer(initialState, action);

    // mockResponse должен сохраняться в state.feed
    expect(state.feed).toEqual(mockResponse);
  });

  test('обрабатывает ошибку получения данных (feed) - rejected', () => {
    const errMessage = 'Error fetchAllOrders';
    const action = {
      type: fetchAllOrders.rejected.type,
      payload: errMessage
    };
    const state = ordersReducer(initialState, action);

    expect(state.error).toBe(errMessage);

    // при ошибке feed - сброшен
    expect(state.feed).toEqual({
      success: false,
      orders: [],
      total: 0,
      totalToday: 0
    });
  });
});
