import React, { useRef, useEffect, useState } from 'react';
import { Animated } from 'react-native';

const MODIFIER_TYPE = {
  TRANSLATE_X: 0,
  TRANSLATE_Y: 1,
  SCALE: 2
};

export default function FadeAnimView(props) {
  const startValue = 0;
  const endValue = 1;
  const animatedValue = useRef(new Animated.Value(props.initialValue || startValue)).current;
  const [transformAnimation, setTransformAnimation] = useState([]);

  const addAnimation = (start = 0, end = 1, modifier) => {
    const value = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [start, end]
    });
    let object = selectModifier(value, modifier);
    setTransformAnimation([...transformAnimation, object]);
  };

  const selectModifier = (value, modifier) => {
    switch (modifier) {
      case MODIFIER_TYPE.TRANSLATE_X:
        return { translateX: value };
      case MODIFIER_TYPE.TRANSLATE_Y:
        return { translateY: value };
      case MODIFIER_TYPE.SCALE:
        return { scale: value };
      default:
        return {};
    }
  };

  const getModifiers = () => {
    const opacity = props.opacity ? animatedValue : 1;
    return { ...props.styles, opacity, transform: transformAnimation };
  };

  useEffect(() => {
    if (props.translateX) addAnimation(props.translateX.start, props.translateX.end, MODIFIER_TYPE.TRANSLATE_X);
    if (props.translateY) addAnimation(props.translateY.start, props.translateY.end, MODIFIER_TYPE.TRANSLATE_Y);
    if (props.scale) addAnimation(props.scale.start, props.scale.end, MODIFIER_TYPE.SCALE);
  }, []);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: props.endValue || endValue,
      duration: props.duration,
      useNativeDriver: true
    }).start();
  }, [animatedValue]);

  return <Animated.View style={getModifiers()}>{props.children}</Animated.View>;
}
