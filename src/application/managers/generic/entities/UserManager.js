import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import User from '@application/model/db/User';
import AsyncStorageManager from '@application/managers/storage/AsyncStorageManager';

export default class UserManager {
  constructor() {
    this.userDAO = new User();
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
    const user = await AsyncStorageManager.getItem('user');
    const userToken = await AsyncStorageManager.getItem('userToken');
    const result = await this.userDAO.checkUser(user, userToken);
    return result.length > 0 ? result[0] : null;
  }

  async getUserProfiles() {
    try {
      const result = await this.userDAO.getUsers();
      // console.log('result', result);
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
