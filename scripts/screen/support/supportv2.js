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
import { Image, AsyncStorage, Alert, Linking } from "react-native";
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
  Card,
  CardItem
} from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';

import LinearGradient from 'react-native-linear-gradient';

import getTheme from '../../../native-base-theme/components';
import commonColor from '../../../native-base-theme/variables/commonColor';
const customStyles = require('../../Styles');

import { isSignedIn, onSignOut } from "../../Auth";

import HeaderWithBack from '../../components/header/withBack';

import { NavigationActions } from 'react-navigation'

const ChatIcon = require('../../../assets/images/Chat.png');

class Supportv2 extends Component {

  constructor(props){
    super(props);
    this.state = {
      signedIn: false,
      checkedSignIn: false,
      chatUrl: 'whatsapp://send?phone=6281212123503&text=Saya%20membutuhkan%20bantuan'
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

          <HeaderWithBack title='Support' navigation={this.props.navigation} />

          <Content padder scrollEnabled={false}>

            <View>
              <Grid>
                <Row>
                  <Col>
                    <Button info rounded block iconRight style={{margin: 10}}
                    >
                      <Text>Call</Text>
                      <Icon name='md-call' />
                    </Button>
                  </Col>
                  <Col>
                    <Button primary rounded block iconRight style={{margin: 10}}
                    >
                      <Text>Email</Text>
                      <Icon name='md-mail' />
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button block rounded iconRight style={{margin: 10, backgroundColor:'#FFF'}}
                        onPress={() => this.handleOnlineChat()}
                    >
                        <Text style={{fontFamily: 'poppins', color:'#000'}}>
                            Online Chat
                        </Text>
                        <Icon name='md-text' style={{color:'#000'}} />
                    </Button>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Button transparent dark block iconRight style={{margin: 10}}
                    >
                      <Text style={{color:'#FFF'}}>Term Of Use</Text>
                    </Button>
                  </Col>
                  <Col>
                    <Button transparent dark block style={{margin: 10}}
                    >
                      <Text style={{color:'#FFF'}}>Privacy Policy</Text>
                    </Button>
                  </Col>
                </Row>

                <Card>
                    <CardItem>
                        <Body>

                        {(!this.state.checkedSignIn) ?
                        <Spinner color='black' /> : <Text></Text>
                        }
                        {(!this.state.signedIn) ?
                        <Row>
                            <Col>
                            <Text style={{textAlign: 'center', margin: 5, color: '#666'}}>Already have an account?</Text>
                            </Col>
                        </Row>
                        : <Text></Text>
                        }
                        {(!this.state.signedIn) ?
                        <Row>
                            <Col>
                                <LinearGradient
                                    colors={['#3db54a','#00af84']}
                                    start={{ x: 1, y: 0 }}
                                    end={{ x: 0, y: 1 }}
                                    style={{margin: 10,borderRadius: 30}}
                                >                       
                                <Button block transparent iconRight
                                onPress={() => this.props.navigation.navigate("Signin")}
                                >
                                    <Text style={{fontFamily: 'poppins', color: '#FFF'}}>
                                        Sign In
                                    </Text>
                                    <Icon name='ios-log-in' style={{ color: '#FFF' }} />
                                </Button>
                            </LinearGradient>
                            </Col>
                        </Row>
                        :
                        <Row>
                            <Col>
                            <Button block rounded danger iconRight style={{margin: 10}}
                            onPress={() => {
                                onSignOut().then(() => this.signOutAction("SignedOut"));
                            }}
                            >
                                <Text>LOGOUT</Text>
                                <Icon name='ios-log-out' />
                            </Button>
                            </Col>
                        </Row>
                        }
                        {(!this.state.signedIn) ?
                        <Row>
                            <Col>
                            <Text style={{textAlign: 'center', margin: 5, color: '#666'}}>Or</Text>
                            </Col>
                        </Row>
                        : <Text></Text>
                        }
                        {(!this.state.signedIn) ?
                        <Row>
                            <Col>
                                <Button block rounded bordered dark iconRight 
                                style={{margin: 10, backgroundColor:'#FFF',borderColor: '#333'}}
                                onPress={() => this.props.navigation.navigate("Signup")}
                                >
                                    <Text style={{fontFamily: 'poppins', color:'#000'}}>
                                        Sign Up
                                    </Text>
                                    <Icon name='ios-person-add' style={{color:'#000'}} />
                                </Button>
                            </Col>
                        </Row>
                        : <Text></Text>
                        }

                        </Body>
                    </CardItem>
                </Card>

              </Grid>
            </View>

          </Content>

        </Container>
      </StyleProvider>
    );
  }
}

export default Supportv2;
