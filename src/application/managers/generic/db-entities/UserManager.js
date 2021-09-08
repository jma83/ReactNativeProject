import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorageManager from '@application/managers/storage/AsyncStorageManager';

export default class UserManager {
  constructor(user) {
    this.userDAO = user;
  }

  async saveUserProfile(item = null) {
    return !!(await this.userDAO.saveUser(item, this.generateUserToken()));
  }

  async deleteUserProfile(id) {
    await this.userDAO.deleteUser(id);
  }

  async signInUserProfile(user, userToken) {
    const result = await this.userDAO.checkUser(user, userToken);
    if (result.length <= 0) return null;
    const newToken = this.generateUserToken();
    await this.userDAO.updateUserToken(result[0].id, newToken);
    return newToken;
  }

  async getCurrentUserProfile() {
    const { nickname, userToken } = await this.getCurrentUserInStorage();
    const result = await this.userDAO.checkUser(nickname, userToken);
    return result.length > 0 ? result[0] : null;
  }

  async getCurrentUserInStorage() {
    const nickname = await AsyncStorageManager.getItem('user');
    const userToken = await AsyncStorageManager.getItem('userToken');
    return { nickname, userToken };
  }

  async setCurrentUserInStorage(nickname, userToken) {
    await AsyncStorageManager.setItem('user', nickname);
    await AsyncStorageManager.setItem('userToken', userToken);
  }

  async removeCurrentUserInStorage() {
    await AsyncStorageManager.removeItem('user');
    await AsyncStorageManager.removeItem('userToken');
  }

  async getUserProfiles() {
    try {
      const result = await this.userDAO.getUsers();
      return result;
    } catch (err) {
      console.error('error', err);
    }
    return [];
  }

  generateUserToken() {
    return uuidv4();
  }
}
