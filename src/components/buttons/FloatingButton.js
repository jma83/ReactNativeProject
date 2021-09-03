import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function FloatingButton(props) {
  return (
    <TouchableOpacity
      style={[styles.floatingButton, props.extraStyles]}
      activeOpacity={0.5}
      onPress={() => props.onPressed()}>
      {props.children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20,
    right: 20,
    zIndex: 50
  }
});
