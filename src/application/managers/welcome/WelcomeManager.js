import { AsyncStorage } from '@react-native-community/async-storage';
import ContentProfileTypes from '@application/data/ContentProfileTypes';

export default class WelcomeManager {
  constructor() {
    this.profiles = [];
    this.profileImages = ContentProfileTypes;
    this.maxProfiles = 5;
  }

  async storeUserSession(nickname = '') {
    await AsyncStorage.setItem('user', nickname);
  }

  async getUserSession() {
    return await AsyncStorage.getItem('user');
  }

  createProfile(nickname = '') {
    if (this.profiles.length >= this.maxProfiles) {
      return;
    }
    const image = this.profileImages[this.profiles.length];
    const item = { nickname, image };
    this.profiles = [...this.profiles, item];
    console.log('creo!', this.profiles);
  }

  getProfiles() {
    return this.profiles;
  }
}
