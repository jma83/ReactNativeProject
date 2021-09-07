import ContentType from '@application/data/ContentType';
import { episodeManager, characterManager, locationManager, imageManager } from '@application/container/AppManagers.js';

export default class HomeManager {
  constructor(limit = 10, random = true) {
    this.characterManager = characterManager;
    this.episodeManager = episodeManager;
    this.locationManager = locationManager;
    this.imageManager = imageManager;
    this.limit = limit;
    this.random = random;
  }

  async getRandomContent() {
    const size = Object.keys(ContentType).length;
    const contentType = this.generateRandom(0, size);

    switch (contentType) {
      case ContentType.CHARACTER:
        return { result: await this.getCharacters(), contentType };
      case ContentType.LOCATION:
        let locations = await this.getLocations();
        return { result: locations.map(obj => ({ ...obj, image: '' })), contentType };
      case ContentType.EPISODE:
        let episodes = await this.getEpisodes();
        return { result: episodes, contentType };
    }
  }

  async getImages(data = []) {
    const pepe = data.map(async element => {
      const result = await this.imageManager.getImage(element.name);
      const elem = Object.keys(result.items)[0];
      if (elem == null) {
        return '';
      }
      let image = '';
      image = await result.items[elem].thumbnail;
      return image;
    });
    return pepe;
  }

  async getCharacters() {
    const pages = this.characterManager.getPages();
    if (pages <= 0) {
      const info = await this.characterManager.getCharacterInfo();
      this.characterManager.setPages(info.pages);
    }
    const page = this.generateRandom(0, this.characterManager.getPages());
    const results = await this.characterManager.getCharacters(page);
    return this.filterResults(results);
  }

  async getLocations() {
    const pages = this.locationManager.getPages();
    if (pages <= 0) {
      const info = await this.locationManager.getLocationInfo();
      this.locationManager.setPages(info.pages);
    }
    const page = this.generateRandom(0, pages);
    const results = await this.locationManager.getLocations(page);
    return this.filterResults(results);
  }

  async getEpisodes() {
    const pages = this.episodeManager.getPages();
    if (pages <= 0) {
      const info = await this.episodeManager.getEpisodeInfo();
      this.episodeManager.setPages(info.pages);
    }
    const page = this.generateRandom(0, pages);
    const results = await this.episodeManager.getEpisodes(page);
    return this.filterResults(results);
  }

  filterResults(results = []) {
    if (this.limit <= 0) {
      return results;
    }
    const initIndex = this.random === true ? this.generateRandom(0, results.length - this.limit) : 0;
    return results.slice(initIndex, this.limit + initIndex);
  }

  generateRandom(min = 0, max = 0) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
