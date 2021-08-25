import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import globalStyles from '@src/utils/GlobalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
const charactersImg = require('@assets/imgs/characters.png');

export default class EndGame extends React.Component {
  constructor(props) {
    super(props);
    console.log('props!', props);
  }

  render() {
    return (
      <View style={styles.sectionContainer}>
        <ImageBackground source={charactersImg} resizeMode="cover" style={{ flex: 1, justifyContent: 'center' }}>
          <ScrollView>
            <View style={styles.sectionContent}>
              <View style={styles.sectionTitleContainer}>
                <Text style={globalStyles.CustomLGTitleFontBlack}>{this.getMessage()}</Text>
                <Text style={globalStyles.CustomMDFontBlack}>
                  {`Result: ${this.props.route.params.guessed}/${this.props.route.params.maxRounds}`}
                </Text>
              </View>
              <View style={styles.sectionButtonsContainer}>
                <TouchableOpacity
                  style={styles.floatingButton}
                  activeOpacity={0.5}
                  onPress={() => this.onPlayPressed()}>
                  <Icon name="rocket" size={28} color={'white'} />
                  <Text style={globalStyles.CustomMDFont}> Play Again </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.floatingButton2}
                  activeOpacity={0.5}
                  onPress={() => this.onReturnPressed()}>
                  <Icon name="stats-chart" size={28} color={'white'} />
                  <Text style={globalStyles.CustomMDFont}> Go Back </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }

  onPlayPressed() {
    this.props.navigation.navigate('StartGame');
  }

  onReturnPressed() {
    this.props.navigation.navigate('Game');
  }

  getMessage() {
    const half = this.props.route.params.maxRounds / 2;
    if (half > this.props.route.params.guessed) {
      return 'I bet you can do better than that!';
    } else {
      return 'Well done!';
    }
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
