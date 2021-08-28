import AsyncStorageManager from '@application/storage/AsyncStorageManager';

const signIn = dispatch => {
  return async data => {
    await AsyncStorageManager.setItem('user', data.nickname);
    await AsyncStorageManager.setItem('userToken', data.token);
    dispatch({ type: 'SIGN_IN', userData: data, token: 'user-token' });
  };
};
const signOut = dispatch => {
  return async () => {
    await AsyncStorageManager.removeItem('user');
    await AsyncStorageManager.removeItem('userToken');
    dispatch({ type: 'SIGN_OUT' });
  };
};

export { signIn, signOut };
