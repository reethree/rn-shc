import React, { Component } from "react";
import { Platform, View } from 'react-native';
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
import { GiftedChat, Bubble, SystemMessage } from 'react-native-gifted-chat';

import HeaderWithBack from '../../components/header/withBack';

class Chat extends Component {

  constructor(props) {
    super(props);

    const { state } = this.props.navigation;

    this.socket = state.params.socket;

    this.state = {
      chat: [{
          emitter:state.params.emitter,
          receiver:state.params.receiver,
          message:"",
          date: new Date()
      }],
      message:"",
      messages: []
    };

    this.onSend = this.onSend.bind(this);

    this.socket.on('receiver', (message) => {
      var data = [{
         text: message.message[0].text,
         user: {
           _id: 2,
           name: state.params.receiver
         },
         createdAt: message.message[0].createdAt,
        _id: message.message[0]._id
      }]

      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, data),
        };
      });
    })

    this.renderBubble = this.renderBubble.bind(this);
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#ffffff',
          },
          right: {
            backgroundColor: '#fcb415',
          }
        }}
      />
    );
  }

  onSend(messages = []) {

     const { state } = this.props.navigation;

     this.setState((previousState) => {
       return {
         messages: GiftedChat.append(previousState.messages, messages),
       };
     });

     var objMessage = {
         emitter:state.params.emitter,
         receiver:state.params.receiver,
         message:messages,
     }
     this.socket.emit('send', objMessage)
   }

  // onSend(messages = []) {
  //   this.setState((previousState) => ({
  //     messages: GiftedChat.append(previousState.messages, messages),
  //   }));
  // }

  render() {
    return (
      <Container>

        <HeaderWithBack title='Chat' navigation={this.props.navigation} />

        <GiftedChat
          children={<Icon name={Platform.OS === 'ios' ? 'ios-send' : 'send'} style={{
              fontWeight: '900',
              fontSize: 36,
              backgroundColor: 'transparent',
              marginBottom: Platform.select({
                ios: 0,
                android: 6
              }),
              marginLeft: 5,
              marginRight: 10,
              color: Platform.select({
                ios:'#f8961d',
                android:'#f8961d'
              })
            }}
            />
          }
          containerStyle={{backgroundColor: "transparent"}}
          textInputStyle={{
            // Set border width.
             borderWidth: 1,

             // Set border Hex Color Code Here.
             borderColor: '#fff',
             marginRight: 5,
             paddingLeft: 10,
             paddingRight: 10,
            // Set border Radius.
             borderRadius: 10,

            //Set background color of Text Input.
             backgroundColor : "#ffffff"
          }}
          // onSend={(messages) => this.onSend(messages)}
          // messages={this.state.messages}
          messages={this.state.messages}
          onSend={this.onSend}
          user={{
            _id: 1,
          }}
          renderBubble={this.renderBubble}
        />

      </Container>
    );
  }
}

export default Chat;
