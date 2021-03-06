import React, { Component } from 'react';
import { Text, View, SafeAreaView, FlatList } from 'react-native';
import globalStyles from '@src/utils/GlobalStyles';
import CharacterRow from '@components/rowList/CharacterRow';
import ContentType from '@application/data/ContentType';
import PrimaryImage from '@components/image/PrimaryImage';
import LayoutContentDetail from '@components/contentDetail/layout/LayoutContentDetail';

export default class EpisodeDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView>
        <View style={[this.props.contentStyles.el_general, globalStyles.PrimaryBackgroundColor]}>
          <FlatList
            ListHeaderComponent={this.getMainDetail()}
            ListEmptyComponent={<Text style={this.props.contentStyles.el_footer}>No results!</Text>}
            data={this.props.contentList}
            renderItem={this.renderRow.bind(this)}
            keyExtractor={(item, index) => index}></FlatList>
          {this.props.floatingButton()}
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
    return (
      <PrimaryImage
        imageStyles={this.props.contentStyles.image}
        image={this.props.content.image || this.props.metaInfo.image}
      />
    );
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
}
