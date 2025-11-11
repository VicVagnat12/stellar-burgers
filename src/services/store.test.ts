import { rootReducer } from "./reducers";

describe('rootReducer initialization', () => {
  test('должен вернуть корректную инициализацию', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual({
      'burger-constructor': {
        bun: null,
        ingredients: []
      },
      ingredients: {
        items: [],
        currentIngredient: null,
        isLoading: false,
        error: null
      },
      orders: {
        userOrders: [],
        orderByNumber: null,
        newOrder: {
          order: null,
          name: '',
          number: null
        },
        feed: {
            success: false,
            total: 0,
            totalToday: 0,
            orders: []
          },
        isRequestPending: false,
        isLoading: false,
        error: null,
      },
      user: {
        user: null,
        authInitialized: false,
        isLoading: false,
        error: null,
      }
    });
  });
});