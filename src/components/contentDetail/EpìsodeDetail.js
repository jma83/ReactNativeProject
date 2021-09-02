import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import globalStyles from '@src/utils/GlobalStyles';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import CharacterRow from '@components/rowList/CharacterRow';
import ContentType from '@application/data/ContentType';
import FloatingButton from '@components/buttons/FloatingButton';
import PrimaryImage from '@components/image/PrimaryImage';
import LayoutContentDetail from '@components/contentDetail/LayoutContentDetail';

export default class EpisodeDetail extends Component {
  constructor(props) {
    super(props);
    this.unknown = 'unknown';
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.el_general}>
          <FlatList
            ListHeaderComponent={this.getMainDetail()}
            ListEmptyComponent={<Text style={styles.el_footer}>No results!</Text>}
            data={this.props.contentList}
            renderItem={this.renderRow.bind(this)}
            keyExtractor={(item, index) => index}></FlatList>
          {this.getFloatingButton()}
        </View>
      </SafeAreaView>
    );
  }
  getMainDetail = () => {
    return (
      <LayoutContentDetail
        image={this.getImageComponent()}
        header={this.getHeaderComponent()}
        status={this.getStatusComponent()}
        footer={this.getFooterComponent()}
        metaInfo={this.props.metaInfo}
      />
    );
  };

  getHeaderComponent = () => {
    return (
      <View>
        <Text style={globalStyles.CustomTitleFont}>{this.props.content.name}</Text>
        <Text style={globalStyles.CustomMDFont}>Episode code: {this.props.content.episode || 'N/A'}</Text>
      </View>
    );
  };

  getImageComponent = () => {
    return <PrimaryImage image={this.props.content.image || this.props.metaInfo.image} />;
  };

  getStatusComponent = () => {
    return <Text style={globalStyles.DefaultTextFont}>Air date: {this.props.content.air_date}</Text>;
  };

  getFooterComponent = () => {
    return (
      <View style={{ marginTop: 30 }}>
        <Text style={globalStyles.CustomMDFont}>Characters seen here:</Text>
      </View>
    );
  };

  renderRow = rowInfo => {
    const item = rowInfo.item;
    if (item == null) {
      return null;
    }
    return (
      <CharacterRow
        title={item.name}
        subtitle={item.species}
        imageURI={item.image}
        footer={`Status: ${item.status}`}
        onPress={this.onContentPressed.bind(this, item)}
      />
    );
  };

  onContentPressed(data) {
    this.props.onContentPressed({ content: data, contentType: ContentType.CHARACTER });
  }

  onLikePressed = () => {
    this.props.onLikePressed({ apiId: this.props.content.id, contentType: ContentType.EPISODE });
  };

  getFloatingButton() {
    return (
      <FloatingButton onPressed={this.onLikePressed}>
        {this.props.liked ? (
          <Icon name="star" size={29} color={'black'} />
        ) : (
          <Icon name="star-outline" size={28} color={'black'} />
        )}
      </FloatingButton>
    );
  }
}

const styles = StyleSheet.create({
  el_general: {
    display: 'flex',
    backgroundColor: '#4c5775',
    elevation: 24,
    height: '100%'
  },
  el_footer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 16,
    maxWidth: 350
  }
});
