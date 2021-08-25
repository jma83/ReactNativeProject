import ApiClient from '@application/api/ApiClient.js';

export default class ApiClientCharacter extends ApiClient {
  constructor() {
    super();
  }

  async getCharacters(page = 0) {
    let query = this.getCharacterURI() + this.getQueryParam('page', page, true);
    // console.log('getCharacters', query);
    return await this.get(query);
  }

  async getCharacter(id = 0) {
    let query = this.getCharacterURI() + `/${id}`;
    return await this.get(query);
  }

  async getCharactersByIds(id = []) {
    if (id.length <= 0) {
      return null;
    }
    let query = this.getCharacterURI() + `/${id}`;
    const result = await this.get(query);
    if (result.length > 1) {
      return result;
    }
    return [result];
  }

  getCharacterURI() {
    return `${this.URL}/character`;
  }
}
