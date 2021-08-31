import ApiClient from '@application/model/api/ApiClient.js';

export default class ApiClientLocation extends ApiClient {
  async getLocations(page) {
    let query = this.getLocationURI() + this.getQueryParam('page', page, true);
    return await this.get(query);
  }

  async getLocation(id) {
    let query = this.getLocationURI() + `/${id}`;
    return await this.get(query);
  }

  async getLocationsByIds(id = []) {
    let query = this.getLocationURI() + `/${id}`;
    const result = await this.get(query);
    if (result.length > 1) {
      return result;
    }
    return [result];
  }

  async getLocationByURL(url = '') {
    console.log('getLocationByURL', url.includes(this.getLocationURI()));
    if (!url.includes(this.getLocationURI())) {
      return null;
    }
    return await this.get(url);
  }

  getLocationURI() {
    return `${this.URL}/location`;
  }
}
