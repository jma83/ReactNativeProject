import React from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import globalStyles from '@src/utils/GlobalStyles';

export default function LayoutRow(props) {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor="lightgray">
      <View
        style={[
          styles.el_container,
          globalStyles.GenericRowContainer,
          globalStyles.PrimaryBackgroundColor,
          props.containerExtraStyles
        ]}>
        {props.container}
        <View style={[styles.el_content, props.contentExtraStyles]}>
          {props.contentHeader}
          {props.contentFooter}
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  el_container: {
    margin: 8
  },
  el_content: {
    flex: 1
  }
});
