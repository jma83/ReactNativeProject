import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

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
    console.log('props', props);
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
    console.log('page!', page, this.props.disabledFirst);

    if (
      (this.props.disabledFirst && (page.index === PageState.FIRST || page.index === PageState.PREVIOUS)) ||
      (this.props.disabledLast && (page.index === PageState.NEXT || page.index === PageState.LAST))
    ) {
      return <Text style={styles.disabledPage}>{page.item}</Text>;
    }

    if (page.index === 2) {
      return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
          <Text style={styles.activePage}>{page.item}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          this.props.onPressPage(page.index);
        }}>
        <Text style={styles.page}>{page.item}</Text>
      </TouchableOpacity>
    );
  };
}
const styles = StyleSheet.create({
  paginator: {
    flex: 1,
    alignItems: 'center'
  },
  page: {
    backgroundColor: '#4c5775',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#222',
    color: 'white',
    padding: 10,
    minWidth: 50,
    textAlign: 'center',
    margin: 2,
    marginBottom: 4
  },
  disabledPage: {
    backgroundColor: '#616161',
    opacity: 0.6,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#222',
    color: 'white',
    padding: 10,
    minWidth: 50,
    textAlign: 'center',
    margin: 2,
    marginBottom: 4
  },

  activePage: {
    backgroundColor: '#4f67a8',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#222',
    color: 'white',
    padding: 10,
    minWidth: 50,
    textAlign: 'center',
    margin: 2,
    marginBottom: 4
  }
});
