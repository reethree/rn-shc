'use strict';

import React, { Component } from "react";
import { Platform, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard, KeyboardAvoidingView } from 'react-native';
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
  Toast,
  Input
} from "native-base";

import { Grid, Col, Row } from "react-native-easy-grid";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import getTheme from '../../../native-base-theme/components';
import commonColor from '../../../native-base-theme/variables/commonColor';
const customStyles = require('../../Styles');

import uuid from 'uuid';
import { saveData, loadDataByKey } from '../../Store';
import { connectRealm } from 'react-native-realm';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import ButtonGradient from '../../components/gradient/button';
import HeaderWithBack from '../../components/header/withBack';

const jsonData = require('../../../assets/data/apartemenApps.json');

class StepOne extends Component {

  constructor(props) {
    super(props);
    this._content = '';
    this.state = {
      userdata: null,
      films: [],
      filmSelected: [],
      query: '',
      selectedApt: false,
      notFoundApt: false,
      sale: true,
      rent: false,
      address: '',
      district: '',
      city: '',
      wantTypes: [{label: 'Sell', value: 'jual'}, {label: 'Rent', value: 'sewa'}],
      wantValue: 'jual',
      wantValueIndex: 0,
    };
  }

  componentDidMount() {
    // fetch(`${API}/films/`).then(res => res.json()).then((json) => {
    //   const { results: films } = json;
    //   this.setState({ films });
    // });
    const { results: films } = jsonData;
    this.setState({ films });

    // var dataStore = loadDataByKey('randomKey');
    // console.log(dataStore);

    AsyncStorage.getItem('userdata')
      .then(res => {
        if(res){
          let userdata = JSON.parse(res);
          this.setState({userdata:userdata})
        }
      })
      .catch(err => reject(err));

  }

  findFilm(query) {
    if (query === '') {
      return [];
    }

    const { films } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return films.filter(film => film.name.search(regex) >= 0);
  }

  onUpdateModel() {
    Keyboard.dismiss();

    const { realm } = this.props;
    const { state } = this.props.navigation;
    let adsId = uuid.v4();

    if(state.params.property_type === 'apartment') {
      if(this.state.selectedApt == false) {
        Toast.show({
          text: 'Please select apartment name.',
          position: 'bottom',
          buttonText: 'OK',
          type: 'danger'
        });

        return false;
      }
      if(this.state.notFoundApt == true){
        if(this.state.query == '') {
          Toast.show({
            text: 'Apartment Name field cannot empty.',
            position: 'bottom',
            buttonText: 'OK',
            type: 'danger'
          });
          return false;
        }

        if(this.state.address == '') {
          Toast.show({
            text: 'Address field cannot empty.',
            position: 'bottom',
            buttonText: 'OK',
            type: 'danger'
          });
          return false;
        }

        if(this.state.city == '') {
          Toast.show({
            text: 'City field cannot empty.',
            position: 'bottom',
            buttonText: 'OK',
            type: 'danger'
          });
          return false;
        }
      }
    }else{
      if(this.state.address == '') {
        Toast.show({
          text: 'Address field cannot empty.',
          position: 'bottom',
          buttonText: 'OK',
          type: 'danger'
        });
        return false;
      }
      if(this.state.district == '') {
        Toast.show({
          text: 'District field cannot empty.',
          position: 'bottom',
          buttonText: 'OK',
          type: 'danger'
        });
        return false;
      }
      if(this.state.city == '') {
        Toast.show({
          text: 'City field cannot empty.',
          position: 'bottom',
          buttonText: 'OK',
          type: 'danger'
        });
        return false;
      }
    }

    var address = '';
    if(state.params.property_type === 'apartment'){
      if(this.state.notFoundApt){
        address = this.state.address;
      }else{
        const films = this.findFilm(this.state.query);
        const { meta } = films[0];
        address = meta.address;
      }
    }else{
      address = this.state.address;
    }

    realm.write(() => {
      realm.create('Item', {
        id: adsId,
        unique_id: this.state.userdata.unique_id,
        property_type: state.params.property_type,
        want_to: this.state.wantValue,
        property_name: this.state.query,
        address: address,
        district: this.state.district,
        city: this.state.city,
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
        name: this.state.userdata.name,
        phone: this.state.userdata.phone,
        email: this.state.userdata.email,
        status: '',
        postDate: new Date(),
        posted: false,
        category: 'Draft',
        invoice: ''
      }, true);
    });

    this.props.navigation.navigate("StepFive",{adsId: adsId});
  }

  static renderFilm(film) {
    const { meta } = film;
    return (
      <View>
        <Text style={customStyles.formLabel}>Alamat</Text>
        <Text style={customStyles.formLabelSub}>Address</Text>
        <Text style={{
          borderWidth: 2,
          borderColor: '#f8961d',
          backgroundColor: '#FFF',
          padding: 10,
          borderRadius: 5}}>{meta.address}</Text>
      </View>
    );
  }

  notFoundApt(a) {
    this.setState({
      notFoundApt: a,
      selectedApt: a
    })
  }

  ucfirst(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  scrollToAutocomplete(){
    this._content._root.scrollToPosition(0, 80, false);
  }

  render() {
    const { query } = this.state;
    const films = this.findFilm(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    const { state } = this.props.navigation;

    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>

          <HeaderWithBack title={this.ucfirst(state.params.property_type)} navigation={this.props.navigation} helpBtn={true} />
          <Content padder style={{backgroundColor: '#FFF'}} ref={c => {this._content = c}}>

            <Text style={customStyles.formLabel}>You want to Sell or Rent?</Text>
            <Text style={customStyles.formLabelSub}>Anda ingin Menjual atau Menyewakan?</Text>
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
                      buttonSizeWidth={100}
                      buttonSizeHeight={30}
                      buttonSizeRadius={30}
                      borderWidth={2}
                      buttonStyle={{}}
                      buttonWrapStyle={{marginRight: 20}}
                    />
                  </RadioButton>
                )
              })}
            </RadioForm>
            {(state.params.property_type === 'apartment') ?
              (this.state.notFoundApt) ? 
                <Form style={{marginBottom: 30}}>
                  <Text style={customStyles.formLabel}>Nama Apartemen</Text>
                  <Text style={customStyles.formLabelSub}>Apartment Name</Text>
                  <Item regular style={customStyles.formItem}>
                    <Input
                      style={customStyles.formItemInput}
                      value={this.state.query}
                      onChangeText={(text) => this.setState({query:text})}
                    />
                  </Item>
                  <TouchableOpacity
                    onPress={() => this.notFoundApt(false)}
                  >
                    <Text style={{fontSize: 13, padding: 5, color: '#FF0000'}}>Search From Apartment List</Text>
                  </TouchableOpacity> 
                  <Text style={customStyles.formLabel}>Alamat</Text>
                  <Text style={customStyles.formLabelSub}>Address</Text>
                  <Item regular style={customStyles.formItem}>
                    <Input
                      multiline={true}
                      blurOnSubmit={false}
                      onChangeText={(txt) => {
                          this.setState({ address: txt })
                      }}
                      value={this.state.address}
                      onSubmitEditing={() => {
                        if (!this.state.address.endsWith("\n")) {
                            let address = this.state.address;
                            address = address + "\n";
                            this.setState({ address: address })
                        }
                      }}
                      onContentSizeChange={(event) => {
                        this.setState({
                          text: event.nativeEvent.text,
                          height: event.nativeEvent.contentSize.height,
                        });
                      }}
                      style={[customStyles.formItemInput, {height: Math.max(100, this.state.height+20)}]}
                    />
                  </Item>
                  <Text style={customStyles.formLabel}>Kota</Text>
                  <Text style={customStyles.formLabelSub}>City</Text>
                  <Item regular style={customStyles.formItem}>
                    <Input
                      style={customStyles.formItemInput}
                      value={this.state.city}
                      onChangeText={(text) => this.setState({city:text})}
                      placeholder='e.g Jakarta Selatan'
                    />
                  </Item>
                </Form>
              :
                <Form style={{marginBottom: 30}}>
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
                    onFocus={() => this.scrollToAutocomplete()}
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
                  <TouchableOpacity
                    onPress={() => this.notFoundApt(true)}
                  >
                    <Text style={{fontSize: 13, padding: 5, color: '#FF0000'}}>Cannot Find Your Apartment ?</Text>
                  </TouchableOpacity>  
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
                </Form>
            :
              <Form style={{marginBottom: 30}}>
                <Text style={customStyles.formLabel}>Nama Komplek</Text>
                <Text style={customStyles.formLabelSub}>Complex Name</Text>
                <Item regular style={customStyles.formItem}>
                  <Input
                    style={customStyles.formItemInput}
                    value={this.state.query}
                    onChangeText={(text) => this.setState({query:text})}
                  />
                </Item>
                <Text style={customStyles.formLabel}>Alamat</Text>
                <Text style={customStyles.formLabelSub}>Address</Text>
                <Item regular style={customStyles.formItem}>
                  <Input
                    multiline={true}
                    blurOnSubmit={false}
                    onChangeText={(txt) => {
                        this.setState({ address: txt })
                    }}
                    value={this.state.address}
                    onSubmitEditing={() => {
                      if (!this.state.address.endsWith("\n")) {
                          let address = this.state.address;
                          address = address + "\n";
                          this.setState({ address: address })
                      }
                    }}
                    onContentSizeChange={(event) => {
                      this.setState({
                        text: event.nativeEvent.text,
                        height: event.nativeEvent.contentSize.height,
                      });
                    }}
                    style={[customStyles.formItemInput, {height: Math.max(100, this.state.height+20)}]}
                  />
                </Item>
                <Text style={customStyles.formLabel}>Daerah</Text>
                <Text style={customStyles.formLabelSub}>District</Text>
                <Item regular style={customStyles.formItem}>
                  <Input
                    style={customStyles.formItemInput}
                    value={this.state.district}
                    onChangeText={(text) => this.setState({district:text})}
                    placeholder='e.g Senayan, Kebayoran Baru'
                  />
                </Item>
                <Text style={customStyles.formLabel}>Kota</Text>
                <Text style={customStyles.formLabelSub}>City</Text>
                <Item regular style={customStyles.formItem}>
                  <Input
                    style={customStyles.formItemInput}
                    value={this.state.city}
                    onChangeText={(text) => this.setState({city:text})}
                    placeholder='e.g Jakarta Selatan'
                  />
                </Item>
              </Form>
            }
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

// export default StepOne;
export default connectRealm(StepOne, {
  schemas: ['Item'],
  mapToProps(results, realm) {
    return {
      realm,
      items: results.items || [],
    };
  },
});