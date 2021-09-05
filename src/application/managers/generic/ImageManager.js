import ApiClientMetaInfo from '@application/model/api/ApiClientMetaInfo.js';

export default class ImageManager {
  constructor() {
    this.apiClientMetaInfo = new ApiClientMetaInfo();
  }

  async getImage(title = '') {
    return await this.apiClientMetaInfo.getImageByTitle(title);
  }
}
