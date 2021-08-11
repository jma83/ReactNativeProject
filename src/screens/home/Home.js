import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import HomeManager from '@application/managers/home/HomeManager';
import ContentType from '@application/data/ContentType';
import CharacterRow from '@components/rowList/CharacterRow';
import ContentRow from '@components/rowList/ContentRow';

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
    const data = await this.homeManager.getRandomContent();
    console.log('\n\n');
    this.setState({ items: data.result, contentType: data.contentType });
    this.loading = false;
    if (data.contentType !== ContentType.CHARACTER) {
      await this.loadImages(data.result);
    }
  };

  loadImages = async (data = []) => {
    this.homeManager.getImages(data).then(images => {
      let array = [...this.state.items];
      array.forEach(async (item, index) => {
        item.image = await images[index];
        return item;
      });
      this.setState({ items: array });
    });
  };
  render() {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}> Suggested {this.contentTypeText()} </Text>
        <View style={styles.sectionList}>
          <FlatList
            data={this.state.items}
            renderItem={this.renderRow.bind(this)}
            keyExtractor={(item, index) => index}></FlatList>
        </View>
      </View>
    );
  }

  onContentPressed(content) {
    this.props.navigation.navigate('ContentDetail', { content, contentType: this.state.contentType });
  }

  renderRow = rowInfo => {
    const item = rowInfo.item;
    if (this.state.contentType === ContentType.CHARACTER) {
      return (
        <CharacterRow
          title={item.name}
          subtitle={item.species}
          imageURI={item.image}
          footer={`Status: ${item.status}`}
          onPress={this.onContentPressed.bind(this, item)}
        />
      );
    } else if (this.state.contentType === ContentType.EPISODE) {
      return (
        <ContentRow
          title={item.name}
          subtitle={item.episode}
          imageURI={item.image}
          footer={`Release: ${item.air_date}`}
          onPress={this.onContentPressed.bind(this, item)}
        />
      );
    } else if (this.state.contentType === ContentType.LOCATION) {
      return (
        <ContentRow
          title={item.name}
          subtitle={item.type}
          imageURI={item.image}
          footer={item.dimension}
          onPress={this.onContentPressed.bind(this, item)}
        />
      );
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
