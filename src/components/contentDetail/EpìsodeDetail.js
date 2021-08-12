import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, Linking, SafeAreaView, TouchableOpacity } from 'react-native';
import globalStyles from '@src/utils/GlobalStyles';
const defaultIcon = require('@assets/imgs/icon.jpg');
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import CharacterRow from '@components/rowList/CharacterRow';

export default class EpisodeDetail extends Component {
  constructor(props) {
    super(props);
    this.unknown = 'unknown';
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.el_general}>
          <FlatList
            ListHeaderComponent={this.getMainDetail()}
            ListEmptyComponent={<Text>No results!</Text>}
            data={this.props.contentList}
            renderItem={this.renderRow.bind(this)}
            keyExtractor={(item, index) => index}></FlatList>
          {this.getFloatingButton()}
        </View>
      </SafeAreaView>
    );
  }

  getMainDetail = () => {
    return (
      <View>
        <View style={styles.el_container}>
          <View style={styles.el_image_container}>
            <Image style={styles.image} resizeMode="contain" source={this.getImage()} />
          </View>
          <View style={styles.el_content}>
            <View style={styles.el_header}>
              <Text style={globalStyles.CustomTitleFont}>{this.props.content.name}</Text>
              <Text style={globalStyles.CustomMDFont}>Episode code: {this.props.content.episode || 'N/A'}</Text>
            </View>
            <View style={styles.el_status}>
              <Text style={globalStyles.DefaultTextFont}>Air date: {this.props.content.air_date}</Text>
            </View>
          </View>
        </View>
        <View style={styles.el_footer}>
          {this.getMetaDescription()}
          <View style={{ marginTop: 30 }}>
            <Text style={globalStyles.CustomMDFont}>Characters seen here:</Text>
          </View>
        </View>
      </View>
    );
  };

  getMetaDescription = () => {
    let description = this.props.metaInfo.abstract ? (
      <View>
        <Text style={globalStyles.CustomMDFont}>Description:</Text>
        <Text style={globalStyles.DefaultTextFontWhite}>{this.props.metaInfo.abstract}</Text>
      </View>
    ) : (
      <Text style={globalStyles.CustomMDFont}>No description available</Text>
    );
    if (this.props.metaInfo.url != null) {
      description = (
        <View>
          {description}
          <Text style={globalStyles.CustomSMLinkFont} onPress={() => Linking.openURL(this.props.metaInfo.url)}>
            Continue reading...
          </Text>
        </View>
      );
    }
    return description;
  };

  getDimensionText = () => {
    {
      return this.props.content.dimension == 'unknown' || this.props.content.dimension == null
        ? `Dimension: ${this.unknown}`
        : this.props.content.dimension;
    }
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
    if (item == null) {
      return null;
    }
    return (
      <CharacterRow
        title={item.name}
        subtitle={item.species}
        imageURI={item.image}
        footer={`Status: ${item.status}`}
        onPress={this.onContentPressed.bind(this, item)}
      />
    );
  };

  onContentPressed(data) {
    this.props.navigation.navigate('ContentDetail', { content: data.url, contentType: data.contentType });
  }

  getFloatingButton() {
    return (
      <TouchableOpacity style={styles.floatingButton} activeOpacity={0.5} onPress={() => {}}>
        <Icon name="star-outline" size={28} color={'black'} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  el_general: {
    display: 'flex',
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
    marginLeft: 16,
    maxWidth: 350
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
    marginTop: 6,
    marginLeft: 8
  },
  floatingButton: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#ee6e73',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20,
    right: 20,
    zIndex: 50
  },
  icon: {
    resizeMode: 'contain',
    width: 50,
    height: 50
  }
});
