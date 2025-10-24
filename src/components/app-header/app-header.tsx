import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUser } from '../../services/user/user-slice';

export const AppHeader: FC = () => {
  const userName = useSelector(getUser)?.name;

  return <AppHeaderUI userName={userName || ''} />;
};
