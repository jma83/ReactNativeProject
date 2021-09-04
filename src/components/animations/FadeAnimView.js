import React from 'react';
import { View, Animated } from 'react-native';

export default function FadeAnimView(props) {
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: props.goalValue,
      duration: props.duration
    }).start();
  }, [fadeAnim]);

  return <View style={props.styles}>{props.children}</View>;
}
