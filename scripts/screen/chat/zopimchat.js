import React, { Component } from "react";
import { Platform, View, AsyncStorage, TouchableHighlight, WebView } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  H3,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body
} from "native-base";

import HeaderWithBack from '../../components/header/withBack';

class ZopimChat extends Component {

  constructor(props) {
     super(props);
  }

  render() {
    return (
      <Container>

        <Header
        androidStatusBarColor="#f8961d"
        iosBarStyle="light-content"
        >
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="md-arrow-back" style={{ color: "#FFF" }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "#FFF" }}>Zopim Chat</Title>
          </Body>
          <Right />
        </Header>

        <WebView
          source={{uri: 'https://api.whatsapp.com/send?phone=6281212123503&text=Saya%20membutuhkan%20bantuan'}}
        />

      </Container>
    );
  }
}

export default ZopimChat;
