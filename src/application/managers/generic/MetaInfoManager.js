import ApiClientMetaInfo from '@application/api/ApiClientMetaInfo.js';

export default class MetaInfoManager {
  constructor() {
    this.apiClientMetaInfo = new ApiClientMetaInfo();
  }

  async getMetaInfoByTitle(title = '') {
    return await this.apiClientMetaInfo.getMetaInfoByTitle(title);
  }

  async getMetaInfoById(id = '') {
    return await this.apiClientMetaInfo.getMetaInfoByTitle(id);
  }
}
