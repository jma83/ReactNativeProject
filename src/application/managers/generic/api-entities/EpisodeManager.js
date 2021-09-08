import ContentAPIManager from '@application/managers/generic/ContentAPIManager.js';

export default class EpisodeManager extends ContentAPIManager {
  constructor(apiClientEpisode) {
    super();
    this.apiClientEpisode = apiClientEpisode;
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
