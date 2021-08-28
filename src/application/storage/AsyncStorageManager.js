import AsyncStorage from '@react-native-community/async-storage';

export default class AsyncStorageManager {
  static removeItem = async key => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (exception) {
      console.error('Error. Unable to remove userToken', exception);
      return false;
    }
  };

  static setItem = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (exception) {
      console.error('Error. Unable to set userToken', exception);
      return false;
    }
  };

  static getItem = async key => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (exception) {
      console.error('Error. Unable to load userToken', exception);
      return null;
    }
  };
}
