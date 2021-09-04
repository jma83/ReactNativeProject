import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import globalStyles from '@src/utils/GlobalStyles';
import PrimaryImage from '@components/image/PrimaryImage';

export default class ImageCharacterRow extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress} underlayColor="lightgray">
        <View style={[styles.el_container, globalStyles.PrimaryBackgroundColor]}>
          <PrimaryImage imageStyles={styles.image} mode="stretch" image={this.props.imageURI} />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  el_container: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1
  },

  image: {
    width: 164,
    height: 150
  }
});
