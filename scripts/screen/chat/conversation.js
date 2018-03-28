import React, { Component } from "react";
import { Platform, View, AsyncStorage, TouchableHighlight, Linking } from 'react-native';
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

import SocketIOClient from 'socket.io-client';

import HeaderWithBack from '../../components/header/withBack';

class Conversation extends Component {

  constructor(props) {
     super(props);
     this.socket = SocketIOClient('http://192.168.1.107:8888', { transports: ['websocket'] });
     this.state = {
         users:[{id:1, nickname:"Loading..."}],
         userdata:[],
         name:'',
     };
  }

  componentDidMount() {
    AsyncStorage.getItem('userdata')
      .then(res => {
        if(res){
          let userdata = JSON.parse(res);
          this.socket.emit('join', userdata.name);
          this.socket.on('users', (messages) => {
            this.setState((previousState) => {
              return {
                users: messages,
              };
            });
          });
          this.setState({name:userdata.name, userdata:userdata})
        }
      })
      .catch(err => reject(err));
  }

  _goChat(receiver, emitter, socket ){

     this.props.navigation.navigate('Chat',{receiver: receiver, emitter: emitter, socket:this.socket})
     // this.props.navigator.push({ ident: "Chat", receiver, emitter, socket })
  }

  renderUsers(data, emitter, socket){
    var _goChat = this._goChat.bind(this)
    return data.map(function(data, index){
      if(data.nickname == emitter){
        return false
      }
        return (
          <View key={index}>
            <TouchableHighlight activeOpacity={0} underlayColor="#FFFFFF" onPress={() => _goChat(data.nickname, emitter, socket)}>
                <Text>{data.nickname}</Text>
            </TouchableHighlight>
          </View>
        )
    })
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
            <Title style={{ color: "#FFF" }}>Conversation</Title>
          </Body>
          <Right>
            <Button
            transparent
            // onPress={() => this.props.navigation.navigate('ZopimChat')}
            onPress={() => { Linking.openURL('https://api.whatsapp.com/send?phone=6281212123503&text=Saya%20membutuhkan%20bantuan')}}
            >
              <Icon name="ios-chatbubbles" />
            </Button>
          </Right>

        </Header>

        <Content padder style={{backgroundColor: '#FFF'}}>
          {this.renderUsers(this.state.users, this.state.name, this.socket)}
        </Content>

      </Container>
    );
  }
}

export default Conversation;
