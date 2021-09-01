import React from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ContentType from '@application/data/ContentType';
import CharacterRow from '@components/rowList/CharacterRow';
import ContentRow from '@components/rowList/ContentRow';
import Pagination from '@components/pagination/Pagination';
import globalStyles from '@src/utils/GlobalStyles';

export default class NewCategoryContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionList}>
            <FlatList
              ListFooterComponent={this.getPagination()}
              ListEmptyComponent={
                <Text
                  style={[
                    globalStyles.CustomMDFontBlack,
                    {
                      color: 'black',
                      textAlign: 'center'
                    }
                  ]}>
                  - No content yet! -
                </Text>
              }
              data={this.props.items}
              renderItem={this.renderRow.bind(this)}
              keyExtractor={(item, index) => index}></FlatList>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  onContentPressed(content) {
    this.props.onContentPressed(content);
  }

  getPagination() {
    if (this.props.items == null || this.props.items.length <= 0) {
      return null;
    }
    const current = this.props.currentPage;
    const totalPages = this.props.pages;
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
    this.props.onNavigatePage(pageState);
  };

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
