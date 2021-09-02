import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import globalStyles from '@src/utils/GlobalStyles';
import { FlatList } from 'react-native-gesture-handler';
import ContentType from '@application/data/ContentType';
import ContentCardRow from '@components/contentDetail/elementCard/ContentCardRow';
import Icon from 'react-native-vector-icons/Ionicons';
import ContentRow from '@components/rowList/ContentRow';
import FloatingButton from '@components/buttons/FloatingButton';
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

  onLikePressed = () => {
    this.props.onLikePressed({ apiId: this.props.content.id, contentType: ContentType.CHARACTER });
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
