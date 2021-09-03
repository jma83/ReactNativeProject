import React from 'react';
import { Image } from 'react-native';
const defaultIcon = require('@assets/imgs/icon.jpg');

export default function PrimaryImage(props) {
  const getImage = () => {
    const imageURI = props.image;
    if (!imageURI) {
      return defaultIcon;
    }
    return { uri: imageURI };
  };

  return <Image style={props.imageStyles} resizeMode={props.mode || 'contain'} source={getImage()} />;
}
