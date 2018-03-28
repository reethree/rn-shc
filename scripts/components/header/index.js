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

class HeaderWithDrawer extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Header style={{elevation: 0}}
        hasTabs={this.props.hasTabs}
        androidStatusBarColor="#f8961d"
        iosBarStyle="light-content"
        >
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="ios-menu" style={{ color: "#FFF" }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "#FFF" }}>{this.props.title}</Title>
          </Body>
          <Right />

        </Header>
      </StyleProvider>
    );
  }
}

export default HeaderWithDrawer;
