import ContentType from '@application/data/ContentType';
import { episodeManager, characterManager, locationManager, imageManager } from '@application/container/AppManagers.js';
import { PageState } from '@components/pagination/Pagination';

export default class CategoryContentManager {
  constructor(contentType) {
    this.characterManager = characterManager;
    this.episodeManager = episodeManager;
    this.locationManager = locationManager;
    this.imageManager = imageManager;
    this.page = 1;
    this.contentType = contentType;
  }

  async getContent() {
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
    const pages = this.getCharacterPages();
    if (pages <= 0) {
      const info = await this.characterManager.getCharacterInfo();
      this.characterManager.setPages(info.pages);
    }
    const results = await this.characterManager.getCharacters(this.page);
    return results;
  }

  async getLocations() {
    const pages = this.getLocationPages();
    if (pages <= 0) {
      const info = await this.locationManager.getLocationInfo();
      this.locationManager.setPages(info.pages);
    }
    const results = await this.locationManager.getLocations(this.page);
    return results;
  }

  async getEpisodes() {
    const pages = this.getEpisodePages();
    if (pages <= 0) {
      const info = await this.episodeManager.getEpisodeInfo();
      this.episodeManager.setPages(info.pages);
    }
    const results = await this.episodeManager.getEpisodes(this.page);
    return results;
  }

  getPages() {
    switch (this.contentType) {
      case ContentType.CHARACTER:
        return this.getCharacterPages();
      case ContentType.LOCATION:
        return this.getLocationPages();
      case ContentType.EPISODE:
        return this.getEpisodePages();
    }
  }

  getEpisodePages() {
    return this.episodeManager.getPages();
  }

  getLocationPages() {
    return this.locationManager.getPages();
  }

  getCharacterPages() {
    return this.characterManager.getPages();
  }

  updatePage(pageState) {
    if (pageState === PageState.FIRST) {
      this.page = 1;
    } else if (pageState === PageState.PREVIOUS) {
      this.page--;
    } else if (pageState === PageState.NEXT) {
      this.page++;
    } else if (pageState === PageState.LAST) {
      this.page = this.getPages();
    }
  }
}
