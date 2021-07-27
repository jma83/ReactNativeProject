import { BottomTabNavigator } from '@components/navigation/TabNavigator';
import { WelcomeStackNavigator } from '@components/navigation/StackNavigator';
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
