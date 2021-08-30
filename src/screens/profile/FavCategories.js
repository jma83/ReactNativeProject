import React, { Component } from 'react';
import { Text, StyleSheet, View, SafeAreaView, FlatList } from 'react-native';
import CategoryRow from '@components/rowList/CategoryRow';
import ContentCategoryTypes from '@application/data/ContentCategoryTypes';

export default class FavCategories extends Component {
  constructor(props) {
    super(props);
    const categories = ContentCategoryTypes;
    this.state = { categories };
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionList}>
            <FlatList
              data={this.state.categories}
              renderItem={this.renderRow.bind(this)}
              keyExtractor={(item, index) => index}></FlatList>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  renderRow = rowInfo => {
    const item = rowInfo.item;
    return <CategoryRow title={item.name} image={item.image} onPress={this.onContentPressed.bind(this, item)} />;
  };

  onContentPressed(item) {
    this.props.navigation.navigate('FavoriteContent', { contentName: item.name, contentType: item.id });
  }
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
  }
});
