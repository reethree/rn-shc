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

class Forgot extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      isLoading: false
    }
  }

  _onPressReset() {
    Keyboard.dismiss();
    this.setState({isLoading:true});

    const { email } = this.state;

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    let emailText = this.state.email;

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

    RNFetchBlob.fetch('POST', 'https://www.rukamen.com/api/v1/reset_password', {
      Authorization : "Bearer access-token",
      // otherHeader : "foo",
      // 'Content-Type' : 'multipart/form-data',
    }, [
      { name : 'email', data : email}
    ]).then((res) => {
      let text = res.text()
      let json = res.json()

      if(json.success){
        Toast.show({
            text: json.msg,
            position: 'bottom',
            buttonText: 'OK',
            type: 'success'
        });
        this.setState({isLoading:false});

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

  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>

          <HeaderWithBack title='Reset Password' helpBtn={true} navigation={this.props.navigation} />

          <Content padder style={{backgroundColor:'#FFF'}}>
            <Text style={{fontSize: 20, color: '#999', marginTop: 20, fontFamily:'poppins'}}>RESET PASSWORD</Text>
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
            </Form>
            <ButtonGradient
                colors={['#3db54a','#00af84']}
                style={{margin: 10,marginTop: 30,borderRadius: 30}}
            >              
              {(this.state.isLoading) ?
                <Button block disabled transparent
                >
                  <Spinner color='#FFF' /><Text style={{fontWeight: 'bold', color:'#FFF'}}>PLEASE WAIT</Text>
                </Button>
                :
                <Button block transparent
                onPress={() => this._onPressReset()}
                >
                  <Text style={{fontWeight: 'bold', color:'#FFF'}}>Reset</Text>
                </Button>
              }
            </ButtonGradient>
          </Content>

        </Container>
      </StyleProvider>
    );
  }
}

export default Forgot;