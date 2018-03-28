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
import Spinner from 'react-native-loading-spinner-overlay';

class BrowserPage extends Component {

  constructor(props) {
     super(props);
     isLoading: false
     this.state = { uri: 'https://www.rukamen.com/saleshack/p/', visible: false };
  }

  render() {

    const { state } = this.props.navigation;

    return (
      <Container>

        <HeaderWithBack title={state.params.title} navigation={this.props.navigation} iconBack='md-close' helpBtn={false} />

        <Spinner
            visible={this.state.visible}
            textContent={'Please wait...'}
            textStyle={{ color: '#FFF' }}
        />
        <WebView
          onNavigationStateChange={this._onLoad}
          source={{uri: this.state.uri+state.params.page}}
          startInLoadingState={true}
          // onLoadStart={() => (this.showSpinner())}
          // onLoad={() => (this.hideSpinner())}
        />

      </Container>
    );
  }

  _onLoad(state) {
    // alert(state.url);
    // if (state.url.indexOf(BASEURL + '/auth/success') != -1) {
    //   let token = state.url.split("token=")[1];
    //   token = token.substring(0, token.length - 4);
    //   NavigationsActions.back();
    //   SessionActions.setSession(token);
    // }
  }
  showSpinner() {
      this.setState({ visible: true });
  }

  hideSpinner() {
      this.setState({ visible: false });
  }
}

export default BrowserPage;