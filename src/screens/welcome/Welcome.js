import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import AvatarProfileRow from '@components/rowList/AvatarProfileRow';
import globalStyles from '@src/utils/GlobalStyles';
const welcomeImg = require('@assets/imgs/welcome.jpg');
import Icon from 'react-native-vector-icons/Ionicons';
import WelcomeManager from '@application/managers/welcome/WelcomeManager';
import AuthContext from '@application/context/AuthContext';
import { createAlert } from '@utils/Utils';
import ImageBackgroundView from '@components/image/ImageBackgroundView';
import AnimationView from '@components/animations/AnimationView';

export default function Welcome() {
  const { signIn } = React.useContext(AuthContext);
  const [welcomeManager] = useState(new WelcomeManager());
  const [profiles, setProfiles] = useState([]);
  const [textInput, setTextInput] = useState('');

  useEffect(async () => {
    const result = await welcomeManager.fetchProfiles();
    setProfiles(result);
  }, []);

  const renderRow = rowInfo => {
    const item = rowInfo.item;
    return (
      <AvatarProfileRow
        id={item.id}
        name={item.nickname}
        image={item.avatar}
        deleteProfile={deleteProfile}
        onPress={signInProfile.bind(this, item)}
      />
    );
  };

  const onChangeText = textInput => {
    setTextInput(textInput);
  };

  const deleteProfile = (id, name) => {
    const profileId = id;
    createAlert('Confirm delete', `Do you want to delete ${name}'s profile?`, true, async () => {
      await welcomeManager.deleteById(profileId);
      const profiles = await welcomeManager.fetchProfiles();
      setProfiles(profiles);
      setTextInput('');
    });
  };

  const createProfile = async () => {
    Keyboard.dismiss();
    setTextInput('');
    const createResult = await welcomeManager.createProfile(textInput);
    if (!createResult) {
      createAlert('Error', welcomeManager.getErrorMessage());
      return;
    }
    const profiles = await welcomeManager.fetchProfiles();
    setProfiles(profiles);
  };

  const signInProfile = async profile => {
    const newUserToken = await welcomeManager.signInProfile(profile.nickname, profile.userToken);
    signIn({ nickname: profile.nickname, token: newUserToken });
  };

  return (
    <ImageBackgroundView image={welcomeImg}>
      <AnimationView styles={styles.sectionContainer} duration={1000} opacity={true}>
        <Text style={[globalStyles.TitleFont, styles.welcomeTitle]}>Welcome to the Rickpedia!</Text>
        <View style={[styles.containerColumn, styles.sectionList]}>
          <Text style={globalStyles.CustomLGFont}>Select your profile:</Text>
          <FlatList
            ListEmptyComponent={<Text style={[globalStyles.CustomMDFont, styles.emptyList]}>- No profiles yet! -</Text>}
            horizontal={true}
            data={profiles}
            renderItem={renderRow.bind(this)}
            keyExtractor={(item, index) => index}></FlatList>
        </View>
        <View style={[styles.containerColumn, styles.sectionCreate]}>
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
      </AnimationView>
    </ImageBackgroundView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    marginTop: 30
  },
  containerColumn: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  sectionList: {
    backgroundColor: 'rgba(76, 87, 117, 0.8)',
    marginTop: 30,
    padding: 10,
    alignItems: 'center'
  },
  sectionCreate: {
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
  },
  emptyList: { textAlign: 'center', padding: 20 },
  welcomeTitle: {
    color: 'white',
    fontSize: 34,
    lineHeight: 60,
    textAlign: 'center'
  }
});
