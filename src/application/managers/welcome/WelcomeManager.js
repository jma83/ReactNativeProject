import { AsyncStorage } from '@react-native-community/async-storage';
import ContentProfileTypes from '@application/data/ContentProfileTypes';

export default class WelcomeManager {
  constructor() {
    this.profiles = [];
    this.profileImages = ContentProfileTypes;
    this.maxProfiles = 5;
    this.errorMessage = '';
  }

  async storeUserSession(nickname = '') {
    await AsyncStorage.setItem('user', nickname);
  }

  async getUserSession() {
    return await AsyncStorage.getItem('user');
  }

  createProfile(nickname = '') {
    if (this.profiles.length >= this.maxProfiles) {
      this.errorMessage = `Can't create more profiles`;
      return false;
    }
    if (nickname === '') {
      this.errorMessage = `Nickname can't be empty`;
      return false;
    }
    console.log('`Nickname`', nickname, this.profiles);
    if (this.profiles.some(profile => profile.nickname === nickname)) {
      this.errorMessage = `Nickname already exists!`;
      return false;
    }
    const image = this.profileImages[this.profiles.length];
    const item = { id: this.profiles.length, nickname, image };
    this.profiles = [...this.profiles, item];
    return true;
  }

  getErrorMessage() {
    return this.errorMessage;
  }

  deleteById(id = 0) {
    this.profiles.splice(id, 1);
  }

  getProfiles() {
    return this.profiles;
  }
}
