import ApiClientEpisode from '../../api/ApiClientEpisode.js';
import ContentManager from './ContentManager';

export default class EpisodeManager extends ContentManager {
  constructor() {
    super();
    this.apiClientEpisode = new ApiClientEpisode();
  }

  async getEpisodes(page = 0) {
    const data = await this.apiClientEpisode.getEpisodes(page);
    return data.results;
  }

  getEpisodeInfo() {
    return this.apiClientEpisode
      .getEpisodes(0)
      .then(data => {
        console.log('data', data.info);
        return data.info;
      })
      .catch(e => Promise.reject(e));
  }
}
