import React, { Component } from "react";
import { Image, AsyncStorage, Alert, Keyboard, Dimensions, TouchableOpacity } from "react-native";
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
  Spinner
} from "native-base";

import ButtonGradient from '../../components/gradient/button';

import { TextInputMask } from 'react-native-masked-text';
import RNFetchBlob from 'react-native-fetch-blob';

import getTheme from '../../../native-base-theme/components';
import commonColor from '../../../native-base-theme/variables/commonColor';
const customStyles = require('../../Styles');

import HeaderWithBack from '../../components/header/withBack';
import FloatingLabelInput from '../../components/input/floating';

import { NavigationActions } from 'react-navigation';

import { onSignIn } from "../../Auth";

const lockLogo = require('../../../assets/images/Lock.png');

class Signin extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false
    }
  }
  //
  // async _onValueChange(item, selectedValue) {
  //   try {
  //     await AsyncStorage.setItem(item, selectedValue);
  //   } catch (error) {
  //     console.log('AsyncStorage error: ' + error.message);
  //   }
  // }
  //
  // userLogin() {
  //
  //   try {
  //     AsyncStorage.setItem('id_token', '932uuhkjehr');
  //   } catch (error) {
  //     console.log('AsyncStorage error: ' + error.message);
  //   }
  //   Alert.alert(
  //     "Login Success!",
  //     "Click the button to get a Chuck Norris quote!"
  //   );
    // Actions.HomePage();

		// if (this.state.username && this.state.password) {
		// 	// TODO: localhost doesn't work. Get the IP address with ifconfig.
		// 	fetch("http://192.168.1.3:3001/sessions/create", {
		// 		method: "POST",
		// 		headers: {
		// 			'Accept': 'application/json',
		// 			'Content-Type': 'application/json'
		// 		},
		// 		body: JSON.stringify({
		// 			username: this.state.username,
		// 			password: this.state.password,
		// 		})
		// 	})
		// 	.then((response) => response.json())
		// 	.then((responseData) => {
		// 		this.onValueChange('id_token', responseData.id_token),
		// 		Alert.alert(
		// 			"Login Success!",
		// 			"Click the button to get a Chuck Norris quote!"
		// 		),
		// 		Actions.HomePage();
		// 	})
		// 	.done();
		// }
	// }

  _onPressLogin() {
    Keyboard.dismiss;
    this.setState({isLoading:true});

    const { email, password } = this.state;

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    let emailText = this.state.email;
    let passText = this.state.password;

    if(reg.test(emailText) === false){
      Toast.show({
        text: 'Email is Not Correct.',
        position: 'bottom',
        buttonText: 'OK',
        type: 'danger'
      });
      this.setState({email:emailText,isLoading:false})
      return false;
    }

    if(passText == ''){
      Toast.show({
        text: 'Password is required.',
        position: 'bottom',
        buttonText: 'OK',
        type: 'danger'
      });
      this.setState({password:passText,isLoading:false})
      return false;
    }

    RNFetchBlob.fetch('POST', 'https://www.rukamen.com/api/v1/signin', {
      Authorization : "Bearer access-token",
      // otherHeader : "foo",
      // 'Content-Type' : 'multipart/form-data',
    }, [
      { name : 'email', data : email},
      { name : 'password', data : password}
    ]).then((res) => {
      let text = res.text()
      let json = res.json()

      if(json.success){
        let UID123_object = json.userdata;

        AsyncStorage.setItem('userdata', JSON.stringify(UID123_object));
        this.setState({isLoading:false});
        onSignIn().then(() => this.props.navigation.navigate("SignedIn"));
        // onSignIn().then(() => this.redirectToDashboard());

      }else{
        Toast.show({
          text: json.msg,
          position: 'bottom',
          buttonText: 'OK',
          type: 'danger'
        });
        this.setState({isLoading:false});
        return false;
      }

    }).catch((err) => {
      alert(err);
    })

  }

  redirectToDashboard(){
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'SignedIn' })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>

          <HeaderWithBack title='Sign In' helpBtn={true} navigation={this.props.navigation} />

          <Content padder style={{backgroundColor:'#FFF'}}>
            <Text style={{fontSize: 30, color: '#999', marginTop: 20, fontFamily:'poppins'}}>SIGN IN</Text>
            <Form>

              <FloatingLabelInput
                label="Email Address"
                ref={'emailAddress'}
                type={'custom'}
                options={{ mask: '*********************************' }}
                underlineColorAndroid='transparent'
                value={this.state.email}
                onChangeText={(text) => this.setState({email:text})}
                keyboardType='email-address'
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

            </Form>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("ForgotPassword")}
              style={{marginTop: 30,marginBottom:30}}
            >
              <Text style={{color:'#999', fontSize: 13}}>Forgot Password ?</Text>
            </TouchableOpacity>
            <ButtonGradient
                colors={['#3db54a','#00af84']}
                style={{margin: 10,borderRadius: 30}}
            >              
              {(this.state.isLoading) ?
                <Button block disabled transparent
                >
                  <Spinner color='#FFF' /><Text style={{fontWeight: 'bold', color:'#FFF'}}>PLEASE WAIT</Text>
                </Button>
                :
                <Button block iconRight transparent
                onPress={() => this._onPressLogin()}
                >
                  <Text style={{fontWeight: 'bold', color:'#FFF'}}>Submit</Text>
                  <Icon name='ios-log-in' style={{color:'#FFF'}} />
                </Button>
              }
            </ButtonGradient>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Signup")}
              style={{marginTop: 10,marginBottom:30}}
            >
              <Text style={{color:'#999',textAlign:'center',fontSize: 13}}>Don't Have An Account? Sign Up</Text>
            </TouchableOpacity>
          </Content>

        </Container>
      </StyleProvider>
    );
  }
}

export default Signin;

// <Image source={lockLogo} style={{resizeMode: 'contain',alignSelf: 'center', marginBottom: 30,height: 120}} />
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
