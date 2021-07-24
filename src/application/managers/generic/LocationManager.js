import ApiClientLocation from '../../api/ApiClientLocation.js';
import ContentManager from './ContentManager';

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
}
