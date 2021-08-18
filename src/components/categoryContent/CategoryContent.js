import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import CategoryContentManager from '@application/managers/categoryContent/CategoryContentManager';
import ContentType from '@application/data/ContentType';
import CharacterRow from '@components/rowList/CharacterRow';
import ContentRow from '@components/rowList/ContentRow';
import Pagination from '@components/pagination/Pagination';

export default class CategoryContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], pages: 1, currentPage: 1 };
    this.categoryContentManager = new CategoryContentManager(this.props.route.params.contentType);
    this.loading = false;
    props.navigation.setOptions({
      title: props.route.params.contentName
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
    const data = await this.categoryContentManager.getContent();
    const pages = await this.categoryContentManager.getPages();
    console.log('\n\n');
    this.setState({ items: data.result, pages, currentPage: data.currentPage });
    this.loading = false;
    if (this.props.route.params.contentType !== ContentType.CHARACTER) {
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
          <View style={styles.sectionList}>
            <FlatList
              ListFooterComponent={this.getPages()}
              data={this.state.items}
              renderItem={this.renderRow.bind(this)}
              keyExtractor={(item, index) => index}></FlatList>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  onContentPressed(content) {
    this.props.navigation.navigate('ContentDetail', { content, contentType: this.props.route.params.contentType });
  }

  getPages() {
    const current = this.state.currentPage; //this.state.pages
    const totalPages = this.state.pages;
    let array = [];
    const disabledFirst = current === 1;
    const disabledLast = current === totalPages;

    array = [...array, 'First', 'Previous'];
    array = [...array, String(current)];
    array = [...array, 'Next', 'Last'];

    return (
      <Pagination
        style={styles.footer}
        pages={array}
        currentPage={current}
        disabledFirst={disabledFirst}
        disabledLast={disabledLast}
        onPressPage={this.navigatePage}
      />
    );
  }

  navigatePage = async pageState => {
    await this.categoryContentManager.updatePage(pageState);
    await this.loadContent();
  };

  renderRow = rowInfo => {
    const item = rowInfo.item;
    if (this.props.route.params.contentType === ContentType.CHARACTER) {
      return (
        <CharacterRow
          title={item.name}
          subtitle={item.species}
          imageURI={item.image}
          footer={`Status: ${item.status}`}
          onPress={this.onContentPressed.bind(this, item)}
        />
      );
    } else if (this.props.route.params.contentType === ContentType.EPISODE) {
      return (
        <ContentRow
          title={item.name}
          subtitle={item.episode}
          imageURI={item.image}
          footer={`Release: ${item.air_date}`}
          onPress={this.onContentPressed.bind(this, item)}
        />
      );
    } else if (this.props.route.params.contentType === ContentType.LOCATION) {
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
  footer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
});
