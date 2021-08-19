import ContentType from '@application/data/ContentType';
import EpisodeManager from '@application/managers/generic/EpisodeManager';
import CharacterManager from '@application/managers/generic/CharacterManager';
import LocationManager from '@application/managers/generic/LocationManager';
import ImageManager from '@application/managers/generic/ImageManager';

export default class HomeManager {
  constructor(limit = 10, random = true) {
    this.characterManager = new CharacterManager();
    this.episodeManager = new EpisodeManager();
    this.locationManager = new LocationManager();
    this.imageManager = new ImageManager();
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
        console.log('chao pescaoooo');
        return '';
      }
      let image = '';
      image = await result.items[elem].thumbnail;
      console.log('image result=?=?', image);
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
    console.log('randomLimit', initIndex, this.limit + initIndex);
    return results.slice(initIndex, this.limit + initIndex);
  }

  generateRandom(min = 0, max = 0) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
