import ApiClient from '@application/model/api/ApiClient.js';

export default class ApiClientMetaInfo extends ApiClient {
  constructor(url = 'https://rickandmorty.fandom.com/api/v1/Articles/Details') {
    super(url);
  }

  async getMetaInfoByTitle(title = '') {
    const uri = this.URL + this.getQueryParam('titles', title, true);
    return await this.get(uri);
  }

  async getMetaInfoById(id = '') {
    const uri = this.URL + this.getQueryParam('ids', id, true);
    return await this.get(uri);
  }
}
