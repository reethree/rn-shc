import React, { Component } from "react";
import { Image, View, StyleSheet, Platform, StatusBar, Dimensions } from "react-native";
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
  InputGroup,
  Input
} from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';

import getTheme from '../../../native-base-theme/components';
import commonColor from '../../../native-base-theme/variables/commonColor';

import ButtonGradient from '../../components/gradient/button';
import HeaderWithDrawer from '../../components/header';

import styles from './styles';

const bg = require('../../../assets/images/splash-bg.png');
const logo = require('../../../assets/images/v3/Saleshack-Logo.png');
const logoRumah = require('../../../assets/images/v3/Getting-Started.png');

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class Startedv3 extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (

        <StyleProvider style={getTheme(commonColor)}>
          <Container>
          <Header style={{backgroundColor:"#f8961d", elevation: 0}}
            androidStatusBarColor="#f8961d"
            iosBarStyle="light-content"
            >
              <Left style={{ flex: 1 }} />
              <Body style={{ flex: 1,  justifyContent: 'center', alignItems: 'center' }}>
                <View>
                  <Image source={logo} style={{width: 115, height: 20, resizeMode: "contain"}} />
                </View>
              </Body>
              <Right style={{ flex: 1 }}>
                <Button transparent
                onPress={() => this.props.navigation.navigate('Support')}
                >
                  <Icon name="ios-information-circle-outline" style={{fontSize: 30}} />
                </Button>
              </Right>

            </Header>
            <Content padder scrollEnabled={false} style={styles.background}>
              <View style={styles.background} >
                <View style={[styles.segitigaAtas, {alignSelf: 'center',width: 0,height: 0,backgroundColor: 'transparent',borderStyle: 'solid',}]} />
                <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, backgroundColor: '#FFF', height: 60, borderRadius: 8}}>

                  <Grid>
                    <Col size={1}>
                      <Icon name="ios-information-circle-outline" style={{fontSize: 35}} />
                    </Col>
                    <Col size={3}>
                      <Text style={{fontSize: 14, color: '#999'}}>Cara tercepat dan termudah memasarkan properti anda</Text>
                    </Col>
                  </Grid>
                </View>

                <Image source={logoRumah} style={Platform.OS === 'android' ? styles.aShadowRumah : styles.iosShadowRumah} />

              </View>
            </Content>

            <Footer padder style={{backgroundColor: '#fff', borderColor: 'transparent', height: 130}}>
              <View style={{marginTop: 10}}>
                <ButtonGradient
                  colors={['#3db54a','#00af84']}
                  style={{margin: 10,borderRadius: 30,width: deviceWidth-80}}
                >  
                <Button block
                transparent
                onPress={() => this.props.navigation.navigate("Walkthroughv2")}
                >
                  <Text style={{fontSize:16,fontWeight:'bold', color:'#FFF'}}>
                      Mulai Disini
                  </Text>
                </Button>
                </ButtonGradient>
                <Button transparent block
                onPress={() => this.props.navigation.navigate("Signin")}
                >
                  <Text style={{fontSize:12, color: '#999'}}>Sudah Punya Akun?</Text>
                </Button>
              </View>
            </Footer>

          </Container>
        </StyleProvider>
    );

  }
}

export default Startedv3;
