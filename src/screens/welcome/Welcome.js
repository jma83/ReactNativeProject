import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert,
  Keyboard
} from 'react-native';
import AvatarProfileRow from '@components/rowList/AvatarProfileRow';
import globalStyles from '@src/utils/GlobalStyles';
const welcomeImg = require('@assets/imgs/welcome.jpg');
import Icon from 'react-native-vector-icons/Ionicons';
import WelcomeManager from '@application/managers/welcome/WelcomeManager';
import AuthContext from '@application/context/AuthContext';

export default function Welcome({ navigation }) {
  const { signIn } = React.useContext(AuthContext);
  const welcomeManager = new WelcomeManager();
  let deleteSelection = null;
  const [profiles, setProfiles] = useState(welcomeManager.getProfiles());
  const [textInput, setTextInput] = useState('');

  const renderRow = rowInfo => {
    const item = rowInfo.item;
    return (
      <AvatarProfileRow
        id={item.id}
        name={item.nickname}
        image={item.image}
        deleteProfile={deleteProfile}
        onPress={signIn}
      />
    );
  };

  const onChangeText = textInput => {
    setTextInput(textInput);
  };

  const deleteProfile = (id, name) => {
    deleteSelection = id;
    createAlert('Confirm delete', `Do you want to delete ${name}'s profile?`, true, () => {
      welcomeManager.deleteById(deleteSelection);
      setProfiles(welcomeManager.getProfiles());
      setTextInput('');
    });
  };

  const createProfile = () => {
    Keyboard.dismiss();
    if (!welcomeManager.createProfile(textInput)) {
      createAlert('Error', welcomeManager.getErrorMessage());
    }
    setProfiles(welcomeManager.getProfiles());
    setTextInput('');
  };

  const createAlert = (title, message, choices = false, callbackOk = () => {}) => {
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

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={welcomeImg} resizeMode="cover" style={styles.image}>
        <View style={styles.sectionContainer}>
          <Text style={globalStyles.WelcomeTitle}>Welcome to the Rickpedia!</Text>
          <View style={styles.sectionList}>
            <Text style={globalStyles.CustomLGFont}>Select your profile:</Text>
            <FlatList
              ListEmptyComponent={<Text style={globalStyles.CustomMDFontCenter}>- No profiles yet! -</Text>}
              horizontal={true}
              data={profiles}
              renderItem={renderRow.bind(this)}
              keyExtractor={(item, index) => index}></FlatList>
          </View>
          <View style={styles.sectionCreate}>
            <Text style={globalStyles.CustomLGFont}>Or create a new one:</Text>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Your Nickname"
                maxLength={20}
                value={textInput}
                onSubmitEditing={() => createProfile()}
                onChangeText={text => onChangeText(text)}
              />
              <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={() => createProfile()}>
                <Icon name="person-add" size={30} color={'black'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    marginTop: 30
  },
  sectionList: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(76, 87, 117, 0.8)',
    marginTop: 30,
    padding: 10,
    alignItems: 'center'
  },
  sectionCreate: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(76, 87, 117, 1)',
    padding: 20,

    borderTopWidth: 1,
    borderTopColor: 'white'
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    width: 55,
    height: 55,
    borderRadius: 80,
    backgroundColor: '#34a832',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    zIndex: 50
  },
  image: {
    flex: 1,
    resizeMode: 'stretch',
    justifyContent: 'center'
  },
  input: {
    width: '80%',
    marginTop: 8,
    borderWidth: 1,
    padding: 8,
    paddingLeft: 12,
    backgroundColor: 'white',
    borderRadius: 10,
    color: 'black'
  }
});
