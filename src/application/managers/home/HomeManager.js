import ContentType from '../../data/ContentType';
import EpisodeManager from '../generic/EpisodeManager';
import CharacterManager from '../generic/CharacterManager';
import LocationManager from '../generic/LocationManager';

export default class HomeManager {
  constructor(limit = 10, random = true) {
    this.characterManager = new CharacterManager();
    this.episodeManager = new EpisodeManager();
    this.locationManager = new LocationManager();
    this.limit = limit;
    this.random = random;
  }

  async getRandomContent() {
    const size = Object.keys(ContentType).length;
    const contentType = this.generateRandom(0, size);

    console.log('size', size);
    console.log('content', contentType);

    switch (contentType) {
      case ContentType.CHARACTER:
        return { result: await this.getCharacters(), contentType };
      case ContentType.LOCATION:
        return { result: await this.getLocations(), contentType };
      case ContentType.EPISODE:
        return { result: await this.getEpisodes(), contentType };
    }
  }

  async getCharacters() {
    const pages = this.characterManager.getPages();
    if (pages < 0) {
      const info = await this.characterManager.getCharacterInfo();
      this.characterManager.setPages(info.pages);
    }
    const page = this.generateRandom(0, pages);
    const results = await this.characterManager.getCharacters(page, this.limit, this.random);
    return this.filterResults(results);
  }

  async getLocations() {
    const pages = this.locationManager.getPages();
    if (pages < 0) {
      const info = await this.locationManager.getLocationInfo();
      this.locationManager.setPages(info.pages);
    }
    const page = this.generateRandom(0, pages);
    const results = await this.locationManager.getLocations(page, this.limit, this.random);
    return this.filterResults(results);
  }

  async getEpisodes() {
    const pages = this.episodeManager.getPages();
    if (pages < 0) {
      const info = await this.episodeManager.getEpisodeInfo();
      this.episodeManager.setPages(info.pages);
    }
    const page = this.generateRandom(0, pages);
    const results = await this.episodeManager.getEpisodes(page, this.limit, this.random);
    return this.filterResults(results);
  }

  filterResults(results = []) {
    if (this.limit <= 0) {
      return results;
    }
    const initIndex = this.random === true ? this.generateRandom(0, results.length - this.limit) : 0;
    console.log('randomLimit', initIndex, this.limit + initIndex);
    return results.slice(initIndex, this.limit + initIndex);
  }

  generateRandom(min = 0, max = 0) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
