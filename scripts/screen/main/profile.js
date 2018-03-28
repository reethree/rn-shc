import React, { Component } from "react";
import { Image, View, StyleSheet, AsyncStorage, RefreshControl } from "react-native";
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
  Grid,
  Col
} from "native-base";

import RNFetchBlob from 'react-native-fetch-blob';

import getTheme from '../../../native-base-theme/components';
import commonColor from '../../../native-base-theme/variables/commonColor';

import LinearGradient from 'react-native-linear-gradient';
import HeaderWithBack from '../../components/header/withBack';

import { onSignOut } from "../../Auth";

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      name:'',
      userdata:[],
      avatar: {uri: 'https://www.buira.org/assets/images/shared/default-profile.png'}
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('userdata')
      .then(res => {
        if(res){
          let userdata = JSON.parse(res);
          this.setState({name:userdata.name, userdata:userdata})
          if(userdata.photo){
            this.setState({avatar:{uri: userdata.avatar}})
          }
        }
        this.setState({refreshing: false});
      })
      .catch(err => reject(err));
  }

  _onRefresh(){
      // alert('refresh');
      this.setState({refreshing: true});
      this.componentWillMount();
  }

  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>

        <HeaderWithBack title='Profile' navigation={this.props.navigation} helpBtn={true} />
          <View style={{flex: 0.5, backgroundColor: '#ffb600', justifyContent: 'center', alignItems: 'center'}}>
            <Thumbnail large source={this.state.avatar} />
            <Text style={{color: 'white', marginTop: 20, fontSize: 18}}>Welcome, {this.state.userdata.name}</Text>
          </View>
          <Content padder refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              title=""
              />
            }>

            <Grid style={{marginBottom: 20, marginTop: 20}}>
              <Col>
                <View style={{alignItems: 'center'}}>
                  <Text>Email</Text>
                  <Text note>{this.state.userdata.email}</Text>
                </View>
              </Col>
              <Col>
                <View style={{alignItems: 'center'}}>
                  <Text>Phone Number</Text>
                  <Text note>{this.state.userdata.phone}</Text>
                </View>
              </Col>
            </Grid>

            <Button block bordered rounded style={{borderColor: '#333', margin: 10}}
              onPress={() => this.props.navigation.navigate('EditProfile')}
            >
              <Text style={{color: '#333'}}>Edit Profile</Text>
            </Button>
            <Button block bordered rounded style={{borderColor: '#333', margin: 10}}
              onPress={() => this.props.navigation.navigate('PaymentHistory')}
            >
              <Text style={{color: '#333'}}>Payment History</Text>
            </Button>
          </Content>

        </Container>
      </StyleProvider>
    );
  }
}

export default Profile;
