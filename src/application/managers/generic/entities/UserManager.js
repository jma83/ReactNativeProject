import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export default class UserManager {
  saveUserProfile(item = null) {
    // TODO
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

  generateUserToken() {
    return uuidv4();
  }
}
