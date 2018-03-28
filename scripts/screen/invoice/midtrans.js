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

import { NavigationActions } from 'react-navigation';

class Midtrans extends Component {

  constructor(props) {
     super(props);
     isLoading: false
     this.state = { uri: 'https://www.rukamen.com', visible: false };
  }

  redirectToDashboard(){
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Dashboard'})
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {

    const { state } = this.props.navigation;

    return (
      <Container>

        <HeaderWithBack title='Payment' navigation={this.props.navigation} iconBack='md-close' helpBtn={false} />

        <Spinner
            visible={this.state.visible}
            textContent={'Please wait...'}
            textStyle={{ color: '#FFF' }}
        />
        <WebView
          onNavigationStateChange={this._onNavigationStateChange.bind(this)}
          javaScriptEnabled = {true}
          domStorageEnabled = {true}
          source={{uri: state.params.redirect_url}}
          // source={{uri: 'https://www.rukamen.com/saleshack/payment/finish?order_id=0124004&status_code=200&transaction_status=pending'}}
          startInLoadingState={true}
          // onLoadStart={() => (this.showSpinner())}
          // onLoad={() => (this.hideSpinner())}
        />

      </Container>
    );
  }

  _onNavigationStateChange(webViewState) {
    // https://app.midtrans.com/snap/v2/vtweb/{snap_token}#/[select-payment,order-summary,credit-card]
    // alert(webViewState.url);
    // const { stateNav } = this.props.navigation;
    if (webViewState.url.indexOf('https://www.rukamen.com/saleshack/payment/backapps') != -1) {
      // alert('back to dashboard');
      // NavigationActions.navigate({ routeName: 'Dashboard'});

      // let token = state.url.split("token=")[1];
      // token = token.substring(0, token.length - 4);
      // NavigationActions.back();
      // SessionActions.setSession(token);
      // this.redirectToDashboard.bind(this);
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Dashboard', params: {initialPage : 1}})
        ]
      })
      this.props.navigation.dispatch(resetAction)
    }
  }
  showSpinner() {
      this.setState({ visible: true });
  }

  hideSpinner() {
      this.setState({ visible: false });
  }
}

export default Midtrans;
