import { checkUserAuth } from '../actions';
import { initialState } from '../user-slice';
import { userReducer } from '../user-slice';
import { firstTestUser } from '../../../constants/test-user';

describe('checkUserAuth action', () => {
  test('обработка начала запроса - pending', () => {
    const action = { type: checkUserAuth.pending.type };
    const result = userReducer(initialState, action);

    expect(result.isLoading).toBe(true);
    expect(result.authInitialized).toBe(false);
    expect(result.user).toBeNull();
  });

  test('обрабатывает успешную аутентификацию пользователя - fulfilled', () => {
    const action = {
      type: checkUserAuth.fulfilled.type,
      payload: firstTestUser
    };
    const result = userReducer(initialState, action);
    
    // устанавливает user, authInitialized=true
    expect(result.authInitialized).toBe(true);
    expect(result.user).toEqual(firstTestUser);
  });

  test('обрабатывает ошибку аутентификации пользователя - rejected', () => {
    const action = { type: checkUserAuth.rejected.type };
    const result = userReducer(initialState, action);

    // authInitialized=true (проверка аутентификации прошла в любом случае) и user: null - пользователь не найден
    expect(result.authInitialized).toBe(true);
    expect(result.user).toBeNull();
  });
});
