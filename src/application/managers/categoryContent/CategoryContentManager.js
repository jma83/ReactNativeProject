import ContentType from '@application/data/ContentType';
import EpisodeManager from '@application/managers/generic/EpisodeManager';
import CharacterManager from '@application/managers/generic/CharacterManager';
import LocationManager from '@application/managers/generic/LocationManager';
import ImageManager from '@application/managers/generic/ImageManager';

export default class CategoryContentManager {
  constructor(limit = 10) {
    this.characterManager = new CharacterManager();
    this.episodeManager = new EpisodeManager();
    this.locationManager = new LocationManager();
    this.imageManager = new ImageManager();
    this.limit = limit;
  }

  async getContent(contentType) {
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
    const pages = this.characterManager.getPages();
    if (pages <= 0) {
      const info = await this.characterManager.getCharacterInfo();
      this.characterManager.setPages(info.pages);
    }
    const page = this.generateRandom(0, this.characterManager.getPages());
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
}
