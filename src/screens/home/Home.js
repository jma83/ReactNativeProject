import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import HomeManager from '../../application/managers/home/HomeManager';
import ContentType from '../../application/data/ContentType';
import CharacterRow from '../../components/rowList/CharacterRow';
import EpisodeRow from '../../components/rowList/EpisodeRow';
import LocationRow from '../../components/rowList/LocationRow';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], contentType: ContentType.CHARACTER };
    this.homeManager = new HomeManager();
    this.loading = false;
  }

  componentDidMount() {
    this.loadContent();
  }

  loadContent = async () => {
    this.loading = true;
    this.homeManager.getRandomContent().then(data => {
      console.log('\n\n');
      this.setState({ items: data.result, contentType: data.contentType });
      this.loading = true;
    });
  };

  render() {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}> Welcome! </Text>
        <View style={styles.sectionList}>
          <FlatList
            data={this.state.items}
            renderItem={this.renderRow.bind(this)}
            onEndReached={() => {
              this.loadContent();
            }}></FlatList>
        </View>
      </View>
    );
  }

  renderRow = rowInfo => {
    const item = rowInfo.item;
    console.log('item', item.name, item.type, item.episode);

    if (this.state.contentType === ContentType.CHARACTER) {
      return <CharacterRow title={item.name} subtitle={item.species} imageURI="https://source.unsplash.com/random" />;
    } else if (this.state.contentType === ContentType.EPISODE) {
      return <EpisodeRow title={item.name} subtitle={item.episode} imageURI="https://source.unsplash.com/random" />;
    } else if (this.state.contentType === ContentType.LOCATION) {
      return <LocationRow title={item.name} subtitle={item.type} imageURI="https://source.unsplash.com/random" />;
    }
  };
}
const styles = StyleSheet.create({
  sectionContainer: {
    width: '100%',
    height: '100%'
  },
  sectionList: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'center'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600'
  }
});
