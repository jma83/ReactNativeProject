import ApiClientImage from '@application/api/ApiClientImage.js';

export default class ImageManager {
  constructor() {
    this.apiClientImage = new ApiClientImage();
  }

  async getImage(title = '') {
    return await this.apiClientImage.getImageByTitle(title);
  }
}
