import { logoutUser } from '../actions';
import { initialState } from '../user-slice';
import { userReducer } from '../user-slice';
import { firstTestUser } from '../../../constants/test-user';

describe('logoutUser action', () => {
  test('обработка начала запроса - pending', () => {
    const stateWithError = {
      ...initialState,
      user: firstTestUser,
      error: 'Old Error'
    };
    const action = { type: logoutUser.pending.type };
    const result = userReducer(stateWithError, action);

    // пользователь пока еще не сброшен, но сбрасывается error=null
    expect(result.isLoading).toBe(true);
    expect(result.error).toBeNull();
    expect(result.user).toEqual(firstTestUser);
  });

  test('обрабатывает успешный выход пользователя из профиля - fulfilled', () => {
    const stateWithUser = {
      ...initialState,
      user: firstTestUser
    };
    const action = { type: logoutUser.fulfilled.type };
    const result = userReducer(stateWithUser, action);
    // при успешном выходе данные пользователя полностью очищаются
    expect(result.user).toBeNull();
  });

  test('обрабатывает ошибку выхода из профиля - rejected', () => {
    const errMessage = 'Error logoutUser';
    const action = {
      type: logoutUser.rejected.type,
      payload: errMessage
    };
    const result = userReducer(initialState, action);

    expect(result.error).toBe(errMessage);
    expect(result.user).toBeNull();
  });
});
