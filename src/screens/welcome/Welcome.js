import React from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';

const Welcome = () => {
  const pepe = false;
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}> Benvenuti! </Text>
      <Button title="holi" onClick={() => receivedChildValue(pepe)} />
    </View>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600'
  }
});

export default Welcome;
