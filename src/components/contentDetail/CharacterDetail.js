import React, { Component } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import globalStyles from '@src/utils/GlobalStyles';
import { FlatList } from 'react-native-gesture-handler';
import ContentType from '@application/data/ContentType';
import ContentCardRow from '@components/contentDetail/elementCard/ContentCardRow';
import ContentRow from '@components/rowList/ContentRow';
import PrimaryImage from '@components/image/PrimaryImage';
import LayoutContentDetail from '@components/contentDetail/LayoutContentDetail';

export default class CharacterDetail extends Component {
  static unknown = 'Unknown';
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView>
        <View style={this.props.contentStyles.el_general}>
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
        <Text style={globalStyles.CustomMDFont}>Specie: {this.props.content.species || unknown}</Text>
      </View>
    );
  };

  getImageComponent = () => {
    return <PrimaryImage image={this.props.content.image || this.props.metaInfo.image} />;
  };

  getStatusComponent = () => {
    return (
      <View>
        <Text style={globalStyles.DefaultTextFont}>Gender: {this.props.content.gender || unknown}</Text>
        <Text style={globalStyles.DefaultTextFont}>Status: {this.props.content.status || unknown}</Text>
        <Text style={globalStyles.DefaultTextFont}>Type: {this.props.content.type || 'N/A'}</Text>
      </View>
    );
  };

  getFooterComponent = () => {
    return (
      <View>
        {this.getLocation()}
        {this.getOrigin()}
        <View style={{ marginTop: 30 }}>
          <Text style={globalStyles.CustomMDFont}>Episodes where appears:</Text>
        </View>
      </View>
    );
  };

  getLocation = () => {
    return (
      <View style={{ marginTop: 26 }}>
        <Text style={globalStyles.CustomMDFont}>Location:</Text>
        <ContentCardRow
          title={this.props.content.location.name || unknown}
          onPress={this.props.onLoadLocation.bind(this, this.props.content.location.url)}
        />
      </View>
    );
  };

  getOrigin = () => {
    return (
      <View style={{ marginTop: 26 }}>
        <Text style={globalStyles.CustomMDFont}>Origin:</Text>
        <ContentCardRow
          title={this.props.content.origin.name || unknown}
          onPress={this.props.onLoadLocation.bind(this, this.props.content.origin.url)}
        />
      </View>
    );
  };

  renderRow = rowInfo => {
    const item = rowInfo.item;
    return (
      <ContentRow
        title={item.name}
        subtitle={item.episode}
        imageURI={item.image}
        footer={`Release: ${item.air_date}`}
        onPress={this.onContentPressed.bind(this, item)}
      />
    );
  };

  onContentPressed(data) {
    this.props.onContentPressed({ content: data, contentType: ContentType.EPISODE });
  }
}
