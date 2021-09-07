import ContentAPIManager from '@application/managers/generic/ContentAPIManager.js';

export default class CharacterManager extends ContentAPIManager {
  constructor(apiClientCharacter) {
    super();
    this.apiClientCharacter = apiClientCharacter;
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
        return data.info;
      })
      .catch(e => Promise.reject(e));
  }
}
