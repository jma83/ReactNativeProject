import {
  metaInfoManager,
  episodeManager,
  characterManager,
  locationManager,
  userManager,
  contentManager
} from '@application/container/AppManagers.js';

export default class DetailManager {
  constructor() {
    this.metaInfoManager = metaInfoManager;
    this.episodeManager = episodeManager;
    this.characterManager = characterManager;
    this.locationManager = locationManager;

    this.userManager = userManager;
    this.contentManager = contentManager;
    this.currentUser = null;
  }

  async getMetaInfoByTitle(title = '') {
    return await this.metaInfoManager.getMetaInfoByTitle(title).then(async result => {
      const basepath = result.basepath;
      const elem = Object.keys(result.items)[0];
      if (elem == null) return '';
      const url = await (basepath + result.items[elem].url || '');
      const image = await (result.items[elem].thumbnail || '');
      const abstract = await (result.items[elem].abstract || '');
      return { url, image, abstract };
    });
  }

  async getEpisodesByIds(ids = []) {
    const result = await this.episodeManager.getEpisodesByIds(ids);
    return result;
  }

  async getCharactersByIds(ids = []) {
    const result = await this.characterManager.getCharactersByIds(ids);
    return result;
  }

  async getLocationByURL(url = '') {
    const result = await this.locationManager.getLocationByURL(url);
    return result;
  }

  async checkLikedContent(contentId) {
    if (!this.currentUser) this.currentUser = await this.userManager.getCurrentUserProfile();
    return await this.contentManager.checkLiked(contentId, this.currentUser.id);
  }

  async managelikeContent(contentId, contentType, isLiked) {
    if (!this.currentUser) this.currentUser = await this.userManager.getCurrentUserProfile();
    if (isLiked) {
      return !(await this.contentManager.dislike(contentId, this.currentUser.id));
    } else {
      return await this.contentManager.like(contentId, contentType, this.currentUser.id);
    }
  }
}
