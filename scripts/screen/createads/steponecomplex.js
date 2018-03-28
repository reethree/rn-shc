'use strict';

import React, { Component } from "react";
import { Platform, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
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
  ListItem,
  Right,
  Radio,
  Toast
} from "native-base";

import { Grid, Col, Row } from "react-native-easy-grid";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import getTheme from '../../../native-base-theme/components';
import commonColor from '../../../native-base-theme/variables/commonColor';
const customStyles = require('../../Styles');

import uuid from 'uuid';
import { connectRealm } from 'react-native-realm';

import HeaderWithBack from '../../components/header/withBack';

const jsonData = require('../../../assets/data/city.json');

class StepOneComplex extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      citySelected: [],
      query: '',
      selectedApt: false,
      sale: true,
      rent: false,
      address: '',
      wantTypes: [{label: 'Sell', value: 'Sell'}, {label: 'Rent', value: 'Rent'}],
      wantValue: '',
      wantValueIndex: 0,
    };
  }

  // toggleSale() {
  //   this.setState({
  //     sale: true,
  //     radio2: false
  //   });
  // }
  //
  // toggleRent() {
  //   this.setState({
  //     sale: false,
  //     rent: true
  //   });
  // }

  componentDidMount() {
    // fetch(`${API}/films/`).then(res => res.json()).then((json) => {
    //   const { results: films } = json;
    //   this.setState({ films });
    // });
    const { results: cities } = jsonData;
    this.setState({ cities });

    // var dataStore = loadDataByKey('randomKey');
    // console.log(dataStore);

  }

  findCity(query) {
    if (query === '') {
      return [];
    }

    const { cities } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return cities.filter(city => city.name.search(regex) >= 0);
  }

  onUpdateModel() {
    Keyboard.dismiss;

    const { realm } = this.props;
    const films = this.findFilm(this.state.query);

    if(this.state.selectedApt == false) {

        Toast.show({
          text: 'Please select apartment name.',
          position: 'bottom',
          buttonText: 'OK',
          type: 'danger'
        });

        return false;
    }

    const { meta } = cities[0];
    const { state } = this.props.navigation;
    let adsId = uuid.v4();

    realm.write(() => {
      realm.create('Item', {
        id: adsId,
        property_type: state.params.property_type,
        want_to: this.state.wantValue,
        property_name: this.state.query,
        address: meta.address,
        district: '',
        city: '',
        bedroom: '',
        bathroom: '',
        parking: '',
        size: '',
        lot_area: '',
        floor_area: '',
        land_line: '',
        electrical_power: '',
        condition: '',
        tower: '',
        floor: '',
        view: '',
        certificate: '',
        summary: '',
        facilities: '',
        curr: '',
        selling_price: '',
        price_per_year: '',
        price_per_month: '',
        minRent: '',
        name: '',
        phone: '',
        email: ''
      }, true);
    });

    this.props.navigation.navigate("StepFive",{adsId: adsId});
  }

  render() {
    const { query } = this.state;
    const films = this.findFilm(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    const { state } = this.props.navigation;

    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>

          <HeaderWithBack title={state.params.property_type} navigation={this.props.navigation} helpBtn={true} />
          <Content padder style={{backgroundColor: '#FFF'}}>
            <RadioForm formHorizontal={true} animation={true}>
              {this.state.wantTypes.map((obj, i) => {
                var onPress = (value, index) => {
                    this.setState({
                      wantValue: value,
                      wantValueIndex: index
                    })
                  }
                return (
                  <RadioButton labelHorizontal={true} key={i} >
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={this.state.wantValue === obj.value}
                      onPress={onPress}
                      buttonInnerColor={'#fcb415'}
                      buttonOuterColor={'#fcb415'}
                      buttonSize={15}
                      buttonStyle={{}}
                      buttonWrapStyle={{marginRight: 5}}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      onPress={onPress}
                      labelStyle={{color: '#000', marginRight: 50}}
                      labelWrapStyle={{}}
                    />
                  </RadioButton>
                )
              })}
            </RadioForm>

            <Form>
              <Text style={customStyles.formLabel}>Nama Apartemen</Text>
              <Text style={customStyles.formLabelSub}>Apartment Name</Text>
              <Autocomplete
                ref="query"
                autoCapitalize="none"
                inputContainerStyle={customStyles.formItem}
                listContainerStyle={{borderWidth: 1, borderBottomWidth: 0, borderColor: '#EEE'}}
                autoCorrect={false}
                data={films.length === 1 && comp(query, films[0].name) ? [] : films}
                defaultValue={query}
                onChangeText={text => this.setState({ query: text, selectedApt: false })}
                placeholder="Please Select Apartment"
                renderItem={({ name }) => (
                  <TouchableOpacity onPress={() => this.setState({ query: name, selectedApt: true, errorMessage: '' })}>
                    <Text style={{
                      padding: 10,
                      borderBottomWidth: 1,
                      borderColor: '#EEE'}}>
                      {name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </Form>

            <View>
              {(this.state.selectedApt) ? (
                StepOne.renderFilm(films[0])
              ) : (
                <View>
                  <Text style={customStyles.formLabel}>Alamat</Text>
                  <Text style={customStyles.formLabelSub}>Address</Text>
                  <Text style={{
                    borderWidth: 2,
                    borderColor: '#f8961d',
                    backgroundColor: '#FFF',
                    padding: 10,
                    height: 200,
                    borderRadius: 5}}></Text>
                </View>
              )}
            </View>

          </Content>
          <Footer padder style={{backgroundColor: '#f8961d', borderColor: 'transparent', height: 65}}>

              <Button block success iconRight style={customStyles.footerBtn}
              onPress={() => this.onUpdateModel()}
              >
                <Text style={{fontWeight: 'bold'}}>NEXT</Text>
                <Icon name='ios-arrow-dropright' />
              </Button>

          </Footer>
        </Container>
      </StyleProvider>
    );
  }
}

// export default StepOne;
export default connectRealm(StepOneComplex, {
  schemas: ['Item'],
  mapToProps(results, realm) {
    return {
      realm,
      items: results.items || [],
    };
  },
});
