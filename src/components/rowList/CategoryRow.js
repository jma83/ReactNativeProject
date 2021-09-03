import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text } from 'react-native';
import globalStyles from '@utils/GlobalStyles';
import LayoutRow from '@components/rowList/LayoutRow';

export default class CategoryRow extends Component {
  render() {
    return (
      <LayoutRow
        onPress={this.props.onPress}
        containerExtraStyles={styles.el_container}
        contentHeader={this.getContentHeader()}
      />
    );
  }

  getContentHeader = () => {
    return (
      <ImageBackground source={this.props.image} resizeMode="cover" style={styles.image}>
        <Text style={globalStyles.CategoryTitle}>{this.props.title}</Text>
      </ImageBackground>
    );
  };
}

const styles = StyleSheet.create({
  el_container: {
    borderWidth: 1,
    borderColor: 'black'
  },

  image: {
    flex: 1,
    padding: 60,
    resizeMode: 'stretch',
    justifyContent: 'center'
  }
});
