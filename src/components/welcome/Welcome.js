import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const Welcome = () => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}> Welcome! </Text>
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
