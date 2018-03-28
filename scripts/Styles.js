const React = require('react-native');

const { StyleSheet, Dimensions, Platform } = React;

// const primary = require('../../themes/variable').brandPrimary;
const primary = '#fcb415';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  inputs: {
    marginTop: 15,
    flex: 1,
  },
  inputContainer: {
    padding: 10,
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
    borderColor: Platform.OS === 'ios' ? '#DDD' : 'transparent'
  },
  input: {
    position: 'absolute',
    left: 5,
    top: 0,
    right: 5,
    bottom: 0,
    height: 40,
    fontSize: 18,
    padding: 5
  },
  greyFont: {
    color: '#555'
  },
  darkFont: {
    color: '#000'
  },
  formLabel: {
      fontSize: 14,
      padding: 5,
  },
  formLabelSub: {
      fontSize: 13,
      color: '#999',
      paddingBottom: 5,
      paddingLeft: 5
  },
  formItem: {
    borderColor:'transparent',
    borderBottomWidth: 1,
    marginBottom:5
  },
  formItemInput: {
    borderWidth: 2,
    borderColor: '#f8961d',
    backgroundColor: '#FFF',
    height: 40,
    borderRadius: 5,
    fontSize: 14
  },
  formItemTextArea: {
    borderWidth: 2,
    borderColor: '#f8961d',
    backgroundColor: '#FFF',
    height: 200,
    borderRadius: 5,
    width: deviceWidth-20,
  },
  formItemInputMask: {
    borderWidth: 2,
    borderColor: '#f8961d',
    backgroundColor: '#FFF',
    height: 40,
    borderRadius: 5,
    width: deviceWidth-20,
    padding: 10,
    color: '#000'
  },
  imageFullCenter: {
    resizeMode: 'contain',
    alignSelf: 'center',
    // marginBottom: 30,
    width: (deviceWidth /1.5 )
  },
  footerBtn: {
    width: deviceWidth-20,
    margin: 10
  },
  pickerInputItem: {
    borderWidth: 2,
    borderColor: '#f8961d',
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 40,
    marginBottom: 5
  },
  iosPickerInput: {
    width:deviceWidth-30,
  },
  aPickerInput: {
    width:deviceWidth-30,
    color:'#000'
  },
  hideForApartment: {
    display: 'none'
  },
  hideForHouse: {
    display: 'none'
  },
  hideForLand: {
    display: 'none'
  },
  hideForCommercial: {
    display: 'none'
  },
  sparator: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    marginBottom: 30
  }
});

module.exports.colors = {
  accentColor: '#31D8A0'
};
