import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native';
import globalStyles from '@src/utils/GlobalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
const seasonsImg = require('@assets/imgs/seasons.jpg');
import AuthContext from '@application/context/AuthContext';
import AvatarProfileRow from '@components/rowList/AvatarProfileRow';
import ProfileManager from '@application/managers/profile/ProfileManager';
import AnimationView from '@components/animations/AnimationView';

export default function Profile({ navigation }) {
  const { signOut } = React.useContext(AuthContext);
  const [profileManager] = useState(new ProfileManager());
  const [profile, setProfile] = useState([]);

  useEffect(async () => {
    const result = await profileManager.getCurrentProfile();
    setProfile(result);
  }, []);

  const onContentPressed = () => {
    navigation.navigate('Favorite Content Categories');
  };

  return (
    <View style={[styles.sectionContainer, globalStyles.PrimaryBackgroundColor]}>
      <ImageBackground source={seasonsImg} resizeMode="stretch" style={{ flex: 1, justifyContent: 'center' }}>
        <ScrollView>
          <AnimationView styles={styles.sectionContent} duration={500} scale={{ start: 0.5, end: 1 }} opacity={true}>
            <View style={styles.sectionTitleContainer}>
              <AvatarProfileRow id={profile.id} name={profile.nickname} image={profile.avatar} profile={true} />
            </View>
            <View style={styles.sectionButtonsContainer}>
              <TouchableOpacity
                style={[styles.floatingButton, globalStyles.SecondaryBackgroundColor]}
                activeOpacity={0.5}
                onPress={() => onContentPressed()}>
                <Icon name="star" size={28} color={'white'} />
                <Text style={globalStyles.CustomMDFont}>Favorite content</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.floatingButton, globalStyles.PrimaryBackgroundColor]}
                activeOpacity={0.5}
                onPress={signOut}>
                <Icon name="people" size={28} color={'white'} />
                <Text style={globalStyles.CustomMDFont}> Change profile </Text>
              </TouchableOpacity>
            </View>
          </AnimationView>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    width: '100%',
    height: '100%'
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 20
  }
});
