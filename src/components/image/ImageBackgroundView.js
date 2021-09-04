import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';

export default function ImageBackgroundView(props) {
  return (
    <View style={styles.sectionContainer}>
      <ImageBackground source={props.image} resizeMode="cover" style={{ flex: 1, justifyContent: 'center' }}>
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
