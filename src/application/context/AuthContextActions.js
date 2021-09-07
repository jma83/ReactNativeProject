import { userManager } from '@application/container/AppManagers.js';

const signIn = dispatch => {
  return async data => {
    userManager.setCurrentUserInStorage(data.nickname, data.token).then(() => {
      dispatch({ type: 'SIGN_IN', userData: data, token: true });
    });
  };
};
const signOut = dispatch => {
  return async () => {
    userManager.removeCurrentUserInStorage().then(() => {
      dispatch({ type: 'SIGN_OUT' });
    });
  };
};

export { signIn, signOut };
