import ProfileImageTypes from '@application/data/ProfileImageTypes';
import UserManager from '@application/managers/generic/entities/UserManager.js';

export default class ProfileManager {
  constructor() {
    this.userManager = new UserManager();
    this.errorMessage = '';
    this.profile = null;
  }

  async getCurrentProfile() {
    this.profile = await this.userManager.getCurrentUserProfile();
    return this.profile;
  }

  getErrorMessage() {
    return this.errorMessage;
  }
}
