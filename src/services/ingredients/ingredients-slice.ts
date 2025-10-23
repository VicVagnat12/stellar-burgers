import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
import { fetchIngredients } from './actions';

type TIngredientsState = {
  items: TIngredient[];
  currentIngredient: TIngredient | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TIngredientsState = {
  items: [],
  currentIngredient: null,
  isLoading: false,
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setCurrentIngredient: (
      state,
      action: PayloadAction<TIngredient | null>
    ) => {
      state.currentIngredient = action.payload;
    },
    clearCurrentIngredient: (state) => {
      state.currentIngredient = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
  selectors: {
    getIngredients: (state) => state.items,
    getCurrentIngredient: (state) => state.currentIngredient,
    getIngredientsLoading: (state) => state.isLoading,
    getIngredientsErr: (state) => state.error
  }
});

export const { setCurrentIngredient, clearCurrentIngredient } =
  ingredientsSlice.actions;
export default ingredientsSlice.reducer;

export const {
  getIngredients,
  getCurrentIngredient,
  getIngredientsLoading,
  getIngredientsErr
} = ingredientsSlice.selectors;
