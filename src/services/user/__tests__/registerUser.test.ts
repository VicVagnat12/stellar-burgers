import { registerUser } from '../actions';
import { initialState } from '../user-slice';
import { userReducer } from '../user-slice';
import { mockAuthResponse } from '../../../constants/test-user';

describe('registerUser action', () => {
  test('обработка начала запроса - pending', () => {
    const stateWithError = {
      ...initialState,
      error: 'Old Error'
    };
    const action = { type: registerUser.pending.type };
    const result = userReducer(stateWithError, action);

    // при начале регистрации сбрасываются предыдущее ошибки и isLoading=true
    expect(result.isLoading).toBe(true);
    expect(result.error).toBeNull();
  });

  test('обрабатывает успешную регистрацию пользователя - fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: mockAuthResponse
    };
    const result = userReducer(initialState, action);

    expect(result.authInitialized).toBe(true);
    // при успешной регистрации сохраняются данные пользователя
    expect(result.user).toEqual(mockAuthResponse.user);
  });

  test('обрабатывает ошибку при регистрации- rejected', () => {
    const errMessage = 'Error registerUser';
    const action = {
      type: registerUser.rejected.type,
      payload: errMessage
    };
    const result = userReducer(initialState, action);

    expect(result.error).toBe(errMessage);
    expect(result.user).toBeNull();
    expect(result.authInitialized).toBe(false);
  });
});
