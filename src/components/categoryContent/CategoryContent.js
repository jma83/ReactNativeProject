import React from 'react';
import { Text, StyleSheet, View, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import CategoryContentManager from '@application/managers/categoryContent/CategoryContentManager';
import ContentType from '@application/data/ContentType';
import CharacterRow from '@components/rowList/CharacterRow';
import ContentRow from '@components/rowList/ContentRow';

export default class CategoryContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
    this.categoryContentManager = new CategoryContentManager();
    this.loading = false;
    props.navigation.setOptions({
      title: props.contentName
    });
  }

  reload() {
    this.loadContent();
  }

  componentDidMount() {
    this.loadContent();
  }

  loadContent = async () => {
    this.loading = true;
    const data = await this.categoryContentManager.getContent(this.props.contentType);
    console.log('\n\n');
    this.setState({ items: data.result, contentType: data.contentType });
    this.loading = false;
    if (data.contentType !== ContentType.CHARACTER) {
      this.loadImages(data.result).then(array => this.setState({ items: array }));
    }
  };

  loadImages = async (data = []) => {
    return this.categoryContentManager.getImages(data).then(images => {
      let array = [...this.state.items];
      array.forEach(async (item, index) => {
        item.image = await images[index];
        return item;
      });
      return array;
    });
  };

  render() {
    return (
      <SafeAreaView>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}> Suggested {this.contentTypeText()} </Text>
          <View style={styles.sectionList}>
            <FlatList
              data={this.state.items}
              renderItem={this.renderRow.bind(this)}
              keyExtractor={(item, index) => index}></FlatList>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  onContentPressed(content) {
    this.props.navigation.navigate('ContentDetail', { content, contentType: this.props.contentType });
  }

  renderRow = rowInfo => {
    const item = rowInfo.item;
    if (this.props.contentType === ContentType.CHARACTER) {
      return (
        <CharacterRow
          title={item.name}
          subtitle={item.species}
          imageURI={item.image}
          footer={`Status: ${item.status}`}
          onPress={this.onContentPressed.bind(this, item)}
        />
      );
    } else if (this.props.contentType === ContentType.EPISODE) {
      return (
        <ContentRow
          title={item.name}
          subtitle={item.episode}
          imageURI={item.image}
          footer={`Release: ${item.air_date}`}
          onPress={this.onContentPressed.bind(this, item)}
        />
      );
    } else if (this.props.contentType === ContentType.LOCATION) {
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
    if (this.props.contentType === ContentType.CHARACTER) {
      return 'characters:';
    } else if (this.props.contentType === ContentType.EPISODE) {
      return 'episodes:';
    } else if (this.props.contentType === ContentType.LOCATION) {
      return 'locations:';
    }
  };
}
const styles = StyleSheet.create({
  sectionContainer: {
    width: '100%',
    height: '98%'
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
