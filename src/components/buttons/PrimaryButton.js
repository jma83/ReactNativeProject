import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function PrimaryButton(props) {
  return (
    <TouchableOpacity style={[styles.button, props.color]} activeOpacity={0.5} onPress={() => props.onPressed()}>
      {props.children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '70%',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 20
  }
});
