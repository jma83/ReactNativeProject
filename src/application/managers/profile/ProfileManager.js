import { userManager } from '@application/container/AppManagers.js';
export default class ProfileManager {
  constructor() {
    this.userManager = userManager;
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
