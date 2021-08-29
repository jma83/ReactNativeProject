import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import User from '@application/model/db/User';

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

  signInUserProfile() {
    return this.generateUserToken();
  }

  removeUserProfile() {
    // TODO
  }

  getUserProfile() {
    // TODO
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
