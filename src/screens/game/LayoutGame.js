import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
const charactersImg = require('@assets/imgs/characters.png');

export default function LayoutGame(props) {
  return (
    <View style={styles.sectionContainer}>
      <ImageBackground source={charactersImg} resizeMode="cover" style={{ flex: 1, justifyContent: 'center' }}>
        {props.children}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1
  }
});
