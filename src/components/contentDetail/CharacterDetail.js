import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, Linking } from 'react-native';
import globalStyles from '@src/utils/GlobalStyles';
const defaultIcon = require('@assets/imgs/icon.jpg');
import { FlatList } from 'react-native-gesture-handler';
import ContentType from '@application/data/ContentType';
import ContentCardRow from '@components/contentDetail/elementCard/ContentCardRow';

export default class CharacterDetail extends Component {
  static unknown = 'Unknown';
  constructor(props) {
    super(props);
    console.log('props', props);
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
              <Text style={globalStyles.CustomMDFont}>Specie: {this.props.content.species || unknown}</Text>
            </View>
            <View style={styles.el_status}>
              <Text style={globalStyles.DefaultTextFont}>Gender: {this.props.content.gender || unknown}</Text>
              <Text style={globalStyles.DefaultTextFont}>Status: {this.props.content.status || unknown}</Text>
              <Text style={globalStyles.DefaultTextFont}>Type: {this.props.content.type || 'N/A'}</Text>
            </View>
          </View>
        </View>
        <View style={styles.el_footer}>
          {this.getMetaDescription()}
          <Text style={globalStyles.CustomSMLinkFont} onPress={() => Linking.openURL(this.props.metaInfo.url)}>
            Continue reading...
          </Text>
          {this.getLocation()}
          {this.getOrigin()}
          {this.getEpisodes()}
        </View>
      </View>
    );
  }

  getMetaDescription = () => {
    return this.props.metaInfo.abstract ? (
      <View>
        <Text style={globalStyles.CustomMDFont}>Description:</Text>
        <Text style={globalStyles.DefaultTextFontWhite}>{this.props.metaInfo.abstract}</Text>
      </View>
    ) : (
      <Text style={globalStyles.CustomMDFont}>No description available</Text>
    );
  };

  getLocation = () => {
    return (
      <View style={{ marginTop: 26 }}>
        <Text style={globalStyles.CustomMDFont}>Location:</Text>
        <ContentCardRow
          title={this.props.content.location.name || unknown}
          onPress={this.onContentPressed.bind(this, {
            url: this.props.content.location.url,
            contentType: ContentType.LOCATION
          })}
        />
      </View>
    );
  };

  getOrigin = () => {
    return (
      <View style={{ marginTop: 26 }}>
        <Text style={globalStyles.CustomMDFont}>Origin:</Text>
        <ContentCardRow
          title={this.props.content.origin.name || unknown}
          onPress={this.onContentPressed.bind(this, {
            url: this.props.content.origin.url,
            contentType: ContentType.LOCATION
          })}
        />
      </View>
    );
  };

  getEpisodes = () => {
    return (
      <View style={{ marginTop: 30 }}>
        <Text style={globalStyles.CustomMDFont}>Episodes where appears:</Text>

        <View style={styles.sectionList}>
          <FlatList
            numColumns={2}
            data={this.props.content.episode}
            renderItem={this.renderRow.bind(this)}
            keyExtractor={(item, index) => index}></FlatList>
        </View>
      </View>
    );
  };

  getImage = () => {
    const imageURI = this.props.content.image || this.props.metaInfo.image;
    if (!imageURI) {
      return defaultIcon;
    }
    return { uri: imageURI };
  };

  renderRow = rowInfo => {
    const item = rowInfo.item;
    const result = item.match('[^/]*$');
    return (
      <ContentCardRow
        title={`Episode ${result}`}
        onPress={this.onContentPressed.bind(this, { url: item, contentType: ContentType.EPISODE })}
      />
    );
  };

  onContentPressed(data) {
    this.props.navigation.navigate('ContentDetail', { content: data.url, contentType: data.contentType });
  }
}

const styles = StyleSheet.create({
  el_general: {
    backgroundColor: '#4c5775',
    elevation: 24,
    height: '100%'
  },

  el_container: {
    display: 'flex',
    flexDirection: 'row',
    margin: 16
  },

  el_content: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
    padding: 10,
    justifyContent: 'space-around',
    maxWidth: 170
  },

  el_status: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 24,
    padding: 6
  },

  el_footer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 16
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
  },
  sectionList: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 6
  }
});
