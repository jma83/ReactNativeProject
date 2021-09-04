import ApiClientEpisode from '@application/model/api/ApiClientEpisode.js';
import ContentManager from '@application/managers/generic/ContentManager.js';

export default class EpisodeManager extends ContentManager {
  constructor() {
    super();
    this.apiClientEpisode = new ApiClientEpisode();
  }

  async getEpisodes(page = 0) {
    const data = await this.apiClientEpisode.getEpisodes(page);
    return data.results;
  }

  async getEpisodesByIds(ids = []) {
    const data = await this.apiClientEpisode.getEpisodesByIds(ids);
    return data;
  }

  getEpisodeInfo() {
    return this.apiClientEpisode
      .getEpisodes(0)
      .then(data => {
        return data.info;
      })
      .catch(e => Promise.reject(e));
  }
}
