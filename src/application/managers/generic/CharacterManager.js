import ApiClientCharacter from '@application/api/ApiClientCharacter.js';
import ContentManager from '@application/managers/generic/ContentManager.js';

export default class CharacterManager extends ContentManager {
  constructor() {
    super();
    this.apiClientCharacter = new ApiClientCharacter();
  }

  async getCharacters(page = 0) {
    const data = await this.apiClientCharacter.getCharacters(page);
    return data.results;
  }

  async getCharactersByIds(ids = []) {
    const data = await this.apiClientCharacter.getCharactersByIds(ids);
    return data;
  }

  getCharacterInfo() {
    return this.apiClientCharacter
      .getCharacters(0)
      .then(data => {
        console.log('data', data.info);
        return data.info;
      })
      .catch(e => Promise.reject(e));
  }
}
