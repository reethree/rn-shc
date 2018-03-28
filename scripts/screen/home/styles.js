

const React = require('react-native');

const { StyleSheet, Dimensions, Platform } = React;

// const primary = require('../../themes/variable').brandPrimary;
const primary = '#fcb415';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
  iosImageFullCenter: {
    resizeMode: 'contain',
    alignSelf: 'center',
    // marginBottom: 30,
    width: (deviceWidth /1.5 )
  },
  aImageFullCenter: {

  },
  iosShadow: {
    // backgroundColor: '#000',
    // flex: 1,
    width: (deviceHeight < 500) ? 80 : (deviceWidth / 1.5) + 15,
    resizeMode: 'contain',
    height: (deviceHeight < 500) ? 50 : (deviceHeight / 10),
    alignSelf: 'center',
    marginTop: (deviceWidth < 330) ? (deviceHeight / 15) : ((deviceHeight / 6) - 60),
  },
  aShadow: {
    // flex: 1,
    resizeMode: 'contain',
    width: (deviceWidth / 2) + 20,
    // height: (deviceHeight / 10),
    // padding: 20,
    alignSelf: 'center',
    marginTop: (deviceWidth < 330) ? (deviceHeight / 15) : ((deviceHeight / 5) - 80),
  },
  iosShadowRumah: {
    // backgroundColor: '#000',
    // flex: 1,
    width: (deviceWidth / 1.5) + 15,
    resizeMode: 'contain',
    // height: (deviceHeight < 500) ? 50 : (deviceHeight / 10),
    alignSelf: 'center',
    marginTop: (deviceWidth < 330) ? (deviceHeight / 15) : ((deviceHeight / 6) - 80),
  },
  aShadowRumah: {
    // flex: 1,
    resizeMode: 'contain',
    width: (deviceWidth / 1.5) + 8,
    // height: (deviceHeight / 20),
    // padding: 20,
    alignSelf: 'center',
    marginTop: (deviceWidth < 330) ? (deviceHeight / 15) : ((deviceHeight / 5) - 100),
  },
  iosImgStarted: {
    // backgroundColor: '#000',
    // flex: 1,
    // width: (deviceWidth),
    resizeMode: 'contain',
    height: (deviceHeight / 3),
    alignSelf: 'center',
    marginTop: -(deviceHeight / 2.5),
  },
  aImgStarted: {
    // flex: 1,
    // width: (deviceWidth / 1),
    resizeMode: 'contain',
    height: (deviceHeight / 3),
    // padding: 20,
    alignSelf: 'center',
    marginTop: -(deviceHeight / 9),
  },
  inputGrp: {
    flexDirection: 'row',
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.8)',
    marginBottom: 20,
  },
  input: {
    paddingLeft: 15,
  },
  background: {
    flex: 1,
    width: null,
    height: Platform.OS === "ios" ? deviceHeight-64 : deviceHeight-56,
    backgroundColor: '#f8961d',
  },
  bg: {
    height: 65,
    backgroundColor: '#f8961d',
    // paddingLeft: 20,
    // paddingRight: 20,
    // paddingBottom: 10,
    marginTop: (deviceHeight < 500) ? (Platform.OS === 'android' ? 20 : 0) : (Platform.OS === 'android' ? ((deviceHeight / 6) - 45) : ((deviceHeight / 6) - 10)),
  },
  interestBtn: {
    width: deviceWidth-20,
    margin: 10
  },
  loginBtn: {
    margin: 10,
    width: deviceWidth-80,
    // height: 50,
    borderRadius: 8,
    backgroundColor: '#3AB44B'
  },
  helpBtns: {
    opacity: 0.9,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFF'
  },
  otherLinksContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  slides: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: primary,
      height: deviceHeight
  },
  iosText: {
      fontSize: 16,
      padding: 60,
      textAlign: 'center',
      fontWeight: 'bold',
      lineHeight: 0
  },
  aText: {
      fontSize: 16,
      padding: 40,
      textAlign: 'center',
      fontWeight: 'bold',
      margin: 40
  },
  iospaginationText: {
      position: 'relative',
      top: -(deviceHeight/7),
      fontSize: 20,
      lineHeight: 0,
      fontWeight: 'bold'
  },
  apaginationText: {
      // position: 'relative',
      top: -(deviceHeight/9),
      fontSize: 20,
      // lineHeight: 0,
      fontWeight: 'bold',
      padding: 20,
      textAlign: 'center'
  },
  swiperDot: {
      backgroundColor:'rgba(0,0,0,.2)',
      width: 50,
      height: 1,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 20
  },
  swiperActiveDot: {
      backgroundColor: '#fff',
      width: 50,
      height: 1,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 20
  },
  imageIcons: {
      fontSize: 120
  },
  Button: {
      alignSelf: 'center',
      paddingHorizontal: 20,
      backgroundColor: 'rgba(0,0,0,0.2)'
  },
  segitigaAtas: {
    borderTopWidth: 0,
    borderRightWidth: 35/2.0,
    borderBottomWidth: 20,
    borderLeftWidth: 35/2.0,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFF',
    borderLeftColor: 'transparent',
  }
});
