import React, { Component } from 'react';
import { View } from 'react-native';
import CharacterDetail from '@components/contentDetail/CharacterDetail';
import EpìsodeDetail from '@components/contentDetail/EpìsodeDetail';
import LocationDetail from '@components/contentDetail/LocationDetail';
import DetailManager from '@application/managers/detail/DetailManager';
import ContentType from '@application/data/ContentType';
import { regexContentName, regexUrlContentId } from '@src/utils/Constants';

export default class ContentDetail extends Component {
  constructor(props) {
    super(props);
    const params = props.route.params;
    this.state = {
      content: params.content || '',
      contentType: params.contentType,
      metaInfo: { url: '', abstract: '', image: '' },
      contentList: [],
      liked: false
    };

    this.detailManager = new DetailManager();
    props.navigation.setOptions({
      title: params.content.name
    });
    this.getMetaInfo();
    this.getCurrentList();
    this.checkLikedContent();
  }

  render() {
    return <View>{this.getDetailType()}</View>;
  }

  checkLikedContent = async () => {
    const liked = await this.detailManager.checkLikedContent(this.state.content.id);
    this.setState({ liked });
  };

  getMetaInfo() {
    const result = this.state.content.name.match(regexContentName) || this.state.content.name;
    this.detailManager.getMetaInfoByTitle(result).then(async data => {
      const metaInfo = await data;
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
    const ids = elements.map(el => el.match(regexUrlContentId));

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
          liked={this.state.liked}
          contentList={this.state.contentList}
          onLikePressed={this.onLikePressed}
          onContentPressed={this.onContentPressed}
          onLoadLocation={this.loadLocation}
        />
      );
    } else if (this.state.contentType === ContentType.LOCATION) {
      return (
        <LocationDetail
          content={this.state.content}
          metaInfo={this.state.metaInfo}
          liked={this.state.liked}
          contentList={this.state.contentList}
          onLikePressed={this.onLikePressed}
          onContentPressed={this.onContentPressed}
        />
      );
    } else if (this.state.contentType === ContentType.EPISODE) {
      return (
        <EpìsodeDetail
          content={this.state.content}
          metaInfo={this.state.metaInfo}
          liked={this.state.liked}
          contentList={this.state.contentList}
          onLikePressed={this.onLikePressed}
          onContentPressed={this.onContentPressed}
        />
      );
    }
  }

  loadLocation = location => {
    if (!location) {
      return;
    }
    this.detailManager.getLocationByURL(location).then(result => {
      this.props.navigation.push('ContentDetail', { content: result, contentType: ContentType.LOCATION });
    });
  };

  onContentPressed = data => {
    if (!data) {
      return;
    }
    this.props.navigation.push('ContentDetail', { content: data.content, contentType: data.contentType });
  };

  onLikePressed = async data => {
    if (!data) {
      return;
    }
    const liked = await this.detailManager.managelikeContent(data.apiId, data.contentType, this.state.liked);
    this.setState({ liked });
  };
}
