import AuthContext from '@application/context/AuthContext';
import AsyncStorageManager from '@application/storage/AsyncStorageManager';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigator } from '@navigation/TabNavigator';
import { WelcomeStackNavigator } from '@navigation/StackNavigator';

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        const user = await AsyncStorageManager.getItem('user');
        const token = await AsyncStorageManager.getItem('userToken');
        if (!user || !token) {
          return;
        }
        userToken = { user, token };
        console.log('userTokenizer!!!!', userToken);
      } catch (e) {}
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        await AsyncStorageManager.setItem('user', data.nickname);
        await AsyncStorageManager.setItem('userToken', data.token);
        dispatch({ type: 'SIGN_IN', userData: data, token: 'user-token' });
      },
      signOut: () => {
        AsyncStorageManager.removeItem('user');
        AsyncStorageManager.removeItem('userToken');
        dispatch({ type: 'SIGN_OUT' });
      }
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.userToken == null ? <WelcomeStackNavigator /> : <BottomTabNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
