import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default class EpisodeRow extends Component {
  render() {
    return (
      <TouchableHighlight underlayColor="lightgray">
        <View style={styles.el_container}>
          <Image style={styles.image} resizeMode="contain" source={{ uri: this.props.imageURI }} />
          <View style={styles.el_content}>
            <View style={styles.el_header}>
              <Text>{this.props.title}</Text>
              <Text>{this.props.subtitle}</Text>
            </View>
            <View style={styles.el_footer}>
              <Text>pepepe</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  el_container: {
    display: 'flex',
    flexDirection: 'row',
    margin: 8,
    padding: 10,
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
    marginLeft: 10
  },

  el_header: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },

  el_footer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'green'
  },
  image: {
    width: 150,
    height: 150
  }
});
