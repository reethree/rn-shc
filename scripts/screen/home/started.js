import React, { Component } from "react";
import { Image, View, StyleSheet, Platform, StatusBar } from "react-native";
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

import HeaderWithDrawer from '../../components/header';

import styles from './styles';

const bg = require('../../../assets/images/splash-bg.png');
const logo = require('../../../assets/images/Saleshack.png');
const logoRumah = require('../../../assets/images/Rumah.png');

class Started extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (

        <StyleProvider style={getTheme(commonColor)}>
          <Container>
          <Header style={{backgroundColor:"#fcb415", elevation: 0}}
            androidStatusBarColor="#f8961d"
            iosBarStyle="light-content"
            >
              <Right>
                <Button iconRight small style={{backgroundColor: '#5ac7da'}}
                onPress={() => this.props.navigation.navigate('Support')}
                >
                  <Text style={{fontSize: 12, fontWeight: 'bold'}}>Help</Text>
                  <Icon name="ios-information-circle-outline" />
                </Button>
              </Right>

            </Header>
            <Content scrollEnabled={false} style={styles.background}>
              <View style={styles.background} >

                <Image source={logo} style={Platform.OS === 'android' ? styles.aShadow : styles.iosShadow} />

                <Image source={logoRumah} style={Platform.OS === 'android' ? styles.aShadowRumah : styles.iosShadowRumah} />

                <Text style={{alignSelf: 'center', textAlign: 'center', marginTop: 30}}>CARA CEPAT MEMASARKAN PROPERTI ANDA</Text>

              </View>
            </Content>

            <Footer padder style={{backgroundColor: '#f8961d', borderColor: 'transparent', height: 65}}>
              <Grid>
                <Col>
                    <Button block info
                    style={styles.loginBtn}
                    onPress={() => this.props.navigation.navigate("Walkthrough")}
                    >
                      <Text style={{fontSize:13,fontWeight:'bold'}}>
                          WHY SALESHACK?
                      </Text>
                    </Button>
                </Col>
                <Col>
                    <Button block danger iconRight
                    style={styles.loginBtn}
                    onPress={() => this.props.navigation.navigate("Signin")}
                    >
                      <Text style={{fontSize:13,fontWeight: 'bold'}}>
                          SIGN IN
                      </Text>
                      <Icon name='ios-log-in' />
                    </Button>
                </Col>
              </Grid>
            </Footer>

          </Container>
        </StyleProvider>
    );

    // return (
    //   <StyleProvider style={getTheme(commonColor)}>
    //     <Container>
    //
    //       <HeaderWithDrawer title='Getting Started' navigation={this.props.navigation} />
    //
    //       <Content padder>
    //
    //         <Button block info
    //         onPress={() => this.props.navigation.navigate("Signup")}
    //         >
    //           <Text>Getting Started</Text>
    //         </Button>
    //
    //       </Content>
    //
    //     </Container>
    //   </StyleProvider>
    // );
  }
}

export default Started;
