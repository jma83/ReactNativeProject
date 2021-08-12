import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
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
      metaInfo: { url: '', abstract: '', image: '' },
      contentList: []
    };

    this.detailManager = new DetailManager();
    props.navigation.setOptions({
      title: params.content.name
    });
    this.getMetaInfo();
    this.getCurrentList();
  }

  render() {
    return <View>{this.getDetailType()}</View>;
  }

  getMetaInfo() {
    const result = this.state.content.name.match('(.*)+(.*\\()') || this.state.content.name;
    console.log('earth', result);
    this.detailManager.getMetaInfoByTitle(result).then(async data => {
      const metaInfo = await data;
      console.log('metaInfo', await data);
      this.setState({ metaInfo });
    });
  }

  async getCurrentList() {
    let elements = [];
    if (this.state.contentType === ContentType.CHARACTER) {
      elements = this.state.content.episode;
    } else if (this.state.contentType === ContentType.LOCATION) {
      elements = this.state.content.residents;
    } else if (this.state.contentType === ContentType.EPISODE) {
      elements = this.state.content.characters;
    }
    const ids = elements.map(el => el.match('[^/]*$'));

    if (this.state.contentType === ContentType.CHARACTER) {
      this.detailManager.getEpisodesByIds(ids).then(result => {
        this.setState({ contentList: result });
      });
    } else {
      this.detailManager.getCharactersByIds(ids).then(result => {
        this.setState({ contentList: result });
      });
    }
  }

  getDetailType() {
    if (this.state.contentType === ContentType.CHARACTER) {
      return (
        <CharacterDetail
          content={this.state.content}
          metaInfo={this.state.metaInfo}
          contentList={this.state.contentList}
        />
      );
    } else if (this.state.contentType === ContentType.LOCATION) {
      return (
        <LocationDetail
          content={this.state.content}
          metaInfo={this.state.metaInfo}
          contentList={this.state.contentList}
        />
      );
    } else if (this.state.contentType === ContentType.EPISODE) {
      return (
        <EpìsodeDetail
          content={this.state.content}
          metaInfo={this.state.metaInfo}
          contentList={this.state.contentList}
        />
      );
    }
  }
}
