import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useSelector, useDispatch } from '../../services/store';
import {
  getNewOrder,
  getOrderRequest,
  finishOrderRequest
} from '../../services/orders/orders-slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { createNewOrder } from '../../services/orders/actions';
import {
  getConstructorState,
  resetConstructor
} from '../../services/burger-constructor/burger-constructor-slice';
import { getUser } from '../../services/user/user-slice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector(getUser);
  const userBurger = useSelector(getConstructorState);
  const orderRequest = useSelector(getOrderRequest);
  const { order: orderModalData } = useSelector(getNewOrder);

  const onOrderClick = () => {
    if (!userBurger.bun) {
      return;
    }

    if (!user) {
      return navigate('/login', {
        state: { from: location }
      });
    } else {
      const itemsId = [
        userBurger.bun._id,
        ...userBurger.ingredients.map((ingredient) => ingredient._id),
        userBurger.bun._id
      ];

      dispatch(createNewOrder(itemsId)).then(() => {
        dispatch(resetConstructor());
      });
    }
  };

  const closeOrderModal = () => {
    dispatch(finishOrderRequest());
  };

  const price = useMemo(
    () =>
      (userBurger.bun ? userBurger.bun.price * 2 : 0) +
      userBurger.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [userBurger]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={userBurger}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
