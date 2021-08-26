import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  TextInput
} from 'react-native';
import AvatarProfileRow from '@components/rowList/AvatarProfileRow';
import globalStyles from '@src/utils/GlobalStyles';
const welcomeImg = require('@assets/imgs/welcome.jpg');
import Icon from 'react-native-vector-icons/Ionicons';
import WelcomeManager from '@application/managers/welcome/WelcomeManager';

export default class Wlcome extends Component {
  constructor(props) {
    super(props);
    this.welcomeManager = new WelcomeManager();
    this.state = { profiles: this.welcomeManager.getProfiles(), textInput: '' };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground source={welcomeImg} resizeMode="cover" style={styles.image}>
          <View style={styles.sectionContainer}>
            <Text style={globalStyles.WelcomeTitle}>Welcome to the Rickpedia!</Text>
            <View style={styles.sectionList}>
              <Text style={globalStyles.CustomLGFont}>Select your profile:</Text>
              <FlatList
                ListEmptyComponent={<Text style={globalStyles.CustomTitleMDFontCenter}>- No profiles yet! -</Text>}
                horizontal={true}
                data={this.state.profiles}
                renderItem={this.renderRow.bind(this)}
                keyExtractor={(item, index) => index}></FlatList>
            </View>
            <View style={styles.sectionCreate}>
              <Text style={globalStyles.CustomLGFont}>Or create a new one:</Text>
              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  placeholder="Your Nickname"
                  maxLength={20}
                  value={this.state.textInput}
                  onChangeText={text => this.onChangeText(text)}
                />
                <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={() => this.createProfile()}>
                  <Icon name="person-add" size={30} color={'black'} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }

  renderRow = rowInfo => {
    const item = rowInfo.item;
    return (
      <AvatarProfileRow name={item.nickname} image={item.image} onPress={this.onContentPressed.bind(this, item)} />
    );
  };

  onContentPressed(item) {
    this.props.navigation.navigate('CategoryContent', { contentName: item.name, contentType: item.id });
  }

  onChangeText(textInput) {
    this.setState({ textInput });
  }

  createProfile() {
    this.welcomeManager.createProfile(this.state.textInput);
    this.setState({ profiles: this.welcomeManager.getProfiles(), textInput: '' });
  }
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
    padding: 10
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
    borderRadius: 10
  }
});
