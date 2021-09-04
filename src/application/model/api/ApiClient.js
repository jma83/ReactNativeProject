const axios = require('axios');

export default class ApiClient {
  constructor(url = 'https://rickandmortyapi.com/api') {
    this.URL = url;
  }

  async get(query = '') {
    return axios
      .get(query)
      .then(result => result.data)
      .catch(error => {
        console.error(error);
        throw error;
      });
  }

  getQueryParam(param = '', value = '', first = false) {
    const symbol = first ? '?' : '&';
    return `${symbol}${param}=${value}`;
  }
}
