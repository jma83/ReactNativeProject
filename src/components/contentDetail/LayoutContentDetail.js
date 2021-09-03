import React from 'react';
import { StyleSheet, View, Text, Linking } from 'react-native';
import globalStyles from '@src/utils/GlobalStyles';

export default function LayoutContentDetail(props) {
  const getMetaDescription = () => {
    let description = props.metaInfo.abstract ? (
      <View>
        <Text style={globalStyles.CustomMDFont}>Description:</Text>
        <Text style={globalStyles.DefaultTextFontWhite}>{props.metaInfo.abstract}</Text>
      </View>
    ) : (
      <Text style={globalStyles.CustomMDFont}>No description available</Text>
    );
    if (props.metaInfo.url != null) {
      description = (
        <View>
          {description}
          <Text style={globalStyles.CustomSMLinkFont} onPress={() => Linking.openURL(props.metaInfo.url)}>
            Continue reading...
          </Text>
        </View>
      );
    }
    return description;
  };
  return (
    <View>
      <View style={styles.el_container}>
        <View style={styles.el_image_container}>{props.image}</View>
        <View style={styles.el_content}>
          <View style={styles.el_header}>{props.header}</View>
          <View style={styles.el_status}>{props.status}</View>
        </View>
      </View>
      <View style={styles.el_footer}>
        {getMetaDescription()}
        {props.footer}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  el_container: {
    display: 'flex',
    flexDirection: 'row',
    margin: 16
  },

  el_content: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
    padding: 10,
    justifyContent: 'space-around',
    maxWidth: '50%'
  },

  el_status: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 24,
    padding: 6
  },

  el_footer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 16,
    maxWidth: 350
  },
  el_image_container: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 200,
    width: '50%'
  }
});
