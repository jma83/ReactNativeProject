import React from 'react';
import { Text } from 'react-native';
import HomeManager from '@application/managers/home/HomeManager';
import ContentType from '@application/data/ContentType';
import globalStyles from '@utils/GlobalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import ContentList from '@components/contentList/ContentList';

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
      <ContentList
        items={this.state.items}
        contentType={this.state.contentType}
        onContentPressed={this.onContentPressed}
        extraStyles={{ height: '99%' }}>
        <Text style={[globalStyles.CustomMDFont, { color: 'black', fontWeight: 'bold', paddingLeft: 10 }]}>
          Suggested {this.contentTypeText()}
        </Text>
      </ContentList>
    );
  }

  onContentPressed = content => {
    this.props.navigation.navigate('ContentDetail', { content, contentType: this.state.contentType });
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
