import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients/ingredients-slice';
import { ordersReducer } from './orders/orders-slice';
import { userReducer } from './user/user-slice';
import burgerConstructorReducer from './burger-constructor/burger-constructor-slice';

///сбор редьюсеров в один
export const rootReducer = combineReducers({
  'burger-constructor': burgerConstructorReducer,
  ingredients: ingredientsReducer,
  orders: ordersReducer,
  user: userReducer
});
