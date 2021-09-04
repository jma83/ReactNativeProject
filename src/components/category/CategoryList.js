import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import CategoryRow from '@components/rowList/CategoryRow';
import AnimationView from '@components/animations/AnimationView';

export default function CategoryList(props) {
  const renderRow = rowInfo => {
    const item = rowInfo.item;
    return (
      <CategoryRow
        title={item.name}
        image={item.image}
        onPress={props.onContentPressed.bind(this, { name: item.name, id: item.id })}
      />
    );
  };

  return (
    <View style={styles.sectionContainer}>
      <AnimationView style={styles.sectionList} opacity={true} duration={500} translateY={{ start: 150, end: 0 }}>
        <FlatList data={props.categories} renderItem={item => renderRow(item)} keyExtractor={(item, index) => index} />
      </AnimationView>
    </View>
  );
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
