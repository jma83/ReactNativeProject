import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import HomeManager from '@application/managers/home/HomeManager';
import ContentType from '@application/data/ContentType';
import CharacterRow from '@components/rowList/CharacterRow';
import EpisodeRow from '@components/rowList/EpisodeRow';
import LocationRow from '@components/rowList/LocationRow';

const defaultIcon = require('@assets/imgs/icon.jpg');
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], contentType: ContentType.CHARACTER };
    this.homeManager = new HomeManager();
    this.loading = false;
  }

  reload() {
    this.loadContent();
  }

  componentDidMount() {
    this.loadContent();
  }

  loadContent = async () => {
    this.loading = true;
    this.homeManager.getRandomContent().then(async data => {
      console.log('\n\n');
      this.setState({ items: data.result, contentType: data.contentType });
      if (data.contentType !== ContentType.CHARACTER) {
        await this.homeManager.getImages(data.result);
      }
      this.loading = false;
    });
  };

  render() {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}> Suggested {this.contentTypeText()} </Text>
        <View style={styles.sectionList}>
          <FlatList data={this.state.items} renderItem={this.renderRow.bind(this)}></FlatList>
        </View>
      </View>
    );
  }

  renderRow = rowInfo => {
    const item = rowInfo.item;
    console.log('item', item.name, item.type, item.episode);

    if (this.state.contentType === ContentType.CHARACTER) {
      return <CharacterRow title={item.name} subtitle={item.species} imageURI={item.image} footer={item.status} />;
    } else if (this.state.contentType === ContentType.EPISODE) {
      return <EpisodeRow title={item.name} subtitle={item.episode} imageURI={defaultIcon} />;
    } else if (this.state.contentType === ContentType.LOCATION) {
      return <LocationRow title={item.name} subtitle={item.type} imageURI={defaultIcon} />;
    }
  };
  contentTypeText = () => {
    if (this.state.contentType === ContentType.CHARACTER) {
      return 'characters:';
    } else if (this.state.contentType === ContentType.EPISODE) {
      return 'episodes:';
    } else if (this.state.contentType === ContentType.LOCATION) {
      return 'locations:';
    }
  };
}
const styles = StyleSheet.create({
  sectionContainer: {
    width: '100%',
    height: '100%'
  },
  sectionList: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600'
  }
});
