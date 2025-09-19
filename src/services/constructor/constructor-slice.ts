import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '../../utils/types';
import { v4 as uuidv4 } from 'uuid';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  totalPrice: number;
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
  totalPrice: 0,
};

const calculateTotalPrice = (bun: TConstructorIngredient | null, ingredients: TConstructorIngredient[]): number => {
  const bunPrice = bun ? bun.price * 2 : 0;
  const ingredientsPrice = ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0);
  return bunPrice + ingredientsPrice;
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          // Если добавляем новую булку, заменяем старую
          state.bun = action.payload;
        } else {
          // Добавляем ингредиент в конец списка
          state.ingredients.push(action.payload);
        }
        // Пересчитываем общую стоимость
        state.totalPrice = calculateTotalPrice(state.bun, state.ingredients);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { 
          ...ingredient, 
          id: uuidv4() // Используем id вместо uuid для соответствия типу
        },
      }),
    },
    
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
      state.totalPrice = calculateTotalPrice(state.bun, state.ingredients);
    },
    
    moveIngredient: {
      reducer: (state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) => {
        const { dragIndex, hoverIndex } = action.payload;
        const draggedItem = state.ingredients[dragIndex];
        
        // Создаем новый массив без перемещаемого элемента
        const newIngredients = [...state.ingredients];
        newIngredients.splice(dragIndex, 1);
        
        // Вставляем элемент на новую позицию
        newIngredients.splice(hoverIndex, 0, draggedItem);
        
        state.ingredients = newIngredients;
      },
      prepare: (dragIndex: number, hoverIndex: number) => ({
        payload: { dragIndex, hoverIndex },
      }),
    },
    
    updateIngredient: (state, action: PayloadAction<{ id: string; updates: Partial<TConstructorIngredient> }>) => {
      const { id, updates } = action.payload;
      const index = state.ingredients.findIndex(ing => ing.id === id);
      
      if (index !== -1) {
        state.ingredients[index] = { ...state.ingredients[index], ...updates };
        state.totalPrice = calculateTotalPrice(state.bun, state.ingredients);
      }
    },
    
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
      state.totalPrice = 0;
    },
    
    setConstructorFromOrder: {
      reducer: (state, action: PayloadAction<{ bun: TConstructorIngredient; ingredients: TConstructorIngredient[] }>) => {
        state.bun = action.payload.bun;
        state.ingredients = action.payload.ingredients;
        state.totalPrice = calculateTotalPrice(state.bun, state.ingredients);
      },
      prepare: (bun: TIngredient, ingredients: TIngredient[]) => ({
        payload: {
          bun: { ...bun, id: uuidv4() },
          ingredients: ingredients.map(ing => ({ ...ing, id: uuidv4() }))
        },
      }),
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  updateIngredient,
  clearConstructor,
  setConstructorFromOrder,
} = constructorSlice.actions;

// Селекторы
export const selectConstructorIngredients = (state: { burgerConstructor: TConstructorState }) => 
  state.burgerConstructor.ingredients;

export const selectConstructorBun = (state: { burgerConstructor: TConstructorState }) => 
  state.burgerConstructor.bun;

export const selectTotalPrice = (state: { burgerConstructor: TConstructorState }) => 
  state.burgerConstructor.totalPrice;

export const selectConstructorItems = (state: { burgerConstructor: TConstructorState }) => 
  state.burgerConstructor;

export const selectIngredientCounts = (state: { burgerConstructor: TConstructorState }) => {
  const counts: { [key: string]: number } = {};
  
  // Считаем булку
  if (state.burgerConstructor.bun) {
    counts[state.burgerConstructor.bun._id] = 2; // Булки всегда 2 штуки
  }
  
  // Считаем остальные ингредиенты
  state.burgerConstructor.ingredients.forEach(ingredient => {
    counts[ingredient._id] = (counts[ingredient._id] || 0) + 1;
  });
  
  return counts;
};

// Селектор для получения массива ID ингредиентов для отправки заказа
export const selectOrderIngredientsIds = (state: { burgerConstructor: TConstructorState }) => {
  const { bun, ingredients } = state.burgerConstructor;
  const bunIds = bun ? [bun._id, bun._id] : []; // Булки добавляем дважды
  const ingredientIds = ingredients.map(ing => ing._id);
  
  return [...bunIds, ...ingredientIds];
};

export default constructorSlice.reducer;