import ContentType from '@application/data/ContentType';
import EpisodeManager from '@application/managers/generic/EpisodeManager';
import CharacterManager from '@application/managers/generic/CharacterManager';
import LocationManager from '@application/managers/generic/LocationManager';
import ImageManager from '@application/managers/generic/ImageManager';
import { PageState } from '@components/pagination/Pagination';
import UserManager from '@application/managers/generic/entities/UserManager.js';
import ContentManager from '@application/managers/generic/entities/ContentManager';

export default class FavoriteContentManager {
  constructor(contentType) {
    this.characterManager = new CharacterManager();
    this.episodeManager = new EpisodeManager();
    this.locationManager = new LocationManager();
    this.imageManager = new ImageManager();
    this.userManager = new UserManager();
    this.contentManager = new ContentManager();
    this.currentUser = null;
    this.page = 1;
    this.totalPages = 0;
    this.maxPerPage = 20;
    this.content = [];
    this.contentType = contentType;
  }

  async getCurrentContent() {
    if (!this.currentUser) this.currentUser = await this.userManager.getCurrentUserProfile();
    this.content = await this.contentManager.getContentByUserAndType(this.currentUser.id, this.contentType);
    return await this.getContentInfo();
  }

  async getContentInfo() {
    switch (this.contentType) {
      case ContentType.CHARACTER:
        return { result: await this.getCharacters(), currentPage: this.page };
      case ContentType.LOCATION:
        let locations = await this.getLocations();
        return { result: locations.map(obj => ({ ...obj, image: '' })), currentPage: this.page };
      case ContentType.EPISODE:
        let episodes = await this.getEpisodes();
        return { result: episodes, currentPage: this.page };
    }
  }

  async getImages(data = []) {
    return data.map(async element => {
      return await this.imageManager.getImage(element.name).then(async result => {
        const elem = Object.keys(result.items)[0];
        if (elem == null) return '';
        const image = result.items[elem].thumbnail || '';
        return await image;
      });
    });
  }

  async getCharacters() {
    const ids = this.getPaginationContent();
    if (ids == null || ids.length <= 0) {
      return [];
    }
    const results = await this.characterManager.getCharactersByIds(ids);

    return results;
  }

  async getLocations() {
    const ids = this.getPaginationContent();
    if (ids == null || ids.length <= 0) {
      return [];
    }
    const results = await this.locationManager.getLocationsByIds(ids);

    return results;
  }

  async getEpisodes() {
    const ids = this.getPaginationContent();
    if (ids == null || ids.length <= 0) {
      return [];
    }
    const results = await this.episodeManager.getEpisodesByIds(ids);

    return results;
  }

  getPaginationContent() {
    this.calcTotalPages();
    const iniIndex = this.maxPerPage * (this.page - 1);
    const endIndex =
      iniIndex + this.maxPerPage > this.content.length ? this.content.length : this.maxPerPage + iniIndex;
    const filteredContent = this.content.slice(iniIndex, endIndex);
    return filteredContent.map(c => c.apiId);
  }

  calcTotalPages() {
    if (this.totalPages <= 0) {
      const result = Math.floor(this.content.length / this.maxPerPage);
      this.totalPages = this.content.length % this.maxPerPage != 0 ? result + 1 : result;
    }
  }

  updatePage(pageState) {
    if (pageState === PageState.FIRST) {
      this.page = 1;
    } else if (pageState === PageState.PREVIOUS) {
      this.page--;
    } else if (pageState === PageState.NEXT) {
      this.page++;
    } else if (pageState === PageState.LAST) {
      this.page = this.totalPages;
    }
  }

  getCurrentPage() {
    return this.page;
  }

  getPages() {
    return this.totalPages;
  }
}
