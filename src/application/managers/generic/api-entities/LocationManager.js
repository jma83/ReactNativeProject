import ContentAPIManager from '@application/managers/generic/api-entities/ContentAPIManager.js';

export default class LocationManager extends ContentAPIManager {
  constructor(apiClientLocation) {
    super();
    this.apiClientLocation = apiClientLocation;
  }

  async getLocations(page = 0) {
    const data = await this.apiClientLocation.getLocations(page);
    return data.results;
  }

  getLocationInfo() {
    return this.apiClientLocation
      .getLocations(0)
      .then(data => {
        return data.info;
      })
      .catch(e => Promise.reject(e));
  }

  async getLocationsByIds(ids = []) {
    const data = await this.apiClientLocation.getLocationsByIds(ids);
    return data;
  }

  async getLocationByURL(url = '') {
    const data = await this.apiClientLocation.getLocationByURL(url);
    return data;
  }
}
