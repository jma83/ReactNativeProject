import ApiClientCharacter from '../../api/ApiClientCharacter';
import ContentManager from './ContentManager';

export default class CharacterManager extends ContentManager {
  constructor() {
    super();
    this.apiClientCharacter = new ApiClientCharacter();
  }

  async getCharacters(page = 0) {
    const data = await this.apiClientCharacter.getCharacters(page);
    return data.results;
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
