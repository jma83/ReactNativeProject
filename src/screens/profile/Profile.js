import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';

const Profile = () => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}> This is profile! </Text>
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
  },
  sectionDescription: {},
  highlight: {
    fontWeight: '700'
  }
});

export default Profile;
