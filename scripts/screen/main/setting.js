import React, { Component } from "react";
import { Image, View, StyleSheet, AsyncStorage } from "react-native";
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
  Thumbnail
} from "native-base";

import RNFetchBlob from 'react-native-fetch-blob';

import getTheme from '../../../native-base-theme/components';
import commonColor from '../../../native-base-theme/variables/commonColor';

import HeaderWithBack from '../../components/header/withBack';

import { onSignOut } from "../../Auth";

class Setting extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name:'',
      userdata:[]
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('userdata')
      .then(res => {
        if(res){
          let userdata = JSON.parse(res);
          this.setState({name:userdata.name, userdata:userdata})
        }
      })
      .catch(err => reject(err));
  }

  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>

          <HeaderWithBack title='Profile' navigation={this.props.navigation} helpBtn={true} />
          <Content padder>
            
            <Text>Welcome, {this.state.userdata.name}</Text>
            <Button block info
            onPress={() => {
              onSignOut().then(() => this.props.navigation.navigate("SignedOut"));
            }}
            >
              <Text>Logout</Text>
            </Button>

          </Content>

        </Container>
      </StyleProvider>
    );
  }
}

export default Setting;
