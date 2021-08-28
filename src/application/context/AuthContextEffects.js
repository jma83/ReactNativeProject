import AsyncStorageManager from '@application/managers/storage/AsyncStorageManager';
import * as React from 'react';

const effects = dispatch => {
  React.useEffect(() => {
    const checkUserSessionOnLoad = async () => {
      let userToken = null;
      try {
        const user = await AsyncStorageManager.getItem('user');
        const token = await AsyncStorageManager.getItem('userToken');
        if (!user || !token) {
          return;
        }
        userToken = { user, token };
      } catch (e) {}
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    checkUserSessionOnLoad();
  }, []);
};

export { effects };
