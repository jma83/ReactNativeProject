import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ImageBackground } from 'react-native';
import globalStyles from '@src/utils/GlobalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
const charactersImg = require('@assets/imgs/characters.png');

const Game = () => {
  return (
    <View style={styles.sectionContainer}>
      <ImageBackground source={charactersImg} resizeMode="cover" style={{ flex: 1, justifyContent: 'center' }}>
        <View style={styles.sectionContent}>
          <View style={styles.sectionTitleContainer}>
            <Text style={globalStyles.CustomLGTitleFontBlack}>Ready to guess Rick & Morty Characters?{'\n'}</Text>
            <Text style={globalStyles.CustomMDFontBlack}>
              Choose between 4 images, only one matches the correct character!
            </Text>
          </View>
          <View style={styles.sectionButtonsContainer}>
            <TouchableOpacity style={styles.floatingButton} activeOpacity={0.5} onPress={() => {}}>
              <Icon name="rocket" size={28} color={'white'} />
              <Text style={globalStyles.CustomMDFont}> Start game </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.floatingButton2} activeOpacity={0.5} onPress={() => {}}>
              <Icon name="stats-chart" size={28} color={'white'} />
              <Text style={globalStyles.CustomMDFont}> List scores </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  sectionContent: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    padding: 20,
    margin: 10,
    marginBottom: 70,
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

export default Game;
