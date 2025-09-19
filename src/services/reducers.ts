import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients/ingredients-slice'
import ordersReducer from './orders/orders-slice';
import userReducer from './user/user-slice';


export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  orders: ordersReducer,
  user: userReducer
});
