import React, { Component } from "react";
import { Image, AsyncStorage, Alert, Linking, Share, TouchableOpacity, Clipboard } from "react-native";
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
  View,
  Spinner,
  Item,
  Input,
  Toast
} from "native-base";

import LinearGradient from 'react-native-linear-gradient';

import getTheme from '../../../native-base-theme/components';
import commonColor from '../../../native-base-theme/variables/commonColor';
const customStyles = require('../../Styles');

import ButtonGradient from '../../components/gradient/button';
import HeaderWithBack from '../../components/header/withBack';

import { NavigationActions } from 'react-navigation'

const mail = require('../../../assets/images/Mail.png');

class Invite extends Component {

  constructor(props){
    super(props);
    this.state = {
        unique_id: null,
        userdata: [],
        codeUrl: null
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('userdata')
      .then(res => {
        if(res){
          let userdata = JSON.parse(res);
          this.setState({unique_id:userdata.unique_id, userdata:userdata, codeUrl:'http://saleshack.id/'+userdata.unique_id})
        }
      })
      .catch(err => reject(err));
  }

  writeToClipboard = async () => {
    await Clipboard.setString(this.state.codeUrl);
    Toast.show({
      text: 'Copied to Clipboard!',
      position: 'bottom',
      duration: 3000
    })
  };

  showShare = () => {
    Share.share({
      message: 'Teman anda mengajak anda untuk ikut menggunakan jasa Saleshack, Kilk link : http://saleshack.id/'+this.state.unique_id,
      url: this.state.codeUrl,
      title: 'Invite a Friend'
    }, {
      // Android only:
      dialogTitle: 'Saleshack Invitation Code',
      // iOS only:
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ]
    })
  };

  render() {

    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>

          <HeaderWithBack title='Invite a Friend' navigation={this.props.navigation} iconBack='md-close' helpBtn={false} />

          <View style={{flex: 1, backgroundColor: '#ffb600', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18, margin: 20, textAlign: 'center'}}>
                Terimakasih Telah Menggunakan Jasa Saleshack
            </Text>
            <Image source={mail} />
            <Text style={{margin: 20, fontSize: 14, textAlign: 'center'}}>
            Ayo undang teman Anda dan dapatkan voucher pulsa Rp. 50.000,- untuk setiap transaksi teman Anda yang telah menggunakan jasa SalesHack.
            </Text>
          </View>

          <Content padder scrollEnabled={false}>
                
            <View style={{margin: 30}}>
                <Item rounded>
                    <Input value={this.state.codeUrl} style={{paddingLeft: 15}} />
                    <TouchableOpacity
                        onPress={this.writeToClipboard}
                    >
                        <Icon active name='md-copy' style={{paddingRight: 15}} />
                    </TouchableOpacity>
                </Item>
                <ButtonGradient
                    colors={['#3db54a','#00af84']}
                    style={{borderRadius: 30, marginTop: 10}}
                >
                <Button block transparent
                    onPress={() => this.showShare()}
                >
                    <Text style={{fontWeight: 'bold', color: '#FFF'}}>Share Your Code</Text>
                </Button>
                </ButtonGradient>
            </View>

          </Content>

        </Container>
      </StyleProvider>
    );
  }
}

export default Invite;
