import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';

const Categories = () => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}> This is categories! </Text>
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

export default Categories;
