import ApiClientImage from '@application/model/api/ApiClientImage.js';

export default class ImageManager {
  constructor() {
    this.apiClientImage = new ApiClientImage();
  }

  async getImage(title = '') {
    return await this.apiClientImage.getImageByTitle(title);
  }
}
