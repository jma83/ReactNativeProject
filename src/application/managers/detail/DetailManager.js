import MetaInfoManager from '@application/managers/generic/MetaInfoManager';
import EpisodeManager from '@application/managers/generic/EpisodeManager';
import CharacterManager from '@application/managers/generic/CharacterManager';
import LocationManager from '@application/managers/generic/LocationManager';
import UserManager from '@application/managers/generic/entities/UserManager.js';
import ContentManager from '@application/managers/generic/entities/ContentManager.js';

export default class DetailManager {
  constructor() {
    this.metaInfoManager = new MetaInfoManager();
    this.episodeManager = new EpisodeManager();
    this.characterManager = new CharacterManager();
    this.locationManager = new LocationManager();

    this.userManager = new UserManager();
    this.contentManager = new ContentManager();
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
