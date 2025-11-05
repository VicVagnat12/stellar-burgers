import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getFeedOrders,
  getOrdersLoading
} from '../../services/orders/orders-slice';
import { fetchAllOrders } from '../../services/orders/actions';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(getFeedOrders);
  const isLoading = useSelector(getOrdersLoading);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchAllOrders());
  };

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
