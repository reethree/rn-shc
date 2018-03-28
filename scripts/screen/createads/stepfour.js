import React, { Component } from "react";
import { Platform, View, Image, TextInput, TouchableOpacity, AsyncStorage, StyleSheet, Keyboard } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  StyleProvider,
  Item,
  Form,
  Footer,
  Picker,
  Input,
  Radio
} from "native-base";

import { Grid, Col, Row } from "react-native-easy-grid";

import getTheme from '../../../native-base-theme/components';
import commonColor from '../../../native-base-theme/variables/commonColor';
const customStyles = require('../../Styles');

import ButtonGradient from '../../components/gradient/button';
import HeaderWithBack from '../../components/header/withBack';

import { TextInputMask } from 'react-native-masked-text';

import KeyboardSpacer from 'react-native-keyboard-spacer';

import { connectRealm } from 'react-native-realm';

class StepFour extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      email: ''
    };
  }

  componentDidMount() {
    const { realm } = this.props;
    const { state } = this.props.navigation;
    let draft = realm.objects('Item').filtered('id = "'+state.params.adsId+'"');
    if(draft.length > 0){
      let loadData = draft[0];
      this.setState({
        name: loadData.name,
        phone: loadData.phone,
        email: loadData.email
      });
    }
  }

  onUpdateModel() {
    Keyboard.dismiss();

    const { realm } = this.props;
    const { state } = this.props.navigation;

    realm.write(() => {
      realm.create('Item', {
        id: state.params.adsId,
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email
      }, true);
    });

    this.props.navigation.navigate("StepPreview",{adsId: state.params.adsId});
  }

  render() {
    const {state} = this.props.navigation;

    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>

          <HeaderWithBack title='Informasi Kontak' navigation={this.props.navigation} helpBtn={true} />
          <Content padder style={{backgroundColor: '#FFF'}}>
            <Form>

              <Text style={customStyles.formLabel}>Nama</Text>
              <Text style={customStyles.formLabelSub}>Name</Text>
              <Item regular style={customStyles.formItem}>
                <Input
                  style={customStyles.formItemInput}
                  value={this.state.name}
                  onChangeText={(text) => this.setState({name:text})}
                />
              </Item>

              <Text style={customStyles.formLabel}>Nomor Telepon</Text>
              <Text style={customStyles.formLabelSub}>Phone Number</Text>
              <Item regular style={customStyles.formItem}>
                <TextInputMask
                  ref={'phoneNumber'}
                  type={'cel-phone'}
                  options={{ dddMask: '(9999) ' }}
                  style={customStyles.formItemInputMask}
                  underlineColorAndroid='transparent'
                  value={this.state.phone}
                  onChangeText={(text) => this.setState({phone:text})}
                />
              </Item>

              <Text style={customStyles.formLabel}>Alamat Email</Text>
              <Text style={customStyles.formLabelSub}>Email Address</Text>
              <Item regular style={customStyles.formItem}>
                <TextInputMask
                  ref={'emailAddress'}
                  type={'custom'}
                  options={{ mask: '*********************************' }}
                  style={customStyles.formItemInputMask}
                  underlineColorAndroid='transparent'
                  value={this.state.email}
                  onChangeText={(text) => this.setState({email:text})}
                />
              </Item>

            </Form>

          </Content>
          <Footer padder style={{backgroundColor: '#fff', borderColor: 'transparent', height: 65}}>
            <ButtonGradient
              colors={['#3db54a','#00af84']}
              style={customStyles.footerBtn}
            >
              <Button block transparent
              onPress={() => this.onUpdateModel()}
              >
                <Text style={{fontWeight: 'bold', color: '#FFF'}}>Next</Text>
              </Button>
            </ButtonGradient>
          </Footer>
        </Container>
      </StyleProvider>
    );
  }
}

// export default StepFour;
export default connectRealm(StepFour, {
  schemas: ['Item'],
  mapToProps(results, realm) {
    return {
      realm,
      items: results.items || [],
    };
  },
});
