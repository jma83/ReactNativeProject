import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function FloatingButton(props) {
  return (
    <TouchableOpacity style={styles.floatingButton} activeOpacity={0.5} onPress={() => props.onPressed()}>
      {props.children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#ee6e73',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20,
    right: 20,
    zIndex: 50
  }
});
