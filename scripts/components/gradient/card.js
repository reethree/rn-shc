import React, { Component } from "react";
import { Image, View, StyleSheet, Platform } from "react-native";
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
import LinearGradient from 'react-native-linear-gradient';

class CardGradientComponent extends Component {

  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <LinearGradient
            colors={this.props.colors}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={[this.props.style,{borderRadius: 3, padding: 20, margin: 10, flex: 1,  justifyContent: 'center', alignItems: 'center'}]}
        >              
          {this.props.children}
        </LinearGradient>
      </StyleProvider>
    );
  }
}

export default CardGradientComponent;