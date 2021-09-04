import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import ContentCategoryTypes from '@application/data/ContentCategoryTypes';
import CategoryList from '@components/category/CategoryList';

export default class Categories extends Component {
  constructor(props) {
    super(props);
    const categories = ContentCategoryTypes;
    this.state = { categories };
  }

  render() {
    return (
      <SafeAreaView>
        <CategoryList categories={this.state.categories} onContentPressed={this.onContentPressed} />
      </SafeAreaView>
    );
  }

  onContentPressed = item => {
    this.props.navigation.navigate('CategoryContent', { contentName: item.name, contentType: item.id });
  };
}
