import { loginUser } from '../actions';
import { initialState } from '../user-slice';
import { userReducer } from '../user-slice';
import { mockAuthResponse } from '../../../constants/test-user';

describe('loginUser action', () => {
  test('обработка начала запроса - pending', () => {
    const stateWithError = {
      ...initialState,
      error: 'Old Error'
    };
    const action = { type: loginUser.pending.type };
    const result = userReducer(stateWithError, action);

    // при начале запроса на вход сбрасываются предыдущее ошибки и isLoading=true
    expect(result.isLoading).toBe(true);
    expect(result.error).toBeNull();
    expect(result.user).toBeNull();
  });

  test('обрабатывает успешный вход пользователя - fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: mockAuthResponse
    };
    const result = userReducer(initialState, action);

    expect(result.authInitialized).toBe(true);
    // при успешном входе сохраняются данные пользователя
    expect(result.user).toEqual(mockAuthResponse.user);
  });

  test('обрабатывает ошибку входа пользователя - rejected', () => {
    const errMessage = 'Error loginUser';
    const action = {
      type: loginUser.rejected.type,
      payload: errMessage
    };
    const result = userReducer(initialState, action);
    // появляется сообщение об ошибке, user=null, authInitialized=false
    expect(result.error).toBe(errMessage);
    expect(result.user).toBeNull();
    expect(result.authInitialized).toBe(false);
  });
});
