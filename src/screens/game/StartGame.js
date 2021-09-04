import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import StartGameManager from '@application/managers/game/StartGameManager';
import ImageCharacterRow from '@components/rowList/ImageCharacterRow';
import globalStyles from '@src/utils/GlobalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import LayoutGame from '@screens/game/layout/LayoutGame';
import FloatingButton from '@components/buttons/FloatingButton';

const defaultStateValues = {
  options: [],
  round: 0,
  name: '',
  count: 3,
  status: '',
  answered: false,
  correct: false,
  ended: false
};

export default class StartGame extends React.Component {
  constructor(props) {
    super(props);
    this.startGameManager = new StartGameManager();
    this.startInterval = null;
    this.inGameInterval = null;
    this.focusSubscription = null;
    this.state = defaultStateValues;
    this.activeStartInterval();
  }

  componentDidMount() {
    this.focusSubscription = this.props.navigation.addListener('focus', () => {
      if (this.state.ended) {
        this.startInterval = null;
        this.inGameInterval = null;
        this.reset();
      }
    });
  }

  componentWillUnmount() {
    this.focusSubscription();
    if (this.inGameInterval) clearInterval(this.inGameInterval);
    if (this.startInterval) clearInterval(this.startInterval);
  }

  reset = () => {
    this.startGameManager.init();
    this.setState(defaultStateValues);
    this.activeStartInterval();
  };

  activeStartInterval() {
    this.setState({ count: this.startGameManager.getTimeBetweenRounds() });
    this.startInterval = setInterval(
      (self => {
        return () => {
          if (self.state.count <= 1) {
            self.startRound();
          } else {
            let count = self.state.count - 1;
            self.setState({ count });
          }
        };
      })(this),
      1000
    );
  }

  activeInGameInterval() {
    this.inGameInterval = setInterval(
      (self => {
        return () => {
          if (self.state.count <= 1) {
            self.endRound();
          } else {
            let count = self.state.count - 1;
            self.setState({ count });
          }
        };
      })(this),
      1000
    );
  }

  async startRound() {
    if (this.startInterval) {
      clearInterval(this.startInterval);
    }
    await this.startGameManager.nextRound();
    const options = this.startGameManager.getOptions();
    const name = this.startGameManager.getCorrectName();
    const count = this.startGameManager.getTimeInRound();
    const round = this.startGameManager.getRound();
    this.setState({ options, round, name, count, answered: false, correct: false, status: '', ended: false });
    this.activeInGameInterval();
  }

  endRound() {
    clearInterval(this.inGameInterval);
    if (this.state.count <= 1 && this.state.answered == false) {
      this.setState({ status: 'Time is over!' });
    }
    this.setState({ count: 0 });
    if (this.startGameManager.checkEnded()) {
      this.setState({ ended: true });
    }
    this.startGameManager.endRound();
  }

  render() {
    return <LayoutGame>{this.state.round > 0 ? this.getMainContent() : this.getStartingContent()}</LayoutGame>;
  }

  renderRow = item => {
    return <ImageCharacterRow imageURI={item.item.image} onPress={this.onContentPressed.bind(this, item.item)} />;
  };

  onContentPressed = item => {
    if (this.state.answered === true || this.state.count === 0) {
      return;
    }
    this.setState({ answered: true });
    if (this.startGameManager.checkAnswer(item)) {
      this.setState({ correct: true, status: 'Nice! Your answer is correct!' });
    } else {
      this.setState({ correct: false, status: 'Oh no! Your answer is wrong!' });
    }
    this.endRound();
  };

  getMainContent() {
    return (
      <View style={styles.content}>
        <View style={[styles.badgeContent, styles.baseContent, { backgroundColor: 'red' }]}>
          <Text style={globalStyles.CustomSMFont}>Timer: {this.state.count} </Text>
        </View>
        <View style={[styles.badgeContent, styles.baseContent, { backgroundColor: 'blue' }]}>
          <Text style={globalStyles.CustomSMFont}>Round: {this.state.round} </Text>
        </View>
        <View style={[styles.sectionContent, styles.baseContent, globalStyles.PrimaryBackgroundColor]}>
          <View style={styles.sectionTitleContainer}>
            <Text style={globalStyles.CustomLGFont}>Who is {this.state.name}?</Text>
            {this.getStatus()}
          </View>
          <FlatList
            numColumns={2}
            columnWrapperStyle={styles.sectionButtonsContainer}
            data={this.state.options}
            renderItem={this.renderRow.bind(this)}
            keyExtractor={(item, index) => index}></FlatList>
        </View>
        {this.getFloatingButton()}
      </View>
    );
  }

  getStartingContent() {
    return (
      <View style={[styles.sectionFirstContent, styles.baseContent, globalStyles.PrimaryBackgroundColor]}>
        <Text style={globalStyles.CustomTitleFont}>Game starts in {this.state.count}</Text>
      </View>
    );
  }

  getStatus() {
    return this.state.count === 0 ? (
      <Text
        style={
          this.state.correct
            ? [globalStyles.CustomSMFont, styles.response, { color: '#34a832' }]
            : [globalStyles.CustomSMFont, styles.response, { color: 'red' }]
        }>
        {this.state.status}
      </Text>
    ) : null;
  }

  getFloatingButton() {
    return this.state.count === 0 ? (
      <FloatingButton
        extraStyles={styles.floatingButton}
        onPressed={() => {
          this.state.ended ? this.endGame() : this.startRound();
        }}>
        <Icon name="arrow-forward" size={28} color={'black'} />
        {this.state.ended ? <Text>End game</Text> : <Text>Next round</Text>}
      </FloatingButton>
    ) : null;
  }

  endGame() {
    this.props.navigation.navigate('End Game', {
      maxRounds: this.startGameManager.getMaxRounds(),
      guessed: this.startGameManager.getGuessed()
    });
  }
}
const styles = StyleSheet.create({
  content: {
    width: '100%',
    height: '100%',
    marginTop: 50,
    display: 'flex',
    justifyContent: 'flex-start'
  },
  badgeContent: {
    width: '40%',
    alignItems: 'center',
    textAlign: 'center'
  },
  baseContent: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    margin: 6
  },
  sectionContent: {
    height: '70%'
  },
  sectionFirstContent: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  sectionTitleContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15
  },

  floatingButton: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    bottom: 40
  },
  response: {
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 10
  }
});
