import { emptyBurgerConstructor } from '../../../constants/test-burger-constructor';
import {
  mockBun,
  mockMain,
  mockSauce
} from '../../../constants/test-burger-ingredients';
import {
  addItems,
  removeIngredient,
  moveIngredient
} from '../burger-constructor-slice';
import burgerConstructorReducers from '../burger-constructor-slice';

describe('burgerConstructor reducer', () => {
  test('проверяем, что булка добавилась в bun с уникальным id', () => {
    const initialState = emptyBurgerConstructor;
    const action = addItems(mockBun);
    const newState = burgerConstructorReducers(initialState, action);

    expect(newState.bun).toEqual({ ...mockBun, id: expect.any(String) });

    // массив ingredients должен остаться пустым
    expect(newState.ingredients).toHaveLength(0);
  });

  test('проверяем, что начинка добавилась в ingredients с уникальным id', () => {
    const initialState = emptyBurgerConstructor;

    const action = addItems(mockMain);
    const newState = burgerConstructorReducers(initialState, action);

    // проверяем что булка осталась null
    expect(newState.bun).toBeNull();
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toEqual({
      ...mockMain,
      id: expect.any(String)
    });
  });

  test('соус должен добавляться в ingredients', () => {
    const initialState = emptyBurgerConstructor;

    const action = addItems(mockSauce);
    const newState = burgerConstructorReducers(initialState, action);

    // проверяем что булка осталась null
    expect(newState.bun).toBeNull();
    expect(newState.ingredients).toHaveLength(1);

    // проверяем, что добавили конкретно соус по type и name
    expect(newState.ingredients[0].type).toBe('sauce');
    expect(newState.ingredients[0].name).toBe(
      'Соус с шипами Антарианского плоскоходца'
    );
  });

  test('удаление происходит по уникальному id', () => {
    const initialState = {
      bun: { ...mockBun, id: 'bun-id' },
      ingredients: [
        { ...mockMain, id: 'main-id' },
        { ...mockSauce, id: 'sauce-id' },
        { ...mockMain, id: 'main-id-2' }
      ]
    };

    const action = removeIngredient('sauce-id');
    const newState = burgerConstructorReducers(initialState, action);

    expect(newState.ingredients).toHaveLength(2);

    /// проверяем, что удаленный ингредиент отсутствует и массив содержит нужные items
    expect(
      newState.ingredients.find((item) => item.id === 'sauce-id')
    ).toBeUndefined();
    expect(newState.ingredients.map((item) => item.id)).toEqual([
      'main-id',
      'main-id-2'
    ]);
  });

  test('можно поменять индексы у 1 и 2 ингредиента', () => {
    const initialState = {
      bun: { ...mockBun, id: 'bun-id' },
      ingredients: [
        { ...mockMain, id: '1', name: 'Первый' },
        { ...mockSauce, id: '2', name: 'Второй' },
        { ...mockMain, id: '3', name: 'Третий' }
      ]
    };

    // меняем местами первый и второй ингредиенты
    const action = moveIngredient({ fromIndex: 0, toIndex: 1 });
    const newState = burgerConstructorReducers(initialState, action);

    // проверяем порядок items после перемещения по id и name
    expect(newState.ingredients.map((item) => item.id)).toEqual([
      '2',
      '1',
      '3'
    ]);
    expect(newState.ingredients[0].name).toBe('Второй');
    expect(newState.ingredients[1].name).toBe('Первый');
  });
});
