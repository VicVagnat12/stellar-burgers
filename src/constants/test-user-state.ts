import { TUserState } from '../services/user/user-slice';

export const userTestState: TUserState = {
  user: null,
  authInitialized: false,
  isLoading: false,
  error: null
};
