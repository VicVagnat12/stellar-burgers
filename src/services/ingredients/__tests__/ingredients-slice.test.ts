import { fetchIngredients } from '../actions';
import {
  mockBun,
  mockMain,
  mockSauce
} from '../../../constants/test-burger-ingredients';
import ingredientsReducer from '../ingredients-slice';

describe('ingredientsSlice', () => {
  const initialState = {
    items: [],
    currentIngredient: null,
    isLoading: false,
    error: null
  };

  test('проверяет что isLoading=true при pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const result = ingredientsReducer(initialState, action);

    expect(result.isLoading).toBe(true);
    expect(result.error).toBeNull();
    expect(result.items).toEqual([]);
    expect(result.currentIngredient).toBeNull();
  });

  test('проверяет что isLoading=false и items заполняется данными при fulfilled', () => {
    const mockIngredients = [mockBun, mockMain, mockSauce];
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const result = ingredientsReducer(initialState, action);

    expect(result.isLoading).toBe(false);
    expect(result.items).toEqual(mockIngredients);
    expect(result.error).toBeNull();
    expect(result.currentIngredient).toBeNull();
  });

  test('проверяет что isLoading=false и в error записывается ошибка при rejected', () => {
    const errMessage = 'Ошибка загрузки';
    const action = {
      type: fetchIngredients.rejected.type,
      payload: errMessage
    };
    const result = ingredientsReducer(initialState, action);

    expect(result.isLoading).toBe(false);
    expect(result.error).toBe(errMessage);
    expect(result.items).toEqual([]);
    expect(result.currentIngredient).toBeNull();
  });
});
