import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import HomeManager from '../../application/managers/home/HomeManager';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
    this.homeManager = new HomeManager();
    this.numberOfPages = 0;
    this.currentPage = 0;
    this.loading = false;
  }

  componentDidMount() {
    this.loadContent();
  }

  loadContent = async () => {
    this.homeManager.getRandomContent().then(items => {
      console.log('\n\n<br/>');

      console.log('Random!!!', items.length);
      this.setState({ items });
    });
  };

  render() {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}> Welcome! </Text>
        <View style={styles.sectionList}>
          <FlatList
            data={this.state.items}
            renderItem={this.renderRow.bind(this)}
            onEndReached={() => {
              this.loadContent();
            }}></FlatList>
        </View>
      </View>
    );
  }

  renderRow(rowInfo) {}
}
const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'auto'
  },
  sectionList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600'
  }
});
