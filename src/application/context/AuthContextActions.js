import AsyncStorageManager from '@application/managers/storage/AsyncStorageManager';

const signIn = dispatch => {
  return async data => {
    await AsyncStorageManager.setItem('user', data.nickname);
    await AsyncStorageManager.setItem('userToken', data.token);
    dispatch({ type: 'SIGN_IN', userData: data, token: true });
  };
};
const signOut = dispatch => {
  return async () => {
    Promise.all(AsyncStorageManager.removeItem('user'), AsyncStorageManager.removeItem('userToken')).then(() =>
      dispatch({ type: 'SIGN_OUT' })
    );
  };
};

export { signIn, signOut };
