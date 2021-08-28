import ContentProfileTypes from '@application/data/ContentProfileTypes';
import UserManager from '@application/managers/generic/entities/UserManager.js';

export default class WelcomeManager {
  constructor() {
    this.profiles = []; //TODO Get from db
    this.profileImages = ContentProfileTypes;
    this.maxProfiles = 5;
    this.errorMessage = '';
    this.userManager = new UserManager();
  }

  signInProfile() {
    return this.userManager.signInUserProfile();
  }

  createProfile(nickname = '') {
    if (!this.validateProfile(nickname)) return false;
    const image = this.profileImages.find(image => !this.profiles.some(p => p.image === image));
    const item = { id: this.profiles.length, nickname, image };
    this.profiles = [...this.profiles, item];
    this.userManager.saveUserProfile(item);
    return true;
  }

  validateProfile(nickname) {
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

  deleteById(id = 0) {
    const newArray = [...this.profiles];
    newArray.forEach((value, index) => {
      if (value.id === id) newArray.splice(index, 1);
    });
    this.profiles = newArray;
  }

  getProfiles() {
    return this.profiles;
  }

  getErrorMessage() {
    return this.errorMessage;
  }
}
