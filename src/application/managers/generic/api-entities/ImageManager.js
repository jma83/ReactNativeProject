export default class ImageManager {
  constructor(apiClientMetaInfo) {
    this.apiClientMetaInfo = apiClientMetaInfo;
  }

  async getImage(title = '') {
    return await this.apiClientMetaInfo.getImageByTitle(title);
  }
}
