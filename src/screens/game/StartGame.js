import React from 'react';
import { StyleSheet, View, ImageBackground, TouchableOpacity, FlatList, Text } from 'react-native';
import StartGameManager from '@application/managers/game/StartGameManager';
import ImageCharacterRow from '@components/rowList/ImageCharacterRow';
import globalStyles from '@src/utils/GlobalStyles';
import Icon from 'react-native-vector-icons/Ionicons';

const charactersImg = require('@assets/imgs/characters.png');

export default class StartGame extends React.Component {
  constructor(props) {
    super(props);
    this.startGameManager = new StartGameManager();
    this.startInterval = null;
    this.inGameInterval = null;
    this.focusSubscription = null;
    this.state = {
      options: [],
      round: 0,
      name: '',
      count: this.startGameManager.getTimeBetweenRounds(),
      status: '',
      answered: false,
      correct: false,
      ended: false
    };
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
  }

  reset = () => {
    this.startGameManager.init();
    this.setState({
      options: [],
      round: 0,
      name: '',
      count: this.startGameManager.getTimeBetweenRounds(),
      status: '',
      answered: false,
      correct: false,
      ended: false
    });
    this.activeStartInterval();
  };

  activeStartInterval() {
    this.startInterval = setInterval(
      (function (self) {
        return function () {
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
      (function (self) {
        return function () {
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
    return (
      <View style={styles.sectionContainer}>
        <ImageBackground source={charactersImg} resizeMode="cover" style={{ flex: 1, justifyContent: 'center' }}>
          {this.state.round > 0 ? this.getMainContent() : this.getStartingContent()}
        </ImageBackground>
      </View>
    );
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
        <View style={styles.timerContent}>
          <Text style={globalStyles.CustomSMFont}>Timer: {this.state.count} </Text>
        </View>
        <View style={styles.roundContent}>
          <Text style={globalStyles.CustomSMFont}>Round: {this.state.round} </Text>
        </View>
        <View style={styles.sectionContent}>
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
      <View style={styles.sectionFirstContent}>
        <Text style={globalStyles.CustomTitleFont}>Game starts in {this.state.count}</Text>
      </View>
    );
  }

  getStatus() {
    return this.state.count === 0 ? (
      <Text style={this.state.correct ? globalStyles.CustomSMFontGreen : globalStyles.CustomSMFontRed}>
        {this.state.status}
      </Text>
    ) : null;
  }

  getFloatingButton() {
    return this.state.count === 0 ? (
      <TouchableOpacity
        style={styles.floatingButton}
        activeOpacity={0.7}
        onPress={() => {
          this.state.ended ? this.endGame() : this.startRound();
        }}>
        <Icon name="arrow-forward" size={28} color={'black'} />
        {this.state.ended ? <Text>End game</Text> : <Text>Next round</Text>}
      </TouchableOpacity>
    ) : null;
  }

  endGame() {
    this.props.navigation.navigate('EndGame', {
      maxRounds: this.startGameManager.getMaxRounds(),
      guessed: this.startGameManager.getGuessed()
    });
  }
}
const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1
  },
  content: {
    width: '100%',
    height: '100%',
    marginTop: 50,
    display: 'flex',
    justifyContent: 'flex-start'
  },
  timerContent: {
    width: '40%',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    margin: 6,
    backgroundColor: 'red',
    alignItems: 'center',
    textAlign: 'center'
  },
  roundContent: {
    width: '40%',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    margin: 6,
    backgroundColor: 'blue',
    alignItems: 'center',
    textAlign: 'center'
  },
  sectionContent: {
    height: '70%',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    margin: 6,
    backgroundColor: '#4c5775'
  },
  sectionFirstContent: {
    height: '20%',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    margin: 6,
    backgroundColor: '#4c5775',
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
    padding: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 40,
    right: 20,
    zIndex: 50
  }
});
