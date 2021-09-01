import React from 'react';
import { View } from 'react-native';
import ContentType from '@application/data/ContentType';
import FavoriteContentManager from '@application/managers/profile/FavoriteContentManager';
import CategoryChildContent from '@components/category/CategoryChildContent';

export default class FavoriteContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], pages: 1, currentPage: 1 };
    this.favoriteContentManager = new FavoriteContentManager(this.props.route.params.contentType);
    this.loading = false;
    props.navigation.setOptions({
      title: props.route.params.contentName
    });
    this.listenerFocus = null;
  }

  reload() {
    this.loadContent();
  }

  componentDidMount() {
    this.listenerFocus = this.props.navigation.addListener('focus', () => {
      this.loadContent();
    });
  }

  componentWillUnmount() {
    this.listenerFocus();
  }

  loadContent = async () => {
    this.loading = true;
    const data = await this.favoriteContentManager.getCurrentContent();
    const pages = await this.favoriteContentManager.getPages();
    console.log('\n\n');
    this.setState({ items: data.result, pages, currentPage: data.currentPage });
    this.loading = false;
    if (data.result == null || data.length <= 0) {
      return;
    }
    if (this.props.route.params.contentType !== ContentType.CHARACTER) {
      this.loadImages(data.result).then(array => this.setState({ items: array }));
    }
  };

  loadImages = async (data = []) => {
    return this.favoriteContentManager.getImages(data).then(images => {
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
      <View>
        <CategoryChildContent
          items={this.state.items}
          contentType={this.props.route.params.contentType}
          pages={this.state.pages}
          currentPage={this.state.currentPage}
          onContentPressed={this.onContentPressed}
          onNavigatePage={this.navigatePage}
        />
      </View>
    );
  }

  onContentPressed = content => {
    this.props.navigation.navigate('ContentDetail', { content, contentType: this.props.route.params.contentType });
  };

  navigatePage = async pageState => {
    await this.favoriteContentManager.updatePage(pageState);
    await this.loadContent();
  };
}
