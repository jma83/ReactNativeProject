import React, { Component } from 'react';
import { View } from 'react-native';
import CharacterDetail from '@components/contentDetail/CharacterDetail';
import EpìsodeDetail from '@components/contentDetail/EpìsodeDetail';
import LocationDetail from '@components/contentDetail/LocationDetail';
import DetailManager from '@application/managers/detail/DetailManager';
import ContentType from '@application/data/ContentType';

export default class ContentDetail extends Component {
  constructor(props) {
    super(props);
    const params = props.route.params;

    this.state = {
      content: params.content,
      contentType: params.contentType,
      metaInfo: { url: '', abstract: '', image: '' }
    };

    this.detailManager = new DetailManager();
    props.navigation.setOptions({
      title: params.content.name
    });
    this.getMetaInfo();
  }

  render() {
    return <View>{this.getDetailType()}</View>;
  }

  getMetaInfo() {
    this.detailManager.getMetaInfoByTitle(this.state.content.name).then(async data => {
      const metaInfo = await data;
      this.setState({ metaInfo });
    });
  }

  getDetailType() {
    if (this.state.contentType === ContentType.CHARACTER) {
      return <CharacterDetail content={this.state.content} metaInfo={this.state.metaInfo} />;
    } else if (this.state.contentType === ContentType.EPISODE) {
      return <LocationDetail content={this.state.content} metaInfo={this.state.metaInfo} />;
    } else if (this.state.contentType === ContentType.LOCATION) {
      return <EpìsodeDetail content={this.state.content} metaInfo={this.state.metaInfo} />;
    }
  }
}
