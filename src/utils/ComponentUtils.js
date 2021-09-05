import { Alert, ToastAndroid, Platform, AlertIOS } from 'react-native';

export const generateRandom = (min = 0, max = 0) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const createAlert = (title, message, choices = false, callbackOk = () => {}) => {
  let options = [{ text: 'OK', onPress: callbackOk }];

  if (choices == true) {
    options = [
      ...options,
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel'
      }
    ];
  }
  Alert.alert(title, message, options);
};

export const notifyMessage = msg => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    AlertIOS.alert(msg);
  }
};
