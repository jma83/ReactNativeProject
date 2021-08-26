import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import globalStyles from '@utils/GlobalStyles';

export default class CategoryRow extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress} underlayColor="lightgray">
        <View>
          <View style={styles.el_container}>
            <View style={styles.el_content}>
              <Image source={this.props.image} style={styles.image} />
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={globalStyles.CustomMDFont}>{this.props.name}</Text>
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
    backgroundColor: '#4c5775',
    borderRadius: 100,
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
    borderColor: 'black',
    width: 150,
    height: 150,
    margin: 20
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
    width: '100%',
    height: '100%'
  }
});
