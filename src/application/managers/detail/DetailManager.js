import MetaInfoManager from '@application/managers/generic/MetaInfoManager';
import EpisodeManager from '@application/managers/generic/EpisodeManager';
import CharacterManager from '@application/managers/generic/CharacterManager';

export default class DetailManager {
  constructor() {
    this.metaInfoManager = new MetaInfoManager();
    this.episodeManager = new EpisodeManager();
    this.characterManager = new CharacterManager();
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
    console.log('getEpisodesByIds res', result);
    return result;
  }

  async getCharactersByIds(ids = []) {
    const result = await this.characterManager.getCharactersByIds(ids);
    console.log('getCharactersByIds res', result);
    return result;
  }
}
