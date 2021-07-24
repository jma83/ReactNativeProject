import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';

const Game = () => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}> This is game! </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    display: 'flex',
    padding: 10,
    justifyContent: 'center'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600'
  }
});

export default Game;
