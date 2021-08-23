import React, { Component } from 'react';
import { Image, StyleSheet, TouchableHighlight, View } from 'react-native';
const defaultIcon = require('@assets/imgs/icon.jpg');

export default class ImageCharacterRow extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress} underlayColor="lightgray">
        <View style={styles.el_container}>
          <Image style={styles.image} resizeMode="stretch" source={this.getImage()} />
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
    backgroundColor: '#4c5775',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1
  },

  image: {
    width: 164,
    height: 150
  }
});
