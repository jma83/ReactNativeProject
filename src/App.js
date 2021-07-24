import { NavigationContainer } from '@react-navigation/native';
import MainComponent from './components/MainComponent';
import React from 'react';

const App = () => {
  return (
    <NavigationContainer>
      <MainComponent />
    </NavigationContainer>
  );
};

export default App;
