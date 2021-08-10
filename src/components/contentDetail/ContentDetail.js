import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import globalStyles from '@src/utils/GlobalStyles';
import DetailManager from '@application/managers/detail/DetailManager';

export default class ContentDetail extends Component {
  constructor(props) {
    super(props);
    console.log('props', props);
    params = props.route.params;
    this.state = { content: params.content, metaInfo: { url: '', abstract: '', image: '' } };

    this.detailManager = new DetailManager();
    props.navigation.setOptions({
      title: params.content.name
    });
    this.getMetaInfo();
  }

  getMetaInfo() {
    this.detailManager.getMetaInfoByTitle(this.state.content.name).then(async data => {
      console.log('detailmanager', data);
      const metaInfo = await data;
      console.log('detailmanager2', metaInfo);
      this.setState({ metaInfo });
    });
  }

  render() {
    return (
      <View style={styles.el_general}>
        <View style={styles.el_container}>
          <View style={styles.el_image_container}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={{ uri: this.state.content.image || this.state.metaInfo.image }}
            />
          </View>
          <View style={styles.el_content}>
            <View style={styles.el_header}>
              <Text style={globalStyles.CustomTitleFont}>{this.state.content.name}</Text>
              <Text style={globalStyles.CustomMDFont}>{this.state.content.species}</Text>
              <Text style={globalStyles.CustomSMFont}>{this.state.metaInfo.url}</Text>
              <Text style={globalStyles.CustomSMFont}>{this.state.metaInfo.abstract}</Text>
            </View>
            <View style={styles.el_status}>
              <Text style={globalStyles.DefaultTextFont}>{this.state.content.status}</Text>
            </View>
          </View>
        </View>
        <View style={styles.el_footer}>
          <Text style={globalStyles.DefaultTextFont}>{this.state.content.type}</Text>
          <Text style={globalStyles.DefaultTextFont}>{this.state.content.gender}</Text>
          <Text style={globalStyles.DefaultTextFont}>{this.state.content.episode}</Text>
          <Text style={globalStyles.DefaultTextFont}>{this.state.content.url}</Text>
        </View>
      </View>
    );
  }
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
    maxWidth: 200
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
