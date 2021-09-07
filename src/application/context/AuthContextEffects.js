import AsyncStorageManager from '@application/managers/storage/AsyncStorageManager';
import * as React from 'react';

const effects = (dispatch, userManager) => {
  React.useEffect(() => {
    const checkUserSessionOnLoad = async () => {
      let userToken = null;
      try {
        const user = await AsyncStorageManager.getItem('user');
        const token = await AsyncStorageManager.getItem('userToken');
        if (!user || !token) {
          return;
        }
        const newUserToken = await userManager.signInUserProfile(user, token);
        if (newUserToken == null) {
          return;
        }
        await AsyncStorageManager.setItem('userToken', newUserToken);
        userToken = { user, newUserToken };
      } catch (e) {}
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    checkUserSessionOnLoad();
  }, []);
};

export { effects };
