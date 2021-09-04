import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import globalStyles from '@src/utils/GlobalStyles';

export const PageState = {
  FIRST: 0,
  PREVIOUS: 1,
  CURRENT: 2,
  NEXT: 3,
  LAST: 4
};

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.paginator}>
        <FlatList
          horizontal={true}
          data={this.props.pages}
          renderItem={this.renderRow.bind(this)}
          keyExtractor={(item, index) => index}></FlatList>
      </View>
    );
  }

  renderRow = page => {
    if (
      (this.props.disabledFirst && (page.index === PageState.FIRST || page.index === PageState.PREVIOUS)) ||
      (this.props.disabledLast && (page.index === PageState.NEXT || page.index === PageState.LAST))
    ) {
      return <Text style={[styles.disabledPage, styles.element]}>{page.item}</Text>;
    }

    if (page.index === PageState.CURRENT) {
      return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
          <Text style={[styles.activePage, styles.element]}>{page.item}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          this.props.onPressPage(page.index);
        }}>
        <Text style={[styles.page, styles.element, globalStyles.PrimaryBackgroundColor]}>{page.item}</Text>
      </TouchableOpacity>
    );
  };
}
const styles = StyleSheet.create({
  paginator: {
    flex: 1,
    alignItems: 'center'
  },
  element: {
    borderWidth: 2,
    borderColor: '#222',
    color: 'white',
    padding: 10,
    minWidth: 50,
    textAlign: 'center',
    margin: 2,
    marginBottom: 4
  },
  page: {
    borderRadius: 8
  },
  disabledPage: {
    backgroundColor: '#616161',
    opacity: 0.6,
    borderRadius: 8
  },
  activePage: {
    backgroundColor: '#4f67a8',
    borderRadius: 12
  }
});
