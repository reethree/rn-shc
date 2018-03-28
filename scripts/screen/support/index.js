// import React, { Component } from "react";
// import { StackNavigator } from "react-navigation";
//
// import Help from "./help";
// import Chat from "./chat";
//
// export default (SupportNav = StackNavigator({
//   Help: { screen: Help },
//   Chat: { screen: Chat }
// },{
//   mode: 'card',
//   headerMode: 'none',
// }));

import React, { Component } from "react";
import { Image, AsyncStorage, Alert, Linking, TouchableOpacity } from "react-native";
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
  Spinner
} from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';

import getTheme from '../../../native-base-theme/components';
import commonColor from '../../../native-base-theme/variables/commonColor';
const customStyles = require('../../Styles');

import { isSignedIn, onSignOut } from "../../Auth";

import ButtonGradient from '../../components/gradient/button';
import HeaderWithBack from '../../components/header/withBack';

import { NavigationActions } from 'react-navigation'

const ChatIcon = require('../../../assets/images/Chat.png');

class Help extends Component {

  constructor(props){
    super(props);
    this.state = {
      signedIn: false,
      checkedSignIn: false,
      chatUrl: 'whatsapp://send?phone=6281212123503&text=Saya%20membutuhkan%20bantuan',
      callUrl: 'tel:+6281212123503',
      mailUrl: 'mailto:info@rukamen.com?subject=Saya memerlukan bantuan menggunakan Aplikasi Saleshack&body=Tinggalkan Pesan Anda Disini...'
    };
  }

  componentWillMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert("An error occurred"));
  }

  handleOnlineChat() {
    Linking.canOpenURL(this.state.chatUrl).then(supported => {
      if (supported) {
        Linking.openURL(this.state.chatUrl);
      } else {
        alert("Cannot open Whatsapp.");
      }
    });
  }

  handlePhoneCall() {
    Linking.canOpenURL(this.state.callUrl).then(supported => {
      if (supported) {
        Linking.openURL(this.state.callUrl);
      } else {
        alert("Cannot open Phone Dial.");
      }
    });
  }

  handleMailTo() {
    Linking.canOpenURL(this.state.mailUrl).then(supported => {
      if (supported) {
        Linking.openURL(this.state.mailUrl);
      } else {
        alert("Cannot open Email.");
      }
    });
  }

  

  signOutAction(route) {
    // const resetAction = NavigationActions.reset({
    //   index: 0,
    //   actions: [
    //     NavigationActions.navigate({ routeName: route })
    //   ]
    // })
    // this.props.navigation.dispatch(resetAction)
    this.props.navigation.navigate(route)
  }

  render() {

    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>

          <HeaderWithBack title='Help' navigation={this.props.navigation} />

          <Content padder scrollEnabled={false}>

            {/* <View>
              <Image source={ChatIcon} style={customStyles.imageFullCenter} />
            </View> */}

            <View>
              <Grid>
                <Row>
                  <Col>
                    <ButtonGradient
                      colors={['#57cbf5','#5fa9dd']}
                      style={{margin: 10,borderRadius: 30}}
                    >   
                      <Button transparent block iconRight
                        onPress={() => this.handlePhoneCall()}
                      >
                        <Text style={{color:'white'}}>Call</Text>
                        <Icon name='md-call' style={{color:'white'}} />
                      </Button>
                    </ButtonGradient>
                  </Col>
                  <Col>
                    <ButtonGradient
                      colors={['#f7921e','#f15f36']}
                      style={{margin: 10,borderRadius: 30}}
                    >  
                      <Button transparent block iconRight
                        onPress={() => this.handleMailTo()}
                      >
                        <Text style={{color:'white'}}>Email</Text>
                        <Icon name='md-mail' style={{color:'white'}} />
                      </Button>
                    </ButtonGradient>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ButtonGradient
                      colors={['#59ba49','#009157']}
                      style={{margin: 10,borderRadius: 30}}
                    >  
                      <Button transparent block iconRight
                      // onPress={() => this.props.navigation.navigate('Conversation')}
                      onPress={() => this.handleOnlineChat()}
                      >
                        <Text style={{color:'white'}}>Whatsapp</Text>
                        <Icon name='logo-whatsapp' style={{color:'white'}} />
                      </Button>
                    </ButtonGradient>
                  </Col>
                </Row>
                <View
                  style={customStyles.sparator}
                />
                {(!this.state.checkedSignIn) ?
                  <Spinner color='black' /> : null
                }
                {(!this.state.signedIn) ?
                  <Row>
                    <Col>
                      <Text style={{textAlign: 'center', margin: 5, color: '#666'}}>Already have an account?</Text>
                    </Col>
                  </Row>
                  : null
                }
                {(!this.state.signedIn) ?
                  <Row>
                    <Col>
                      <Button block bordered rounded iconRight style={{borderColor: '#333', margin: 10}}
                        onPress={() => this.props.navigation.navigate("Signin")}
                      >
                        <Text style={{color: '#333'}}>
                            Sign In
                        </Text>
                        <Icon name='md-log-in' style={{color: '#333'}} />
                      </Button>

                      <Button block rounded iconRight style={{margin: 10, backgroundColor: '#ccc'}}
                      onPress={() => this.props.navigation.navigate("Signup")}
                      >
                        <Text style={{color: '#333'}}>
                            Sign Up
                        </Text>
                        <Icon name='md-person-add' style={{color: '#333'}} />
                      </Button>

                    </Col>
                  </Row>
                  :
                  <Row>
                    <Col>
                      <Button block bordered rounded iconRight style={{borderColor: '#333', margin: 10}}
                        onPress={() => {
                          onSignOut().then(() => this.signOutAction("SignedOut"));
                        }}
                      >
                        <Text style={{color: '#333'}}>Logout</Text>
                        <Icon name='md-log-out' style={{color: '#333'}} />
                      </Button>
                      <View style={{marginTop: 20}}>
                        <Text style={{color:'#666', fontSize: 12, textAlign: 'center'}}>Undang Teman Anda Untuk Mendapatkan Rp. 50.000,-</Text>
                        <ButtonGradient
                          colors={['#d3489a','#363795']}
                          style={{margin: 10,borderRadius: 30}}
                        >  
                          <Button transparent block iconRight
                            onPress={() => this.props.navigation.navigate('Invite')}
                          >
                            <Text style={{color:'white'}}>Invite A Friend</Text>
                            <Icon name='md-share' style={{color:'white'}} />
                          </Button>
                        </ButtonGradient>
                      </View>
                    </Col>
                  </Row>
                }
   
                <Row style={{marginTop: 30}}>
                  <Col>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate("BrowserPage", {page: 'privacy-policy', title: 'Privacy Policy'})}
                    >
                      <Text style={{textAlign: 'center', color: '#666', fontSize: 12}}>Privacy Policy</Text>
                    </TouchableOpacity>
                  </Col>
                  <Col>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate("BrowserPage", {page: 'terms-conditions', title: 'Term & Condition'})}
                    >
                      <Text style={{textAlign: 'center', color: '#666', fontSize: 12}}>Terms & Conditions</Text>
                    </TouchableOpacity>
                  </Col>
                </Row>
              </Grid>
            </View>

          </Content>

        </Container>
      </StyleProvider>
    );
  }
}

export default Help;
