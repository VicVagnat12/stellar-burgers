import { TUser } from '@utils-types';

export const firstTestUser: TUser = {
  name: 'Александр Первый',
  email: 'firstUser@example.com'
};

export const secondTestUser: TUser = {
  name: 'Александр Второй',
  email: 'secondUser@example.com'
};

export const mockAuthResponse = {
  user: firstTestUser,
  accessToken: 'Bearer short-lived-access-token',
  refreshToken: 'long-lived-refresh-token'
};
