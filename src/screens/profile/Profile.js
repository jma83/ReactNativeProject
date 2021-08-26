import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native';
import globalStyles from '@src/utils/GlobalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
const seasonsImg = require('@assets/imgs/seasons.jpg');

export default class Profile extends React.Component {
  render() {
    return (
      <View style={styles.sectionContainer}>
        <ImageBackground source={seasonsImg} resizeMode="stretch" style={{ flex: 1, justifyContent: 'center' }}>
          <ScrollView>
            <View style={styles.sectionContent}>
              <View style={styles.sectionTitleContainer}>
                <Image style={styles.image} resizeMode="contain" source={seasonsImg} />
                <Text style={globalStyles.CustomLGTitleFontBlack}>Johnny</Text>
              </View>
              <View style={styles.sectionButtonsContainer}>
                <TouchableOpacity
                  style={styles.floatingButton}
                  activeOpacity={0.5}
                  onPress={() => this.onContentPressed()}>
                  <Icon name="people" size={28} color={'white'} />
                  <Text style={globalStyles.CustomMDFont}> Change profile </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.floatingButton2} activeOpacity={0.5} onPress={() => {}}>
                  <Icon name="star" size={28} color={'white'} />
                  <Text style={globalStyles.CustomMDFont}>Favorite content</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }

  onContentPressed() {
    this.props.navigation.navigate('StartGame');
  }
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
