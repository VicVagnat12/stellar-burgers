import { updateUserData } from '../actions';
import { initialState } from '../user-slice';
import { userReducer } from '../user-slice';
import { firstTestUser, secondTestUser } from '../../../constants/test-user';

describe('updateUserData action', () => {
  test('обработка начала запроса - pending', () => {
    const stateWithUserAndError = {
      ...initialState,
      user: firstTestUser,
      error: 'Old error'
    };
    const action = { type: updateUserData.pending.type };
    const result = userReducer(stateWithUserAndError, action);
  
    // при обновлении данных пользователя сбрасываются предыдущие ошибки, isLoading=true, пользователь остается
    expect(result.isLoading).toBe(true);
    expect(result.error).toBeNull();
    expect(result.user).toEqual(firstTestUser);
  });

  test('обрабатывает успешное обновленние данных пользователя - fulfilled', () => {
    const stateWithUser = {
      ...initialState,
      user: firstTestUser
    };
    const action = {
      type: updateUserData.fulfilled.type,
      payload: { user: secondTestUser }
    };
    const result = userReducer(stateWithUser, action);

    // при успешном обновлении заменяются данные пользователя на новые
    expect(result.user).toEqual(secondTestUser);
  });

  test('обрабатывает ошибку при обновлении данных пользователя - rejected', () => {
    const stateWithUser = {
      ...initialState,
      user: firstTestUser
    };
    const errMessage = 'Error updateUserData';
    const action = {
      type: updateUserData.rejected.type,
      payload: errMessage
    };
    const result = userReducer(stateWithUser, action);
  
    // при ошибке сохраняется error, но данные пользователя остаются прежними
    expect(result.error).toBe(errMessage);
    expect(result.user).toEqual(firstTestUser);
  });
});
