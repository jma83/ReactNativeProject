import React from 'react';
import { StyleSheet, Image } from 'react-native';
const defaultIcon = require('@assets/imgs/icon.jpg');

export default function PrimaryImage(props) {
  const getImage = () => {
    const imageURI = props.image;
    if (!imageURI) {
      return defaultIcon;
    }
    return { uri: imageURI };
  };

  return <Image style={styles.image} resizeMode="contain" source={getImage()} />;
}

const styles = StyleSheet.create({
  image: {
    width: '102%',
    height: '100%',
    borderRadius: 5,
    overflow: 'hidden'
  }
});
