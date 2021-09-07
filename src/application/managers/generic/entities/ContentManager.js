export default class ContentManager {
  constructor(content) {
    this.contentDAO = content;
  }

  async checkLiked(contentId, userId) {
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

  async getContentByUserAndType(userId, contentType) {
    const content = await this.contentDAO.getContentByUserIdAndType(userId, contentType);
    return content;
  }
}
