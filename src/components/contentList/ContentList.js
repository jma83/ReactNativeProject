import React from 'react';
import { StyleSheet, FlatList, View, SafeAreaView, Text } from 'react-native';
import AnimationView from '@components/animations/AnimationView';
import ContentType from '@application/data/ContentType';
import CharacterRow from '@components/rowList/CharacterRow';
import ContentRow from '@components/rowList/ContentRow';
import globalStyles from '@utils/GlobalStyles';

export default function ContentList(props) {
  const renderRow = rowInfo => {
    const item = rowInfo.item;
    if (props.contentType === ContentType.CHARACTER) {
      return (
        <CharacterRow
          title={item.name}
          subtitle={item.species}
          imageURI={item.image}
          footer={`Status: ${item.status}`}
          onPress={props.onContentPressed.bind(this, item)}
        />
      );
    } else if (props.contentType === ContentType.EPISODE) {
      return (
        <ContentRow
          title={item.name}
          subtitle={item.episode}
          imageURI={item.image}
          footer={`Release: ${item.air_date}`}
          onPress={props.onContentPressed.bind(this, item)}
        />
      );
    } else if (props.contentType === ContentType.LOCATION) {
      return (
        <ContentRow
          title={item.name}
          subtitle={item.type}
          imageURI={item.image}
          footer={item.dimension}
          onPress={props.onContentPressed.bind(this, item)}
        />
      );
    }
  };

  return (
    <SafeAreaView>
      <AnimationView duration={500} scale={{ start: 2, end: 1 }}>
        <View style={[styles.sectionContainer, props.extraStyles]}>
          {props.children}
          <View style={styles.sectionList}>
            <FlatList
              ListFooterComponent={props.pagination}
              ListEmptyComponent={
                <Text style={[globalStyles.CustomMDFont, styles.textStyle]}>- No content yet! -</Text>
              }
              data={props.items}
              renderItem={renderRow.bind(this)}
              keyExtractor={(item, index) => index}
            />
          </View>
        </View>
      </AnimationView>
    </SafeAreaView>
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
  },
  textStyle: {
    color: 'black',
    padding: 2,
    textAlign: 'center'
  }
});
