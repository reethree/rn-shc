import React, { Component } from "react";
import { Platform, Image, AsyncStorage, Keyboard, TouchableOpacity } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  StyleProvider,
  Card,
  CardItem,
  Thumbnail,
  Form,
  Item,
  Label,
  Input,
  Toast,
  Picker,
  Spinner
} from "native-base";

import { TextInputMask } from 'react-native-masked-text';
import RNFetchBlob from 'react-native-fetch-blob';

import getTheme from '../../../native-base-theme/components';
import commonColor from '../../../native-base-theme/variables/commonColor';
const customStyles = require('../../Styles');

import ButtonGradient from '../../components/gradient/button';
import HeaderWithBack from '../../components/header/withBack';
import FloatingLabelInput from '../../components/input/floating';

import { onSignIn } from "../../Auth";

class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      password: '',
      HearSelected: 'social-media',
      isLoading: false
    }
  }

  onHearChange(value: string) {
    this.setState({
      HearSelected: value
    });
  }

  _onPressRegister() {
    Keyboard.dismiss;
    this.setState({isLoading:true});

    const { name, email, phone, password, HearSelected } = this.state;

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(name == ''){
      Toast.show({
        text: 'Name is required.',
        position: 'bottom',
        buttonText: 'OK',
        type: 'danger'
      });
      this.setState({name:name,isLoading:false})
      return false;
    }else if(reg.test(email) === false){
      Toast.show({
        text: 'Email is Not Correct.',
        position: 'bottom',
        buttonText: 'OK',
        type: 'danger'
      });
      this.setState({email:email,isLoading:false})
      return false;
    }else if(phone == ''){
      Toast.show({
        text: 'Phone Number is required.',
        position: 'bottom',
        buttonText: 'OK',
        type: 'danger'
      });
      this.setState({phone:phone,isLoading:false})
      return false;
    }else if(password == ''){
      Toast.show({
        text: 'Password is required.',
        position: 'bottom',
        buttonText: 'OK',
        type: 'danger'
      });
      this.setState({password:password,isLoading:false})
      return false;
    }

    RNFetchBlob.fetch('POST', 'https://www.rukamen.com/api/v1/signup', {
      Authorization : "Bearer access-token",
      // otherHeader : "foo",
      // 'Content-Type' : 'multipart/form-data',
    }, [
      { name : 'name', data : name},
      { name : 'email', data : email},
      { name : 'phone', data : phone},
      { name : 'password', data : password},
      { name : 'leads', data : HearSelected}
    ]).then((res) => {
      let text = res.text()
      let json = res.json()

      if(json.success){
        let UID123_object = json.userdata;

        AsyncStorage.setItem('userdata', JSON.stringify(UID123_object));
        this.setState({isLoading:true});
        onSignIn().then(() => this.props.navigation.navigate("SignedIn"));

      }else{
        alert(json.msg);
        this.setState({isLoading:true});
        return false;
      }

    }).catch((err) => {
      alert(err);
    })

  }

  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>

          <HeaderWithBack title='Sign Up' helpBtn={true} navigation={this.props.navigation} />

          <Content padder style={{backgroundColor:'#FFF'}}>
          <Text style={{fontSize: 30, color: '#999', marginTop: 20, fontFamily:'poppins'}}>CREATE ACCOUNT</Text>
            <Form>

              <FloatingLabelInput
                label="Your Name"
                value={this.state.name}
                onChangeText={(text) => this.setState({name:text})}
              />

              <FloatingLabelInput
                label="Email Address"
                ref={'emailAddress1'}
                type={'custom'}
                options={{ mask: '*********************************' }}
                underlineColorAndroid='transparent'
                value={this.state.email}
                onChangeText={(text) => this.setState({email:text})}
                keyboardType='email-address'
              />

              <FloatingLabelInput
                label="Phone"
                ref={'phoneNumber'}
                type={'cel-phone'}
                options={{ dddMask: '(9999) ' }}
                underlineColorAndroid='transparent'
                value={this.state.phone}
                onChangeText={(text) => this.setState({phone:text})}
              />

              <FloatingLabelInput
                label="Password"
                ref={'password'}
                type={'custom'}
                options={{ mask: '*************************' }}
                underlineColorAndroid='transparent'
                value={this.state.password}
                onChangeText={(text) => this.setState({password:text})}
                secureTextEntry={true}
              />

              <Item stackedLabel style={{paddingLeft: 0, marginLeft: 0, borderBottomColor: '#000'}}>
                <Label style={{color: '#666'}}>How did you hear about Saleshack?</Label>
                <Picker
                  enabled
                  iosHeader="Please Choose"
                  string="Please Choose"
                  mode="dialog"
                  style={Platform.OS === 'android' ? customStyles.aPickerInput : customStyles.iosPickerInput}
                  selectedValue={this.state.HearSelected}
                  onValueChange={this.onHearChange.bind(this)}
                >
                  <Picker.Item label="Social Media" value="social-media" />
                  <Picker.Item label="Forum" value="forum" />
                  <Picker.Item label="Property Website" value="website-property" />
                </Picker>
              </Item>
            </Form>
            <ButtonGradient
                colors={['#3db54a','#00af84']}
                style={{margin: 10,borderRadius: 30, marginTop: 30}}
            >  
            {(this.state.isLoading) ?
              <Button block disabled transparent
              >
                <Spinner color='#FFF' /><Text style={{fontWeight: 'bold',color:'#FFF'}}>PLEASE WAIT</Text>
              </Button>
              :
              <Button block transparent iconRight
              onPress={() => this._onPressRegister()}
              >
                <Text style={{fontWeight: 'bold',color:'#FFF'}}>Create Account</Text>
                <Icon name='ios-person-add' style={{color:'#FFF'}} />
              </Button>
            }
            </ButtonGradient>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Signin")}
              style={{marginTop: 10, marginBottom:30}}
            >
              <Text style={{color:'#999',textAlign:'center'}}>Already have an account? Sign In</Text>
            </TouchableOpacity>

          </Content>

        </Container>
      </StyleProvider>
    );
  }
}

export default Signup;


// <Text style={customStyles.formLabel}>Email Address</Text>
// <Item regular style={customStyles.formItem}>
//   <TextInputMask
//     ref={'emailAddress'}
//     type={'custom'}
//     options={{ mask: '*********************************' }}
//     style={customStyles.formItemInputMask}
//     underlineColorAndroid='transparent'
//     value={this.state.email}
//     onChangeText={(text) => this.setState({email:text})}
//     keyboardType='email-address'
//     placeholder='Email Address'
//     placeholderTextColor='#CCC'
//   />
// </Item>
// <Text style={customStyles.formLabel}>Phone</Text>
// <Item regular style={customStyles.formItem}>
//   <TextInputMask
//     ref={'phoneNumber'}
//     type={'cel-phone'}
//     options={{ dddMask: '(9999) ' }}
//     style={customStyles.formItemInputMask}
//     placeholder='Phone Number'
//     placeholderTextColor='#CCC'
//     underlineColorAndroid='transparent'
//     value={this.state.phone}
//     onChangeText={(text) => this.setState({phone:text})}
//   />
// </Item>
// <Text style={customStyles.formLabel}>Password</Text>
// <Item regular style={customStyles.formItem}>
//   <TextInputMask
//     ref={'password'}
//     type={'custom'}
//     options={{ mask: '********' }}
//     style={customStyles.formItemInputMask}
//     underlineColorAndroid='transparent'
//     value={this.state.password}
//     onChangeText={(text) => this.setState({password:text})}
//     placeholder='Password'
//     placeholderTextColor='#CCC'
//     secureTextEntry={true}
//   />
// </Item>
// <Text style={customStyles.formLabel}>How did you hear about Saleshack?</Text>
// <Item regular style={customStyles.pickerInputItem}>
//   <Picker
//     enabled
//     iosHeader="Please Choose"
//     string="Please Choose"
//     mode="dialog"
//     style={Platform.OS === 'android' ? customStyles.aPickerInput : customStyles.iosPickerInput}
//     selectedValue={this.state.HearSelected}
//     onValueChange={this.onHearChange.bind(this)}
//   >
//     <Picker.Item label="Social Media" value="social-media" />
//     <Picker.Item label="Forum" value="forum" />
//     <Picker.Item label="Property Website" value="website-property" />
//   </Picker>
// </Item>
