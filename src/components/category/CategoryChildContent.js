import React from 'react';
import { StyleSheet } from 'react-native';
import Pagination from '@components/pagination/Pagination';
import ContentList from '@components/contentList/ContentList';

export default class CategoryChildContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ContentList
        pagination={this.getPagination()}
        items={this.props.items}
        contentType={this.props.contentType}
        onContentPressed={this.onContentPressed}
      />
    );
  }

  onContentPressed = content => {
    this.props.onContentPressed(content);
  };

  getPagination() {
    if (this.props.items == null || this.props.items.length <= 0) {
      return null;
    }
    const current = this.props.currentPage;
    let array = [];
    const disabledFirst = current === 1;
    const disabledLast = current === this.props.pages;

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
}
const styles = StyleSheet.create({
  footer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
});
