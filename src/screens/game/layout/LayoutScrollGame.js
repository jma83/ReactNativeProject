import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
const charactersImg = require('@assets/imgs/characters.png');
import globalStyles from '@utils/GlobalStyles';
import ImageBackgroundView from '@components/image/ImageBackgroundView';
import AnimationView from '@components/animations/AnimationView';

export default function LayoutGame(props) {
  return (
    <ImageBackgroundView image={charactersImg}>
      <ScrollView>
        <AnimationView styles={styles.sectionContent} duration={500} translateY={{ start: 150, end: 0 }} opacity={true}>
          <View style={styles.sectionTitleContainer}>
            <Text style={globalStyles.CustomLGTitleFontBlack}>{props.title}</Text>
            <Text style={[globalStyles.CustomMDFont, { color: 'black' }]}>{props.subtitle}</Text>
          </View>
          <View style={styles.sectionButtonsContainer}>
            {props.buttons1}
            {props.buttons2}
          </View>
        </AnimationView>
      </ScrollView>
    </ImageBackgroundView>
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
