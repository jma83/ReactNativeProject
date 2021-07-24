import ApiClient from './ApiClient';

export default class ApiClientCharacter extends ApiClient {
  constructor() {
    super();
  }

  async getCharacters(page = 0) {
    let query = this.getCharacterURI() + this.getQueryParam('page', page, true);
    console.log('getCharacters', query);
    return await this.get(query);
  }

  async getCharacter(id = 0) {
    let query = this.getCharacterURI() + `/${id}`;
    return await this.get(query);
  }

  async getCharactersByIds(id = []) {
    let query = this.getCharacterURI() + `/${id}`;
    return await this.get(query);
  }

  getCharacterURI() {
    return `${this.URL}/character`;
  }
}
