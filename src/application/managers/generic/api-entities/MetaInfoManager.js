export default class MetaInfoManager {
  constructor(apiClientMetaInfo) {
    this.apiClientMetaInfo = apiClientMetaInfo;
  }

  async getMetaInfoByTitle(title = '') {
    return await this.apiClientMetaInfo.getMetaInfoByTitle(title);
  }

  async getMetaInfoById(id = '') {
    return await this.apiClientMetaInfo.getMetaInfoByTitle(id);
  }
}
