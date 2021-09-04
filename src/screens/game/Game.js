import React from 'react';
import { Text } from 'react-native';
import globalStyles from '@utils/GlobalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import LayoutScrollGame from '@screens/game/layout/LayoutScrollGame';
import PrimaryButton from '@components/buttons/PrimaryButton';

export default class Game extends React.Component {
  render() {
    return <LayoutScrollGame title={this.getTitle()} subtitle={this.getSubTitle()} buttons1={this.getButtons1()} />;
  }

  getTitle() {
    return `Ready to guess Rick & Morty Characters? \n`;
  }

  getSubTitle() {
    return `Choose between 4 images, only one matches the correct character!`;
  }

  getButtons1() {
    return (
      <PrimaryButton color={globalStyles.SecondaryBackgroundColor} onPressed={() => this.onContentPressed()}>
        <Icon name="rocket" size={28} color={'white'} />
        <Text style={globalStyles.CustomMDFont}> Start game </Text>
      </PrimaryButton>
    );
  }

  /* getButtons2() {
    return (
      <PrimaryButton color={globalStyles.PrimaryBackgroundColor} onPressed={() => {}}>
        <Icon name="stats-chart" size={28} color={'white'} />
        <Text style={globalStyles.CustomMDFont}>Scores </Text>
      </PrimaryButton>
    );
  } */

  onContentPressed() {
    this.props.navigation.navigate('Play Game');
  }
}
