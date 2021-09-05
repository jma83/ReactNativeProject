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

  async getImageByTitle(title = '', width = '400', height = '315') {
    const uri =
      this.URL +
      this.getQueryParam('titles', title, true) +
      this.getQueryParam('width', width, false) +
      this.getQueryParam('height', height, false);

    return await this.get(uri);
  }
}
