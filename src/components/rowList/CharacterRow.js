import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import globalStyles from '@src/utils/GlobalStyles';
import LayoutRow from '@components/rowList/layout/LayoutRow';
import PrimaryImage from '@components/image/PrimaryImage';

export default class CharacterRow extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <LayoutRow
        onPress={this.props.onPress}
        contentExtraStyles={styles.el_content}
        container={this.getContainerElements()}
        contentHeader={this.getHeaderElements()}
        contentFooter={this.getFooterElements()}
      />
    );
  }

  getContainerElements = () => {
    return <PrimaryImage imageStyles={styles.image} image={this.props.imageURI} />;
  };

  getHeaderElements = () => {
    return (
      <View style={styles.el_header}>
        <Text style={globalStyles.CustomTitleFont}>{this.props.title}</Text>
        <Text style={globalStyles.CustomMDFont}>{this.props.subtitle}</Text>
      </View>
    );
  };

  getFooterElements = () => {
    return (
      <View>
        <Text style={globalStyles.DefaultTextFont}>{this.props.footer}</Text>
      </View>
    );
  };
}
const styles = StyleSheet.create({
  el_content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
    padding: 10
  },

  el_header: {
    maxWidth: '90%'
  },

  image: {
    width: 150,
    height: 150
  }
});
