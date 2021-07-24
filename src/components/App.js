import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigator } from './navigation/TabNavigator';
import { WelcomeStackNavigator } from './navigation/StackNavigator';
import React from 'react';

function Greeting(props) {
  console.log('checkLoggedIn', props.checkLoggedIn);
  if (props.checkLoggedIn == true) {
    console.log('aaaa');

    return <WelcomeStackNavigator />;
  } else {
    console.log('bbbb');

    return <BottomTabNavigator />;
  }
}

const App = () => {
  return (
    <NavigationContainer>
      <Greeting checkLoggedIn={false} />
    </NavigationContainer>
  );
};

export default App;
