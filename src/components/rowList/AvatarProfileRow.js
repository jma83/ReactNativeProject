import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, TouchableHighlight, View } from 'react-native';
import globalStyles from '@utils/GlobalStyles';
import Icon from 'react-native-vector-icons/Ionicons';

export default class CategoryRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress} underlayColor="lightgray">
        <View>
          <View style={styles.el_container}>
            <View style={styles.el_content}>
              <Image source={this.props.image} style={styles.image} />
            </View>
          </View>
          {this.drawMainContent()}
        </View>
      </TouchableHighlight>
    );
  }

  drawMainContent() {
    return !this.props.profile ? (
      <View style={{ alignItems: 'center' }}>
        <Text style={globalStyles.CustomMDFont}>{this.props.name}</Text>
        <TouchableOpacity
          style={styles.buttonSecondary}
          activeOpacity={0.5}
          onPress={() => this.props.deleteProfile(this.props.id, this.props.name)}>
          <Icon name="close" size={20} color={'black'} />
        </TouchableOpacity>
      </View>
    ) : (
      <View style={{ alignItems: 'center' }}>
        <Text style={[globalStyles.CustomMDFont, { color: 'black' }]}>{this.props.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  el_container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#4c5775',
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'black',
    width: 150,
    height: 150,
    margin: 20
  },

  el_content: {
    flex: 1
  },

  el_footer: {
    display: 'flex',
    flexDirection: 'row'
  },

  image: {
    width: '100%',
    height: '100%'
  },
  buttonSecondary: {
    width: 30,
    height: 30,
    borderRadius: 50,
    position: 'absolute',
    backgroundColor: '#f55d42',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    right: 30,
    bottom: 28
  }
});
