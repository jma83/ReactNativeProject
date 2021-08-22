import React, { Component } from 'react';
import { Image, StyleSheet, TouchableHighlight, View } from 'react-native';
const defaultIcon = require('@assets/imgs/icon.jpg');

export default class ImageCharacterRow extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress} underlayColor="lightgray">
        <View style={styles.el_container}>
          <Image style={styles.image} resizeMode="contain" source={this.getImage()} />
        </View>
      </TouchableHighlight>
    );
  }

  getImage = () => {
    if (this.props.imageURI == null || this.props.imageURI.length <= 0) {
      return defaultIcon;
    }
    return { uri: this.props.imageURI };
  };
}

const styles = StyleSheet.create({
  el_container: {
    display: 'flex',
    flexDirection: 'row',
    margin: 8,
    backgroundColor: '#4c5775',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
    overflow: 'hidden',
    width: '100%'
  },

  image: {
    width: 132,
    height: 105
  }
});
