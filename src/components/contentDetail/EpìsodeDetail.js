import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import globalStyles from '@src/utils/GlobalStyles';
const defaultIcon = require('@assets/imgs/icon.jpg');

export default class EpìsodeDetail extends Component {
  constructor(props) {
    super(props);
    // console.log('props', props);
  }

  render() {
    return (
      <View style={styles.el_general}>
        <View style={styles.el_container}>
          <View style={styles.el_image_container}>
            <Image style={styles.image} resizeMode="contain" source={this.getImage()} />
          </View>
          <View style={styles.el_content}>
            <View style={styles.el_header}>
              <Text style={globalStyles.CustomTitleFont}>{this.props.content.name}</Text>
              <Text style={globalStyles.CustomMDFont}>{this.props.content.species}</Text>
              <Text style={globalStyles.DefaultTextFont}>{this.props.content.type}</Text>
              <Text style={globalStyles.DefaultTextFont}>{this.props.content.gender}</Text>
              <Text style={globalStyles.DefaultTextFont}>{this.props.content.episode}</Text>
              <Text style={globalStyles.DefaultTextFont}>{this.props.content.url}</Text>
            </View>
            <View style={styles.el_status}>
              <Text style={globalStyles.DefaultTextFont}>{this.props.content.status}</Text>
            </View>
          </View>
        </View>
        <View style={styles.el_footer}>
          <Text style={globalStyles.CustomSMFont}>{this.props.metaInfo.url}</Text>
          <Text style={globalStyles.CustomSMFont}>{this.props.metaInfo.abstract}</Text>
        </View>
      </View>
    );
  }

  getImage = () => {
    const imageURI = this.props.content.image || this.props.metaInfo.image;
    if (!imageURI) {
      return defaultIcon;
    }
    return { uri: imageURI };
  };
}

const styles = StyleSheet.create({
  el_general: {
    margin: 8,
    backgroundColor: '#4c5775',
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

  el_container: {
    display: 'flex',
    flexDirection: 'row'
  },

  el_content: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
    padding: 10,
    justifyContent: 'space-between'
  },

  el_header: {
    maxWidth: 180
  },

  el_status: {
    display: 'flex',
    flexDirection: 'column'
  },

  el_footer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10
  },
  image: {
    width: '102%',
    height: '100%',
    borderRadius: 5,
    overflow: 'hidden'
  },
  el_image_container: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 200,
    width: '50%'
  }
});
