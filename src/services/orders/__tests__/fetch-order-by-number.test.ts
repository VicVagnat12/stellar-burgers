import { ordersReducer } from '../orders-slice';
import { fetchOrderByNumber } from '../actions';
import { orderStateTest } from '../../../constants/test-orders-state';
import { firstTestOrder } from '../../../constants/test-orders';

describe('fetchOrderByNumber action', () => {
  const initialState = orderStateTest;

  test('обработка начала запроса - pending', () => {
    const action = { type: fetchOrderByNumber.pending.type };
    const state = ordersReducer(initialState, action);

    // при начале запроса state.orderByNumber = null
    expect(state.isLoading).toBe(true);
    expect(state.orderByNumber).toBe(null);
  });

  test('обрабатывает успешно полученный заказ по номеру - fulfilled', () => {
    const mockResponse = {
      success: true,
      orders: [firstTestOrder]
    };
    const action = {
      type: fetchOrderByNumber.fulfilled.type,
      payload: mockResponse
    };
    const state = ordersReducer(initialState, action);

    // проверка сохранения заказа в state.orderByNumber и сравнение с firstTestOrder
    expect(state.orderByNumber).toEqual(firstTestOrder);
  });

  test('обрабатывает ошибку получения заказа по номеру - rejected', () => {
    const errMessage = 'Error fetchOrderByNumber';
    const action = {
      type: fetchOrderByNumber.rejected.type,
      payload: errMessage
    };
    const state = ordersReducer(initialState, action);

    // при ошибке должен state.orderByNumber=null
    expect(state.error).toBe(errMessage);
    expect(state.orderByNumber).toBe(null);
  });
});
