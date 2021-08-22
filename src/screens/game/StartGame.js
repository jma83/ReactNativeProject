import React from 'react';
import { StyleSheet, View, ImageBackground, ScrollView, FlatList } from 'react-native';
const charactersImg = require('@assets/imgs/characters.png');

export default class StartGame extends React.Component {
  constructor() {
    this.startGameManager = new StartGameManager();
    this.startTimeout = null;
    this.inGameTimeout = null;
    this.state = { options: [], round: 1 };
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

  activeInGameTimeout() {
    this.inGameTimeout = setTimeout(
      (function (self) {
        return function () {
          self.endRound();
        };
      })(this),
      this.startGameManager.getTimeInRound()
    );
  }
  
  async startRound() {
    await this.startGameManager.nextRound();
    const options = this.startGameManager.getOptions();
    this.setState({ options });
    this.startGameManager.activeInGameTimeout();
  }

  endRound() {
    clearInterval(this.startTimeout);
    clearInterval(this.inGameTimeout);
    this.startGameManager.endRound();
  }

  render() {
    return (
      <View style={styles.sectionContainer}>
        <ImageBackground source={charactersImg} resizeMode="cover" style={{ flex: 1, justifyContent: 'center' }}>
          <ScrollView>
            <View style={styles.sectionContent}>
            <FlatList
              data={this.state.items}
              renderItem={this.renderRow.bind(this)}
              keyExtractor={(item, index) => index}></FlatList>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }


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
