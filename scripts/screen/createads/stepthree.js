import React, { Component } from "react";
import { Platform, View, TextInput, TouchableOpacity, AsyncStorage, StyleSheet, Keyboard } from 'react-native';
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
  Radio,
  Textarea
} from "native-base";

import { Grid, Col, Row } from "react-native-easy-grid";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import getTheme from '../../../native-base-theme/components';
import commonColor from '../../../native-base-theme/variables/commonColor';
const customStyles = require('../../Styles');

import ButtonGradient from '../../components/gradient/button';
import HeaderWithBack from '../../components/header/withBack';

import CheckBox from 'react-native-check-box';
import { TextInputMask } from 'react-native-masked-text';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { connectRealm } from 'react-native-realm';

class StepThree extends Component {

  constructor (props) {
    super(props);
    this.state = {
      addFacilityText: '',
      currIdr: true,
      currUsd: false,
      want_to: '',
      summary: '',
      sellingPrice: 0,
      pricePerMonth: 0,
      pricePerYear: 0,
      height: 0,
      types2: [{label: '1 Month', value: '1'}, {label: '6 Month', value: '6'}, {label: '1 Year', value: '12'}],
      minimumValue: '',
      minimumValueIndex: 0,
      types3: [{label: 'IDR', value: 'IDR'}, {label: 'USD', value: 'USD'}],
      currValue: '',
      currValueIndex: 0,
      checkboxData: [
        {
          "path": "TV",
          "name": "TV",
          "checked": false
        },
        {
          "path": "Cable TV",
          "name": "Cable TV",
          "checked": false
        },
        {
          "path": "Air Conditioning",
          "name": "Air Conditioning",
          "checked": false
        },
        {
          "path": "Kitchen",
          "name": "Kitchen",
          "checked": false
        },
        {
          "path": "Internet",
          "name": "Internet",
          "checked": false
        },
        {
          "path": "Wireless Internet",
          "name": "Wireless Internet",
          "checked": false
        },
        {
          "path": "Washing Machine",
          "name": "Washing Machine",
          "checked": false
        },
        {
          "path": "Service Area",
          "name": "Service Area",
          "checked": false
        }
      ]
    }
  }

  componentWillMount() {
    const { realm } = this.props;
    const { state } = this.props.navigation;
    let draft = realm.objects('Item').filtered('id = "'+state.params.adsId+'"');
    if(draft.length > 0){
      let loadData = draft[0];
      var facilitiesData = this.state.checkboxData;
      if(loadData.facilities){
        facilitiesData = JSON.parse(loadData.facilities);
      }

      this.setState({
        want_to: loadData.want_to,
        summary: loadData.summary,
        checkboxData: facilitiesData,
        currValue: loadData.curr,
        sellingPrice: loadData.selling_price,
        pricePerMonth: loadData.price_per_month,
        pricePerYear: loadData.price_per_year,
        minimumValue: loadData.minRent
      });
    }
  }

  onClickCheckBox(data) {
      data.checked = !data.checked;
      // let msg = data.checked ? 'you checked ':'you unchecked '
      // alert(msg+data.name);
  }

  renderCheckBoxView() {
      if (!this.state.checkboxData || this.state.checkboxData.length === 0)return;
      var len = this.state.checkboxData.length;
      var views = [];
      for (var i = 0, l = len - 2; i < l; i += 2) {
          views.push(
              <View key={i}>
                  <View style={{flexDirection: 'row'}}>
                      {this.renderCheckBox(this.state.checkboxData[i])}
                      {this.renderCheckBox(this.state.checkboxData[i + 1])}
                  </View>
                  <View style={{flex: 1,height: 0.3,backgroundColor: 'transparent'}}/>
              </View>
          )
      }
      views.push(
          <View key={len - 1}>
              <View style={{flexDirection: 'row'}}>
                  {len % 2 === 0 ? this.renderCheckBox(this.state.checkboxData[len - 2]) : null}
                  {this.renderCheckBox(this.state.checkboxData[len - 1])}
              </View>
          </View>
      )
      return views;

  }

  renderCheckBox(data) {
      var leftText = data.name;
      return (
          <CheckBox
              style={{flex: 1, paddingLeft: 5, paddingBottom: 10}}
              onClick={()=>this.onClickCheckBox(data)}
              isChecked={data.checked}
              leftText={leftText}
              leftTextStyle={{color:'#000'}}
          />);
  }

  // toggleCurrIdr() {
  //   this.setState({
  //     currIdr: true,
  //     currUsd: false
  //   });
  // }
  //
  // toggleCurrUsd() {
  //   this.setState({
  //     currIdr: false,
  //     currUsd: true
  //   });
  // }

  addFacility() {
    var currentCheckbox = this.state.checkboxData;
    currentCheckbox.push({
      "path": this.state.addFacilityText,
      "name": this.state.addFacilityText,
      "checked": true
    });
    this.setState({
      checkboxData: currentCheckbox,
      addFacilityText: ''
    })
  }

  onUpdateModel() {
    Keyboard.dismiss();

    const { realm } = this.props;
    const { state } = this.props.navigation;

    realm.write(() => {
      realm.create('Item', {
        id: state.params.adsId,
        summary: this.state.summary,
        facilities: JSON.stringify(this.state.checkboxData),
        curr: this.state.currValue,
        selling_price: this.state.sellingPrice,
        price_per_year: this.state.pricePerYear,
        price_per_month: this.state.pricePerMonth,
        minRent: this.state.minimumValue
      }, true);
    });

    this.props.navigation.navigate("StepFour",{adsId: state.params.adsId});
  }

  render() {
    const {state} = this.props.navigation;

    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>

          <HeaderWithBack title='Keterangan & Harga' navigation={this.props.navigation} helpBtn={true} />
          <Content padder style={{backgroundColor: '#FFF'}}>

            <Form style={{marginBottom: 30}}>
              <Text style={customStyles.formLabel}>Keterangan Iklan</Text>
              <Text style={customStyles.formLabelSub}>Summary</Text>
              <Item regular style={customStyles.formItem}>
                <Input
                  multiline={true}
                  blurOnSubmit={false}
                  onChangeText={(txt) => {
                      this.setState({ summary: txt })
                  }}
                  value={this.state.summary}
                  onSubmitEditing={() => {
                    if (!this.state.summary.endsWith("\n")) {
                        let summary = this.state.summary;
                        summary = summary + "\n";
                        this.setState({ summary: summary })
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

              <Text style={customStyles.formLabel}>Fasilitas Tambahan</Text>
              <Text style={customStyles.formLabelSub}>Amenities</Text>
              {this.renderCheckBoxView()}
              <Item regular style={customStyles.formItem}>
                <Input
                  style={[customStyles.formItemInput, {marginRight:5}]}
                  placeholderTextColor='#CCC'
                  placeholder='Tambah Fasilitas'
                  value={this.state.addFacilityText}
                  onChangeText={(text) => this.setState({addFacilityText:text})}
                />
                <Button danger style={{height:41}}
                  onPress={() => this.addFacility()}
                >
                <Text>Add +</Text>
                </Button>
              </Item>

              <Text style={customStyles.formLabel}>Mata Uang</Text>
              <Text style={customStyles.formLabelSub}>Currency</Text>

              <RadioForm formHorizontal={true} animation={true} >
                {this.state.types3.map((obj, i) => {
                  var onPress = (value, index) => {
                      this.setState({
                        currValue: value,
                        currValueIndex: index
                      })
                    }
                  return (
                    <RadioButton labelHorizontal={true} key={i} >
                      <RadioButtonInput
                        obj={obj}
                        index={i}
                        isSelected={this.state.currValue === obj.value}
                        onPress={onPress}
                        buttonInnerColor={'#fcb415'}
                        buttonOuterColor={'#fcb415'}
                        buttonSizeWidth={100}
                        buttonSizeHeight={30}
                        buttonSizeRadius={30}
                        borderWidth={2}
                        buttonSize={15}
                        buttonStyle={{}}
                        buttonWrapStyle={{marginRight: 15}}
                      />
                      {/* <RadioButtonLabel
                        obj={obj}
                        index={i}
                        onPress={onPress}
                        labelStyle={{color: '#000', marginRight: 10}}
                        labelWrapStyle={{}}
                      /> */}
                    </RadioButton>
                  )
                })}
              </RadioForm>

              {(this.state.want_to === 'jual') ?
                <View>
                  <Text style={customStyles.formLabel}>Harga Jual</Text>
                  <Text style={customStyles.formLabelSub}>Selling Price</Text>
                  <Item regular style={customStyles.formItem}>
                    <TextInputMask
                      ref={'sellingPrice'}
                      type={'money'}
                      options={{ unit: this.state.currValue+' ', precision: 0 }}
                      style={customStyles.formItemInputMask}
                      underlineColorAndroid='transparent'
                      value={this.state.sellingPrice}
                      placeholderTextColor='#CCC'
                      onChangeText={(text) => this.setState({sellingPrice:text})}
                    />
                  </Item>
                </View>
              :
                <View>
                  <Text style={customStyles.formLabel}>Harga Sewa per Bulan</Text>
                  <Text style={customStyles.formLabelSub}>Price per Month</Text>
                  <Item regular style={customStyles.formItem}>
                    <TextInputMask
                      ref={'pricePerMonth'}
                      type={'money'}
                      options={{ unit: this.state.currValue+' ', precision: 0 }}
                      style={customStyles.formItemInputMask}
                      underlineColorAndroid='transparent'
                      value={this.state.pricePerMonth}
                      placeholderTextColor='#CCC'
                      onChangeText={(text) => this.setState({pricePerMonth:text})}
                    />
                  </Item>

                  <Text style={customStyles.formLabel}>Harga Sewa per Tahun</Text>
                  <Text style={customStyles.formLabelSub}>Price per Year</Text>
                  <Item regular style={customStyles.formItem}>
                    <TextInputMask
                      ref={'pricePerYear'}
                      type={'money'}
                      options={{ unit: this.state.currValue+' ', precision: 0 }}
                      style={customStyles.formItemInputMask}
                      underlineColorAndroid='transparent'
                      value={this.state.pricePerYear}
                      placeholderTextColor='#CCC'
                      onChangeText={(text) => this.setState({pricePerYear:text})}
                    />
                  </Item>

                  <Text style={customStyles.formLabel}>Waktu Sewa Minimal</Text>
                  <Text style={customStyles.formLabelSub}>Minimum Rent</Text>
                  <RadioForm formHorizontal={true} animation={true} >
                    {this.state.types2.map((obj, i) => {
                      var onPress = (value, index) => {
                          this.setState({
                            minimumValue: value,
                            minimumValueIndex: index
                          })
                        }
                      return (
                        <RadioButton labelHorizontal={true} key={i} >
                          <RadioButtonInput
                            obj={obj}
                            index={i}
                            isSelected={this.state.minimumValue === obj.value}
                            onPress={onPress}
                            buttonInnerColor={'#fcb415'}
                            buttonOuterColor={'#fcb415'}
                            buttonSize={15}
                            buttonSizeWidth={100}
                            buttonSizeHeight={30}
                            buttonSizeRadius={30}
                            borderWidth={2}
                            buttonStyle={{}}
                            buttonWrapStyle={{marginRight: 5}}
                          />
                          {/* <RadioButtonLabel
                            obj={obj}
                            index={i}
                            onPress={onPress}
                            labelStyle={{color: '#000', marginRight: 10}}
                            labelWrapStyle={{}}
                          /> */}
                        </RadioButton>
                      )
                    })}
                  </RadioForm>
                </View>
              }
            </Form>

            <KeyboardSpacer />

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

// export default StepThree;
export default connectRealm(StepThree, {
  schemas: ['Item'],
  mapToProps(results, realm) {
    return {
      realm,
      items: results.items || [],
    };
  },
});
