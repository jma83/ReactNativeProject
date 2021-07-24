import React from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}> Welcome! </Text>
      <Button
        title="Go to Profile Screen"
        onPress={() => navigation.navigate('Profile')} // We added an onPress event which would navigate to the About screen
      />
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

export default Home;
