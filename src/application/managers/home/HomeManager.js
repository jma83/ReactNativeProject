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
    const size = 3; //ContentType.size;
    const contentType = this.generateRandom(0, size);

    console.log('size', size);
    console.log('content', contentType);

    switch (contentType) {
      case ContentType.CHARACTER:
        return await this.getCharacters();
      case ContentType.LOCATION:
        return await this.getLocations();
      case ContentType.EPISODE:
        return await this.getEpisodes();
    }
  }

  async getCharacters() {
    if (this.characterManager.getPages() < 0) {
      const info = await this.characterManager.getCharacterInfo();
      this.characterManager.setPages(info.pages);
    }
    const page = this.generateRandom(0, this.characterManager.getPages());
    const results = await this.characterManager.getCharacters(page, this.limit, this.random);
    return this.filterResults(results);
  }

  async getLocations() {
    if (this.locationManager.getPages() < 0) {
      const info = await this.locationManager.getLocationInfo();
      this.locationManager.setPages(info.pages);
    }
    const page = this.generateRandom(0, this.locationManager.getPages());
    const results = await this.locationManager.getLocations(page, this.limit, this.random);
    return this.filterResults(results);
  }

  async getEpisodes() {
    if (this.episodeManager.getPages() < 0) {
      const info = await this.episodeManager.getEpisodeInfo();
      this.episodeManager.setPages(info.pages);
    }
    const page = this.generateRandom(0, this.episodeManager.getPages());
    const results = await this.episodeManager.getEpisodes(page, this.limit, this.random);
    return this.filterResults(results);
  }

  filterResults(results = []) {
    const initIndex = this.calcRandomInitIndex(results.length - this.limit, this.random);
    if (this.limit <= 0) {
      return results;
    }
    console.log('randomLimit', initIndex, this.limit + initIndex);
    return results.slice(initIndex, this.limit + initIndex);
  }

  calcRandomInitIndex(size = 0, random = false) {
    if (random === false) {
      return 0;
    }
    return this.generateRandom(0, size);
  }

  generateRandom(min = 0, max = 0) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
