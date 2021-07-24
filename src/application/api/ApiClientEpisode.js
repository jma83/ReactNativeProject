import ApiClient from './ApiClient';

export default class ApiClientCharacter extends ApiClient {
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
    let query = this.getEpisodeURI() + `/${id}`;
    return await this.get(query);
  }

  getEpisodeURI() {
    return `${this.URL}/episode`;
  }
}
