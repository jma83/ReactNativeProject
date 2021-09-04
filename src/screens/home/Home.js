import React from 'react';
import { Text, StyleSheet, View, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import HomeManager from '@application/managers/home/HomeManager';
import ContentType from '@application/data/ContentType';
import CharacterRow from '@components/rowList/CharacterRow';
import ContentRow from '@components/rowList/ContentRow';
import globalStyles from '@utils/GlobalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import AnimationView from '@components/animations/AnimationView';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], contentType: ContentType.CHARACTER };
    this.homeManager = new HomeManager();
    this.loading = false;
    props.navigation.setOptions({
      headerRight: () => <Icon name="refresh" size={25} color="black" onPress={() => this.reload()}></Icon>
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
    const data = await this.homeManager.getRandomContent();
    this.setState({ items: data.result, contentType: data.contentType });
    this.loading = false;
    if (data.contentType !== ContentType.CHARACTER) {
      this.loadImages(data.result).then(array => {
        this.setState({ items: array });
      });
    }
  };

  loadImages = async (data = []) => {
    const images = await this.homeManager.getImages(data);
    let array = [...this.state.items];
    array.forEach(async (item, index) => {
      item.image = await images[index];
    });
    return array;
  };

  render() {
    return (
      <SafeAreaView>
        <AnimationView styles={styles.sectionContainer} duration={500} scale={{ start: 2, end: 1 }}>
          <Text style={(globalStyles.CustomLGFont, { color: 'black', fontWeight: 'bold', paddingLeft: 10 })}>
            Suggested {this.contentTypeText()}
          </Text>
          <View style={styles.sectionList}>
            <FlatList
              data={this.state.items}
              renderItem={this.renderRow.bind(this)}
              keyExtractor={(item, index) => index}></FlatList>
          </View>
        </AnimationView>
      </SafeAreaView>
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
