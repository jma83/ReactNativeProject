import ProfileImageTypes from '@application/data/ProfileImageTypes';
import { userManager } from '@application/container/AppManagers.js';
export default class WelcomeManager {
  constructor() {
    this.userManager = userManager;
    this.profileImages = ProfileImageTypes;
    this.maxProfiles = 5;
    this.errorMessage = '';
  }

  async fetchProfiles() {
    this.profiles = await this.userManager.getUserProfiles();
    return this.profiles;
  }

  async getUpdatedProfiles() {
    return this.profiles;
  }

  async signInProfile(user, userToken) {
    return await this.userManager.signInUserProfile(user, userToken);
  }

  async createProfile(nicknameSent = '') {
    const nickname = nicknameSent.trim();
    if (!this.validateNickname(nickname)) return false;
    const image = this.profileImages.find(image => !this.profiles.some(p => p.avatar === image));
    return await this.userManager.saveUserProfile({ nickname, image });
  }

  async deleteById(id = 0) {
    await this.userManager.deleteUserProfile(id);
  }

  validateNickname(nickname) {
    if (this.profiles.length >= this.maxProfiles) {
      this.errorMessage = `Can't create more profiles`;
      return false;
    }
    if (nickname === '') {
      this.errorMessage = `Nickname can't be empty`;
      return false;
    }
    if (this.profiles.some(profile => profile.nickname === nickname)) {
      this.errorMessage = `Nickname already exists!`;
      return false;
    }
    return true;
  }

  getErrorMessage() {
    return this.errorMessage;
  }
}
