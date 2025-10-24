import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import {
  getCurrentIngredient,
  setCurrentIngredient,
  clearCurrentIngredient,
  getIngredients
} from '../../services/ingredients/ingredients-slice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const ingredientData = useSelector(getCurrentIngredient);
  const allIngredients = useSelector(getIngredients);

  useEffect(() => {
    // Если currentIngredient не установлен, но есть ID и загружены ингредиенты
    if (id && allIngredients.length > 0) {
      const ingredient = allIngredients.find((ing) => ing._id === id);
      if (ingredient) {
        dispatch(setCurrentIngredient(ingredient));
      }
    }
  }, [id, allIngredients, dispatch]);

  // Очистка при размонтировании компонента
  useEffect(
    () => () => {
      dispatch(clearCurrentIngredient());
    },
    [dispatch]
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
