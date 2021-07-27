import ApiClient from '@application/api/ApiClient.js';

export default class ApiClientImage extends ApiClient {
  constructor(url = 'https://rickandmorty.fandom.com/api/v1/Articles/Details') {
    super(url);
  }

  async getImageByTitle(title = '') {
    const uri = this.URL + this.getQueryParam('titles', title, true);
    return await this.get(uri);
  }
}
