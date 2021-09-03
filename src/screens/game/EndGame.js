import React from 'react';
import { Text } from 'react-native';
import globalStyles from '@src/utils/GlobalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import LayoutScrollGame from '@screens/game/LayoutScrollGame';
import PrimaryButton from '@components/buttons/PrimaryButton';

export default class EndGame extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LayoutScrollGame
        title={this.getTitle()}
        subtitle={this.getSubTitle()}
        buttons1={this.getButtons1()}
        buttons2={this.getButtons2()}
      />
    );
  }

  getTitle() {
    const half = this.props.route.params.maxRounds / 2;
    if (half > this.props.route.params.guessed) {
      return 'I bet you can do better than that!';
    } else {
      return 'Well done!';
    }
  }

  getSubTitle() {
    return `Result: ${this.props.route.params.guessed}/${this.props.route.params.maxRounds}`;
  }

  getButtons1() {
    return (
      <PrimaryButton color={globalStyles.SecondaryBackgroundColor} onPressed={() => this.onPlayPressed()}>
        <Icon name="rocket" size={28} color={'white'} />
        <Text style={globalStyles.CustomMDFont}> Play Again </Text>
      </PrimaryButton>
    );
  }

  getButtons2() {
    return (
      <PrimaryButton color={globalStyles.PrimaryBackgroundColor} onPressed={() => this.onReturnPressed()}>
        <Icon name="stats-chart" size={28} color={'white'} />
        <Text style={globalStyles.CustomMDFont}> Go Back </Text>
      </PrimaryButton>
    );
  }

  onPlayPressed = () => {
    this.props.navigation.navigate('Play Game');
  };

  onReturnPressed = () => {
    this.props.navigation.navigate('Game');
  };
}
