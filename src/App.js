import AuthContext from '@application/context/AuthContext';
import * as React from 'react';
import { effects } from '@application/context/AuthContextEffects';
import { signIn, signOut } from '@application/context/AuthContextActions';
import { reducerActionTypes, defaultValues } from '@application/data/AuthActionTypes';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigator } from '@navigation/TabNavigator';
import { WelcomeStackNavigator } from '@navigation/StackNavigator';
import UserManager from '@application/managers/generic/entities/UserManager.js';

export default function App() {
  const [state, dispatch] = React.useReducer(reducerActionTypes, defaultValues);
  effects(dispatch, new UserManager());
  const actions = () => ({
    signIn: signIn(dispatch),
    signOut: signOut(dispatch)
  });
  const authContext = React.useMemo(actions, []);
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.userToken == null ? <WelcomeStackNavigator /> : <BottomTabNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
