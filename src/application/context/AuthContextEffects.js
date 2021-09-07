import * as React from 'react';
import { userManager } from '@application/container/AppManagers.js';
const effects = dispatch => {
  React.useEffect(() => {
    const checkUserSessionOnLoad = async () => {
      let finalToken = null;
      try {
        const { nickname, userToken } = await userManager.getCurrentUserInStorage();
        if (!nickname || !userToken) {
          return;
        }
        const newUserToken = await userManager.signInUserProfile(nickname, userToken);
        if (newUserToken == null) {
          return;
        }
        userManager.setCurrentUserInStorage(nickname, newUserToken);
        finalToken = { nickname, newUserToken };
      } catch (e) {}
      dispatch({ type: 'RESTORE_TOKEN', token: finalToken });
    };

    checkUserSessionOnLoad();
  }, []);
};

export { effects };
