import ApiClientLocation from '@application/model/api/ApiClientLocation.js';
import ContentManager from '@application/managers/generic/ContentManager.js';

export default class LocationManager extends ContentManager {
  constructor() {
    super();
    this.apiClientLocation = new ApiClientLocation();
  }

  async getLocations(page = 0) {
    const data = await this.apiClientLocation.getLocations(page);
    return data.results;
  }

  getLocationInfo() {
    return this.apiClientLocation
      .getLocations(0)
      .then(data => {
        console.log('data', data.info);
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
