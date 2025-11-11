import { ordersReducer } from '../orders-slice';
import { createNewOrder } from '../actions';
import { orderStateTest } from '../../../constants/test-orders-state';
import { firstTestOrder } from '../../../constants/test-orders';

describe('createNewOrder action', () => {
  const initialState = orderStateTest;

  test('обработка начала запроса - pending', () => {
    const action = { type: createNewOrder.pending.type };
    const state = ordersReducer(initialState, action);

    // проверяем при начале запроса isLoading и isRequestPending = true, error = null
    expect(state.isLoading).toBe(true);
    expect(state.isRequestPending).toBe(true);
    expect(state.error).toBe(null);
  });

  test('обрабатывает успешное создание заказа - fulfilled', () => {
    const mockResponse = {
      success: true,
      name: 'Флюоресцентный люминесцентный бургер',
      order: firstTestOrder
    };
    const action = {
      type: createNewOrder.fulfilled.type,
      payload: mockResponse
    };
    const state = ordersReducer(initialState, action);

    // проверяем изменения isLoading, isRequestPending, error, а также созданный заказ
    expect(state.isLoading).toBe(false);
    expect(state.isRequestPending).toBe(false);
    expect(state.error).toBe(null);
    expect(state.newOrder).toEqual({
      order: firstTestOrder,
      name: mockResponse.name,
      number: firstTestOrder.number
    });
  });

  test('обрабатывает ошибку создания заказа - rejected', () => {
    const errMessage = 'Error createNewOrder';
    const action = {
      type: createNewOrder.rejected.type,
      payload: errMessage
    };
    const state = ordersReducer(initialState, action);

    // проверяем изменения isLoading, isRequestPending и записанную ошибку в error state
    expect(state.isLoading).toBe(false);
    expect(state.isRequestPending).toBe(false);
    expect(state.error).toBe(errMessage);
  });
});
