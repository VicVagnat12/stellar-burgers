import { mockBun, mockMain, mockSauce } from "./test-burger-ingredients";
import { TConstructorIngredient } from "@utils-types";

export const mockBurgerConstructor = {
    bun: { ...mockBun, id: 'bun-test-id' },
    ingredients: [
      { ...mockMain, id: 'main-test-id' },
      { ...mockSauce, id: 'sauce-test-id' }
    ] as TConstructorIngredient[]
  };
  
  export const emptyBurgerConstructor = {
    bun: null,
    ingredients: [] as TConstructorIngredient[]
  };