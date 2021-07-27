import ApiClient from '@application/api/ApiClient.js';

export default class ApiClientLocation extends ApiClient {
  async getLocations(page) {
    let query = this.getLocationURI() + this.getQueryParam('page', page, true);
    console.log('getLocations', query);
    return await this.get(query);
  }

  async getLocation(id) {
    let query = this.getLocationURI() + `/${id}`;
    return await this.get(query);
  }

  async getLocationsByIds(id = []) {
    let query = this.getLocationURI() + `/${id}`;
    return await this.get(query);
  }

  getLocationURI() {
    return `${this.URL}/location`;
  }
}
