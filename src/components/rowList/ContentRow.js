import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
const defaultIcon = require('@assets/imgs/icon.jpg');
import globalStyles from '@src/utils/GlobalStyles';

export default class ContentRow extends Component {
  render() {
    return (
      <TouchableHighlight underlayColor="lightgray">
        <View style={styles.el_container}>
          <Image style={styles.image} resizeMode="contain" source={this.getImage()} />
          <View style={styles.el_content}>
            <View style={styles.el_header}>
              <Text style={globalStyles.CustomTitleSMFont}>{this.props.title}</Text>
              <Text style={globalStyles.CustomSMFont}>{this.props.subtitle}</Text>
            </View>
            <View style={styles.el_footer}>
              <Text style={globalStyles.DefaultTextFont}>{this.props.footer}</Text>
            </View>
          </View>
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
    overflow: 'hidden'
  },

  el_content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
    padding: 10
  },

  el_header: {
    maxWidth: 200
  },

  el_footer: {
    display: 'flex',
    flexDirection: 'row'
  },

  image: {
    width: 132,
    height: 105
  }
});
