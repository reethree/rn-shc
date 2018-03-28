import React, { Component } from 'react';
import {
  View,
  StatusBar,
  TextInput,
  Animated,
  Dimensions,
  Platform
} from 'react-native';
import { Item, Input } from "native-base";

import { TextInputMask } from 'react-native-masked-text';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class FloatingLabelInput extends Component {
  state = {
    isFocused: false,
  };

  componentWillMount() {
    this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
  }

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
      duration: 150,
    }).start();
  }

  render() {
    let topOutputRange = [];

    {(this.props.options) ?
      topOutputRange = Platform.OS == 'ios' ? [0, -10] : [25, 0]
    :
      topOutputRange = [25, 0]
    }

    const { label, ...props } = this.props;
    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        // outputRange: [0, -10],
        // outputRange: [25, 0],
        outputRange: topOutputRange
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 14],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#CCC', '#666'],
      }),
    };

    return (
      <View style={{ paddingTop: Platform.OS == 'ios' ? 10 : 10, marginTop: Platform.OS == 'ios' ? 20 : 10 }}>
        <Animated.Text style={labelStyle}>
          {label}
        </Animated.Text>
        {(this.props.options) ?
          <TextInputMask
            {...props}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            style={{paddingBottom: Platform.OS == 'ios' ? 5 : null, width:deviceWidth-20,color:'#000',fontSize:18,borderBottomWidth:1,borderBottomColor:'#999'}}
            blurOnSubmit
          />
          :
          <Input
            {...props}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            style={{ width:deviceWidth-20,color:'#000',fontSize:18,borderBottomWidth:1,borderBottomColor:'#999'}}
            blurOnSubmit
          />
        }

      </View>
    );
  }
}

export default FloatingLabelInput;
