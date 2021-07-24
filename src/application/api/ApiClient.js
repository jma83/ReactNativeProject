const axios = require('axios');

export default class ApiClient {
  constructor() {
    this.URL = 'https://rickandmortyapi.com/api';
  }

  async get(query = '') {
    return axios
      .get(query)
      .then(result => result.data)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  getQueryParam(param = '', value = '', first = false) {
    const symbol = first ? '?' : '&';
    return `${symbol}${param}=${value}`;
  }
}
