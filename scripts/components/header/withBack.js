import React, { Component } from "react";
import {
  Header,
  Title,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body,
  StyleProvider
} from "native-base";

import getTheme from '../../../native-base-theme/components';
import commonColor from '../../../native-base-theme/variables/commonColor';

import { NavigationActions } from 'react-navigation';

class HeaderWithBack extends Component {

  goBack(refresh) {
    const { navigation } = this.props;
    navigation.goBack();
    navigation.state.params.onSelect({ selected: true });
  }

  redirectToDashboard(){
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Dashboard' })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Header
        style={{elevation: 0}}
        androidStatusBarColor="#f8961d"
        iosBarStyle="light-content"
        >
          <Left>
            {(this.props.reff == 'Dashboard') ?
              <Button
                transparent
                onPress={() => this.redirectToDashboard()}
              >
                <Icon name={(this.props.iconBack) ? this.props.iconBack : "md-arrow-back"} style={{ color: "#FFF" }} />
              </Button>
            : 
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}
                // onPress={this.goBack(this.props.refreshPage)}
              >
                <Icon name={(this.props.iconBack) ? this.props.iconBack : "md-arrow-back"} style={{ color: "#FFF" }} />
              </Button>
            }

          </Left>
          <Body>
            <Title style={{ color: "#FFF" }}>{this.props.title}</Title>
          </Body>
          {(this.props.helpBtn) ?
            <Right>
              <Button transparent iconLeft small
              onPress={() => this.props.navigation.navigate('Support')}
              >
                <Icon name="ios-information-circle-outline" style={{ color: "#FFF", fontSize: 30 }} />
              </Button>
            </Right>
          :
            <Right />
          }

        </Header>
      </StyleProvider>
    );
  }
}

export default HeaderWithBack;
