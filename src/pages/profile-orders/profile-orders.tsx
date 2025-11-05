import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getUserOrders, getNewOrder } from '../../services/orders/orders-slice';
import { useDispatch, useSelector } from '../../services/store';
import { getUser } from '../../services/user/user-slice';
import { fetchUserOrders } from '../../services/orders/actions';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(getUserOrders) || [];
  const user = useSelector(getUser);
  const newOrder = useSelector(getNewOrder);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserOrders());
    }
  }, [dispatch, user, newOrder]);

  return <ProfileOrdersUI orders={orders} />;
};
