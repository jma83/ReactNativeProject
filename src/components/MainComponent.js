import { BottomTabNavigator } from '@navigation/TabNavigator';
import { WelcomeStackNavigator } from '@navigation/StackNavigator';
import React from 'react';

export default class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  render() {
    return this.state.loggedIn == true ? <WelcomeStackNavigator /> : <BottomTabNavigator />;
  }
}
