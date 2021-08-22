import React from 'react';
import { StyleSheet, View, ImageBackground, ScrollView, FlatList, Text } from 'react-native';
import StartGameManager from '@application/managers/game/StartGameManager';
import ImageCharacterRow from '@components/rowList/ImageCharacterRow';

const charactersImg = require('@assets/imgs/characters.png');

export default class StartGame extends React.Component {
  constructor(props) {
    super(props);
    this.startGameManager = new StartGameManager();
    this.startTimeout = null;
    this.inGameInterval = null;
    this.state = { options: [], round: 1, name: '', count: 0 };
  }

  componentDidMount() {
    this.activeStartTimeout();
  }

  activeStartTimeout() {
    this.startTimeout = setTimeout(
      (function (self) {
        return function () {
          self.startRound();
        };
      })(this),
      this.startGameManager.getTimeBetweenRounds()
    );
  }

  activeInGameInterval() {
    this.inGameInterval = setInterval(
      (function (self) {
        return function () {
          console.log('gola?');
          if (self.state.count <= 0) {
            self.endRound();
          } else {
            let count = self.state.count - 1;
            console.log('hola???', count);
            self.setState({ count });
          }
        };
      })(this),
      1000
    );
  }

  async startRound() {
    await this.startGameManager.nextRound();
    const options = this.startGameManager.getOptions();
    const name = this.startGameManager.getCorrectName();
    const count = this.startGameManager.getTimeInRound();
    this.setState({ options, name, count });
    this.activeInGameInterval();
  }

  endRound() {
    clearInterval(this.startTimeout);
    clearInterval(this.inGameInterval);
    this.startGameManager.endRound();
  }

  render() {
    return (
      <View style={styles.sectionContainer}>
        <ImageBackground source={charactersImg} resizeMode="cover" style={{ flex: 1, justifyContent: 'center' }}>
          <View style={styles.sectionContent}>
            <Text>Who is {this.state.name}?</Text>
            <Text>Timer: {this.state.count} </Text>
            <FlatList
              numColumns={2}
              data={this.state.options}
              renderItem={this.renderRow.bind(this)}
              keyExtractor={(item, index) => index}></FlatList>
          </View>
        </ImageBackground>
      </View>
    );
  }

  renderRow = item => {
    console.log('item', item.item);

    return <ImageCharacterRow imageURI={item.item.image} onPress={this.onContentPressed.bind(this, item.item)} />;
  };

  onContentPressed = item => {
    this.startGameManager.checkAnswer(item);
  };
}
const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1
  },
  sectionContent: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    padding: 20,
    margin: 10,
    marginTop: 80,
    backgroundColor: '#fff'
  },
  sectionTitleContainer: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionButtonsContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  floatingButton: {
    width: '70%',

    borderRadius: 10,
    backgroundColor: '#ee6e73',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 20
  },
  floatingButton2: {
    width: '70%',
    borderRadius: 10,
    backgroundColor: '#4c5775',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 20
  }
});
