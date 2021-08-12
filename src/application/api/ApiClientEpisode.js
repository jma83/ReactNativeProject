import ApiClient from '@application/api/ApiClient.js';

export default class ApiClientEpisode extends ApiClient {
  async getEpisodes(page) {
    let query = this.getEpisodeURI() + this.getQueryParam('page', page, true);
    console.log('getEpisodes', query);

    return await this.get(query);
  }

  async getEpisode(id) {
    let query = this.getEpisodeURI() + `/${id}`;
    return await this.get(query);
  }

  async getEpisodesByIds(id = []) {
    if (id.length <= 0) {
      return null;
    }
    let query = this.getEpisodeURI() + `/${id}`;
    const result = await this.get(query);
    if (result.length > 1) {
      return result;
    }
    return [result];
  }

  getEpisodeURI() {
    return `${this.URL}/episode`;
  }
}
