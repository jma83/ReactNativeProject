import ApiClient from '@application/api/ApiClient.js';

export default class ApiClientImage extends ApiClient {
  constructor(url = 'https://rickandmorty.fandom.com/api/v1/Articles/Details') {
    super(url);
  }

  async getImageByTitle(title = '', width = '400', height = '315') {
    const uri =
      this.URL +
      this.getQueryParam('titles', title, true) +
      this.getQueryParam('width', width, false) +
      this.getQueryParam('height', height, false);
    console.log('uri img', uri);
    return await this.get(uri);
  }
}
