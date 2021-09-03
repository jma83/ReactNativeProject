import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  CustomSMFont: {
    fontFamily: 'coolvetica',
    fontSize: 16,
    color: 'white'
  },
  CustomMDFont: {
    fontFamily: 'coolvetica',
    fontSize: 19,
    color: 'white'
  },
  CustomLGFont: {
    fontFamily: 'coolvetica',
    fontSize: 22,
    color: 'white'
  },
  CustomSMLinkFont: {
    fontFamily: 'coolvetica',
    fontSize: 16,
    color: '#369ed1'
  },
  CustomTitleFont: {
    fontFamily: 'KGBlankSpaceSolid',
    fontSize: 20,
    color: 'white'
  },
  CustomTitleSMFont: {
    fontFamily: 'KGBlankSpaceSolid',
    fontSize: 15,
    color: 'white'
  },
  CustomLGTitleFontBlack: {
    fontFamily: 'KGBlankSpaceSolid',
    fontSize: 24,
    color: 'black',
    textAlign: 'center'
  },
  DefaultTextFont: {
    color: 'black'
  },
  DefaultTextFontWhite: {
    color: 'white'
  },
  CategoryTitle: {
    color: 'white',
    fontSize: 34,
    lineHeight: 84,
    textAlign: 'center',
    backgroundColor: '#000000c0',
    fontFamily: 'KGBlankSpaceSolid'
  },
  TitleFont: {
    fontFamily: 'KGBlankSpaceSolid'
  },
  PrimaryBackgroundColor: {
    backgroundColor: '#4c5775'
  },
  SecondaryBackgroundColor: {
    backgroundColor: '#ee6e73'
  },
  GenericRowContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
    overflow: 'hidden'
  }
});

export default globalStyles;
