import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import globalStyles from '../../utils/GlobalStyles';

export default class CategoryRow extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress} underlayColor="lightgray">
        <View style={styles.el_container}>
          <View style={styles.el_content}>
            <ImageBackground source={this.props.image} resizeMode="cover" style={styles.image}>
              <Text style={globalStyles.CategoryTitle}>{this.props.title}</Text>
            </ImageBackground>
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
    borderWidth: 1,
    borderColor: 'black'
  },

  el_content: {
    flex: 1
  },

  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0'
  },

  el_footer: {
    display: 'flex',
    flexDirection: 'row'
  },

  image: {
    flex: 1,
    padding: 60,
    resizeMode: 'stretch',
    justifyContent: 'center'
  }
});
