import React from 'react';
import { StyleSheet, View, ImageBackground, ScrollView, Text } from 'react-native';
const charactersImg = require('@assets/imgs/characters.png');
import globalStyles from '@utils/GlobalStyles';

export default function LayoutGame(props) {
  return (
    <View style={styles.sectionContainer}>
      <ImageBackground source={charactersImg} resizeMode="cover" style={{ flex: 1, justifyContent: 'center' }}>
        <ScrollView>
          <View style={styles.sectionContent}>
            <View style={styles.sectionTitleContainer}>
              <Text style={globalStyles.CustomLGTitleFontBlack}>{props.title}</Text>
              <Text style={[globalStyles.CustomMDFont, { color: 'black' }]}>{props.subtitle}</Text>
            </View>
            <View style={styles.sectionButtonsContainer}>
              {props.buttons1}
              {props.buttons2}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1
  },
  sectionContent: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    padding: 20,
    margin: 10,
    marginTop: 80,
    backgroundColor: 'white'
  },
  sectionTitleContainer: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionButtonsContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
