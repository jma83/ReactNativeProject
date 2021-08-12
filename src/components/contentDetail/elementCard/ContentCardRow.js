import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import globalStyles from '@src/utils/GlobalStyles';

export default class ContentCardRow extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress} underlayColor="lightgray">
        <View style={styles.el_container}>
          <View style={styles.el_content}>
            <Text style={(globalStyles.CustomTitleLGFont, { alignSelf: 'center' })}>{this.props.title}</Text>
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
    margin: 6,
    backgroundColor: '#ddd',
    borderRadius: 12,
    elevation: 24,
    width: '100%'
  },

  el_content: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    textAlign: 'center'
  }
});
