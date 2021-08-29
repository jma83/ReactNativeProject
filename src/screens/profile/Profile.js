import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native';
import globalStyles from '@src/utils/GlobalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
const seasonsImg = require('@assets/imgs/seasons.jpg');
import AuthContext from '@application/context/AuthContext';
import AvatarProfileRow from '@components/rowList/AvatarProfileRow';
import ProfileManager from '@application/managers/profile/ProfileManager';

export default function Profile({ navigation }) {
  const { signOut } = React.useContext(AuthContext);
  const [profileManager] = useState(new ProfileManager());
  const [profile, setProfile] = useState([]);

  useEffect(async () => {
    console.log('mount it!');
    const result = await profileManager.getCurrentProfile();
    setProfile(result);
  }, []);

  const onContentPressed = () => {
    console.log('navigation', navigation);
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.sectionContainer}>
      <ImageBackground source={seasonsImg} resizeMode="stretch" style={{ flex: 1, justifyContent: 'center' }}>
        <ScrollView>
          <View style={styles.sectionContent}>
            <View style={styles.sectionTitleContainer}>
              <AvatarProfileRow id={profile.id} name={profile.nickname} image={profile.avatar} profile={true} />
            </View>
            <View style={styles.sectionButtonsContainer}>
              <TouchableOpacity style={styles.floatingButton} activeOpacity={0.5} onPress={() => onContentPressed()}>
                <Icon name="star" size={28} color={'white'} />
                <Text style={globalStyles.CustomMDFont}>Favorite content</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.floatingButton2} activeOpacity={0.5} onPress={signOut}>
                <Icon name="people" size={28} color={'white'} />
                <Text style={globalStyles.CustomMDFont}> Change profile </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: '#4c5775'
  },
  sectionContent: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    padding: 20,
    margin: 10,
    marginTop: 80,
    backgroundColor: '#fff'
  },
  sectionTitleContainer: {
    marginBottom: 20,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  sectionButtonsContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  floatingButton: {
    width: '70%',

    borderRadius: 10,
    backgroundColor: '#ee6e73',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 20
  },
  floatingButton2: {
    width: '70%',
    borderRadius: 10,
    backgroundColor: '#4c5775',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 20
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10000,
    overflow: 'hidden'
  },
  el_image_container: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 200
  }
});
