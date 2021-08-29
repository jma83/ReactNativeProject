import 'react-native-get-random-values';
import Content from '@application/model/db/Content';

export default class ContentManager {
  constructor() {
    this.contentDAO = new Content();
  }

  async checkLiked(contentId, userId) {
    console.log('checkLieeeed', contentId, userId);
    const content = await this.contentDAO.checkUserContentById(contentId, userId);
    return content.length > 0;
  }

  async like(contentId, contentType, userId) {
    const content = await this.contentDAO.saveContent(contentId, contentType, userId);

    return content.rowsAffected > 0;
  }

  async dislike(contentId, userId) {
    const content = await this.contentDAO.deleteContent(contentId, userId);

    return content.rowsAffected > 0;
  }
}
