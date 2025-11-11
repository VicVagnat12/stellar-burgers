import { ordersReducer } from '../orders-slice';
import { fetchUserOrders } from '../actions';
import { orderStateTest } from '../../../constants/test-orders-state';
import {
  firstTestOrder,
  secondTestOrder
} from '../../../constants/test-orders';

describe('fetchUserOrders action', () => {
  const initialState = orderStateTest;

  test('обработка начала запроса - pending', () => {
    const action = { type: fetchUserOrders.pending.type };
    const state = ordersReducer(initialState, action);

    expect(state.isLoading).toBe(true);
  });

  test('обрабатывает успешно полученные заказы профиля - fulfilled', () => {
    const mockOrders = [firstTestOrder, secondTestOrder];
    const action = {
      type: fetchUserOrders.fulfilled.type,
      payload: mockOrders
    };
    const state = ordersReducer(initialState, action);

    // сохранение заказов должно быть в state.userOrders
    expect(state.userOrders).toEqual(mockOrders);
  });

  test('обрабатывает ошибку получения заказов профиля - rejected', () => {
    const errMessage = 'Error fetchUserOrders';
    const action = {
      type: fetchUserOrders.rejected.type,
      payload: errMessage
    };
    const state = ordersReducer(initialState, action);

    expect(state.error).toBe(errMessage);

    // заказы сброшены, массив пуст
    expect(state.userOrders).toEqual([]);
  });
});
