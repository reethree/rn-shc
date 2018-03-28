import React, { Component } from "react";
import { Platform, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard, ScrollView } from 'react-native';
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
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import getTheme from '../../../native-base-theme/components';
import commonColor from '../../../native-base-theme/variables/commonColor';
const customStyles = require('../../Styles');

import ButtonGradient from '../../components/gradient/button';
import HeaderWithBack from '../../components/header/withBack';
import { TextInputMask } from 'react-native-masked-text';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { connectRealm } from 'react-native-realm';

class StepTwo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      want_to: "",
      property_type: "",
      BedroomSelected: "1",
      BathroomSelected: "1",
      ParkingSelected: "1",
      size: "",
      lot_area: "",
      floor_area: "",
      tower: "",
      floor: "",
      view: "",
      electrical_power: "",
      land_line: "",
      CertSelected: "",
      // furnished: true,
      // semifurnished: false,
      // unfurnished: false,
      types3: [{label: 'Furnished', value: 'Furnished'}, {label: 'Semi Furnished', value: 'Semi-Furnished'}, {label: 'Unfurnished', value: 'Unfurnished'}],
      value3: 'Furnished',
      value3Index: 0,
    };
  }

  componentDidMount() {
    const { realm } = this.props;
    const { state } = this.props.navigation;
    let draft = realm.objects('Item').filtered('id = "'+state.params.adsId+'"');
    if(draft.length > 0){
      let loadData = draft[0];
      this.setState(previousState => {
        return {
          want_to: loadData.want_to,
          property_type: loadData.property_type,
          BedroomSelected: (loadData.bedroom != '') ? loadData.bedroom : previousState.BedroomSelected,
          BathroomSelected: (loadData.bathroom != '') ? loadData.bathroom : previousState.BathroomSelected,
          ParkingSelected: (loadData.parking != '') ? loadData.parking : previousState.ParkingSelected,
          size: loadData.size,
          lot_area: loadData.lot_area,
          floor_area: loadData.floor_area,
          tower: loadData.tower,
          floor: loadData.floor,
          view: loadData.view,
          electrical_power: loadData.electrical_power,
          land_line: loadData.land_line,
          CertSelected: (loadData.certificate != '') ? loadData.certificate : previousState.CertSelected,
          value3: loadData.condition
        };
      });
      // this.setState({
      //   property_type: loadData.property_type,
      //   BedroomSelected: loadData.bedroom,
      //   BathroomSelected: loadData.bathroom,
      //   ParkingSelected: loadData.parking,
      //   size: loadData.size,
      //   tower: loadData.tower,
      //   floor: loadData.floor,
      //   view: loadData.view,
      //   CertSelected: loadData.certificate,
      //   value3: loadData.condition
      //   // furnished: (loadData.condition == 'Furnished') ? true : false,
      //   // semifurnished: (loadData.condition == 'Semi-Furnished') ? true : false,
      //   // unfurnished: (loadData.condition == 'Unfurnished') ? true : false

      // });
    }
  }

  // toggleFurnished() {
  //   this.setState({
  //     furnished: true,
  //     semifurnished: false,
  //     unfurnished: false
  //   });
  // }
  // toggleSemifurnished() {
  //   this.setState({
  //     furnished: false,
  //     semifurnished: true,
  //     unfurnished: false
  //   });
  // }
  // toggleUnfurnished() {
  //   this.setState({
  //     furnished: false,
  //     semifurnished: false,
  //     unfurnished: true
  //   });
  // }
  onBedroomChange(value: string) {
    this.setState({
      BedroomSelected: value
    });
  }
  onBathroomChange(value: string) {
    this.setState({
      BathroomSelected: value
    });
  }
  onParkingChange(value: string) {
    this.setState({
      ParkingSelected: value
    });
  }
  onCertChange(value: string) {
    this.setState({
      CertSelected: value
    });
  }

  onUpdateModel() {

    Keyboard.dismiss();

    const { realm } = this.props;
    const { state } = this.props.navigation;

    // let condition = '';
    //
    // if(this.state.furnished){
    //   condition = 'Furnished';
    // }else if (this.state.semifurnished) {
    //   condition = 'Semi-Furnished';
    // }else{
    //   condition = 'Unfurnished';
    // }

    realm.write(() => {
      realm.create('Item', {
        id: state.params.adsId,
        bedroom: this.state.BedroomSelected,
        bathroom: this.state.BathroomSelected,
        parking: this.state.ParkingSelected,
        size: this.state.size,
        lot_area: this.state.lot_area,
        floor_area: this.state.floor_area,
        condition: this.state.value3,
        tower: this.state.tower,
        floor: this.state.floor,
        view: this.state.view,
        electrical_power: this.state.electrical_power,
        land_line: this.state.land_line,
        certificate: this.state.CertSelected,
      }, true);
    });

    this.props.navigation.navigate("StepThree",{adsId: state.params.adsId});
  }

  render() {
    const { state } = this.props.navigation;
    const { property_type } = this.state;
    hideFor = function(type) {
      var typeSelect = 0
      switch(property_type) {
          case 'apartment':
              typeSelect = 1;
              break;
          case 'house':
              typeSelect = 2;
              break;
          case 'land':
              typeSelect = 3;
              break;
          case 'commercial':
              typeSelect = 4;
              break;
      }
      if(type.includes(typeSelect)){
        return {
          display: 'none'
        };
      }
    };
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>

          <HeaderWithBack title='Luas & Dimensi' navigation={this.props.navigation} helpBtn={true} />
          <Content padder style={{backgroundColor: '#FFF'}}>

            <Form style={{marginBottom: 30}}>
              <View style={hideFor([3,4])}>
              <Text style={customStyles.formLabel}>Kamar Tidur</Text>
              <Text style={customStyles.formLabelSub}>Bedroom</Text>
                <Item regular style={customStyles.pickerInputItem}>
                  {(this.state.property_type == 'apartment') ?
                    <Picker
                      iosHeader="Choose Bedroom"
                      mode="dropdown"
                      style={Platform.OS === 'android' ? customStyles.aPickerInput : customStyles.iosPickerInput}
                      selectedValue={this.state.BedroomSelected}
                      onValueChange={this.onBedroomChange.bind(this)}
                    >

                        <Item label="Studio" value="studio" />
                        <Item label="1BR" value="1" />
                        <Item label="2BR" value="2" />
                        <Item label="3BR" value="3" />
                        <Item label="4BR" value="4" />
                        <Item label="5BR" value="5" />
                        <Item label="6BR" value="6" />
                        <Item label="7BR" value="7" />

                    </Picker>
                  :
                    <Picker
                      iosHeader="Choose Bedroom"
                      mode="dropdown"
                      style={Platform.OS === 'android' ? customStyles.aPickerInput : customStyles.iosPickerInput}
                      selectedValue={this.state.BedroomSelected}
                      onValueChange={this.onBedroomChange.bind(this)}
                    >

                        <Item label="1BR" value="1" />
                        <Item label="2BR" value="2" />
                        <Item label="3BR" value="3" />
                        <Item label="4BR" value="4" />
                        <Item label="5BR" value="5" />
                        <Item label="6BR" value="6" />
                        <Item label="7BR" value="7" />

                    </Picker>
                  }

                </Item>
              </View>

              <View style={hideFor([3])}>
                <Text style={customStyles.formLabel}>Kamar Mandi</Text>
                <Text style={customStyles.formLabelSub}>Bathroom</Text>
                <Item regular style={customStyles.pickerInputItem}>
                  <Picker
                    iosHeader="Choose Bathroom"
                    mode="dropdown"
                    style={Platform.OS === 'android' ? customStyles.aPickerInput : customStyles.iosPickerInput}
                    selectedValue={this.state.BathroomSelected}
                    onValueChange={this.onBathroomChange.bind(this)}
                  >
                    <Item label="1" value="1" />
                    <Item label="2" value="2" />
                    <Item label="3" value="3" />
                    <Item label="4" value="4" />
                    <Item label="5" value="5" />
                    <Item label="6" value="6" />
                    <Item label="7" value="7" />
                    <Item label="8" value="8" />
                  </Picker>
                </Item>
              </View>

              <View style={hideFor([3,4])}>
                <Text style={customStyles.formLabel}>Tempat Parkir</Text>
                <Text style={customStyles.formLabelSub}>Parking Space</Text>
                <Item regular style={customStyles.pickerInputItem}>
                  <Picker
                    iosHeader="Choose Parking Space"
                    mode="dropdown"
                    style={Platform.OS === 'android' ? customStyles.aPickerInput : customStyles.iosPickerInput}
                    selectedValue={this.state.ParkingSelected}
                    onValueChange={this.onParkingChange.bind(this)}
                  >
                    <Item label="1" value="1" />
                    <Item label="2" value="2" />
                    <Item label="3" value="3" />
                    <Item label="4" value="4" />
                    <Item label="5" value="5" />
                    <Item label="6" value="6" />
                    <Item label="7" value="7" />
                    <Item label="8" value="8" />
                  </Picker>
                </Item>
              </View>

              <View style={hideFor([2,3,4])}>
                <Text style={customStyles.formLabel}>Luas</Text>
                <Text style={customStyles.formLabelSub}>Size</Text>
                <Item regular style={customStyles.formItem}>
                  <Input
                    style={customStyles.formItemInput}
                    keyboardType="numeric"
                    value={this.state.size}
                    onChangeText={(text) => this.setState({size:text})}
                  />
                  <View style={{flexDirection: 'row', alignItems: 'flex-start', marginLeft: 5}}>
                      <Text style={{fontSize: 20, lineHeight: 30}}>m</Text>
                      <Text style={{fontSize: 11, lineHeight: 18}}>2</Text>
                  </View>
                </Item>
              </View>

              <View style={hideFor([1])}>
                <Text style={customStyles.formLabel}>Luas Tanah</Text>
                <Text style={customStyles.formLabelSub}>Lot Area</Text>
                <Item regular style={customStyles.formItem}>
                  <Input
                    style={customStyles.formItemInput}
                    keyboardType="numeric"
                    value={this.state.lot_area}
                    onChangeText={(text) => this.setState({lot_area:text})}
                  />
                  <View style={{flexDirection: 'row', alignItems: 'flex-start', marginLeft: 5}}>
                      <Text style={{fontSize: 20, lineHeight: 30}}>m</Text>
                      <Text style={{fontSize: 11, lineHeight: 18}}>2</Text>
                  </View>
                </Item>
              </View>

              <View style={hideFor([1,3])}>
                <Text style={customStyles.formLabel}>Luas Bangunan</Text>
                <Text style={customStyles.formLabelSub}>Floor Area</Text>
                <Item regular style={customStyles.formItem}>
                  <Input
                    style={customStyles.formItemInput}
                    keyboardType="numeric"
                    value={this.state.floor_area}
                    onChangeText={(text) => this.setState({floor_area:text})}
                  />
                  <View style={{flexDirection: 'row', alignItems: 'flex-start', marginLeft: 5}}>
                      <Text style={{fontSize: 20, lineHeight: 30}}>m</Text>
                      <Text style={{fontSize: 11, lineHeight: 18}}>2</Text>
                  </View>
                </Item>
              </View>

              <View style={hideFor([3])}>
                <Text style={customStyles.formLabel}>Kondisi Ruangan</Text>
                <Text style={customStyles.formLabelSub}>Condition</Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <RadioForm formHorizontal={true} animation={true} >
                    {this.state.types3.map((obj, i) => {
                      var onPress = (value, index) => {
                          this.setState({
                            value3: value,
                            value3Index: index
                          })
                        }
                      return (
                        <RadioButton labelHorizontal={true} key={i} >
                          <RadioButtonInput
                            obj={obj}
                            index={i}
                            isSelected={this.state.value3 === obj.value}
                            onPress={onPress}
                            buttonInnerColor={'#fcb415'}
                            buttonOuterColor={'#fcb415'}
                            buttonSize={15}
                            buttonSizeWidth={110}
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
                </ScrollView>
              </View>

              <View style={hideFor([2,3,4])}>
                <Text style={customStyles.formLabel}>Menara</Text>
                <Text style={customStyles.formLabelSub}>Tower</Text>
                <Item regular style={customStyles.formItem}>
                  <Input
                    style={customStyles.formItemInput}
                    value={this.state.tower}
                    onChangeText={(text) => this.setState({tower:text})}
                  />
                </Item>
              </View>

              <View style={hideFor([3])}>
                <Text style={customStyles.formLabel}>Lantai</Text>
                <Text style={customStyles.formLabelSub}>Floor</Text>
                <Item regular style={customStyles.formItem}>
                  <Input
                    style={customStyles.formItemInput}
                    value={this.state.floor}
                    onChangeText={(text) => this.setState({floor:text})}
                  />
                </Item>
              </View>

              <View style={hideFor([2,3,4])}>
                <Text style={customStyles.formLabel}>Pemandangan</Text>
                <Text style={customStyles.formLabelSub}>View</Text>
                <Item regular style={customStyles.formItem}>
                  <Input
                    style={customStyles.formItemInput}
                    value={this.state.view}
                    onChangeText={(text) => this.setState({view:text})}
                  />
                </Item>
              </View>
              
              <View style={hideFor([1,3])}>
                <Text style={customStyles.formLabel}>Daya Listrik</Text>
                <Text style={customStyles.formLabelSub}>Electrical Power</Text>
                <Item regular style={customStyles.formItem}>
                  <Input
                    style={customStyles.formItemInput}
                    keyboardType="numeric"
                    value={this.state.electrical_power}
                    onChangeText={(text) => this.setState({electrical_power:text})}
                  />
                  <View style={{flexDirection: 'row', alignItems: 'flex-start', marginLeft: 5}}>
                      <Text style={{fontSize: 20, lineHeight: 30}}>kWh</Text>
                  </View>
                </Item>
              </View>

              <View style={hideFor([1,3])}>
                <Text style={customStyles.formLabel}>Jalur Telepon</Text>
                <Text style={customStyles.formLabelSub}>Land Line</Text>
                <Item regular style={customStyles.formItem}>
                  <Input
                    style={customStyles.formItemInput}
                    keyboardType="numeric"
                    value={this.state.land_line}
                    onChangeText={(text) => this.setState({land_line:text})}
                  />
                </Item>
              </View>
              {(this.state.want_to === 'jual') ?      
              <View>
                <Text style={customStyles.formLabel}>Sertifikat</Text>
                <Text style={customStyles.formLabelSub}>Certificate</Text>
                <Item regular style={customStyles.pickerInputItem}>
                  <Picker
                    iosHeader="Choose Certificate"
                    mode="dropdown"
                    style={Platform.OS === 'android' ? customStyles.aPickerInput : customStyles.iosPickerInput}
                    selectedValue={this.state.CertSelected}
                    onValueChange={this.onCertChange.bind(this)}
                  >
                    <Item label="" value="" />
                    <Item label="SHM" value="shm" />
                    <Item label="HGB" value="hgb" />
                    <Item label="Hak Sewa" value="hakSewa" />
                    <Item label="Hak Pakai" value="hakPakai" />
                    <Item label="AJB" value="ajb" />
                    <Item label="PPJB" value="ppjb" />
                    <Item label="Girik" value="girik" />
                    <Item label="Adat" value="adat" />
                  </Picker>
                </Item>
              </View>
              : null }
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

// export default StepTwo;

export default connectRealm(StepTwo, {
  schemas: ['Item'],
  mapToProps(results, realm) {
    return {
      realm,
      items: results.items || [],
    };
  },
});

// <Grid style={{marginBottom:10}}>
//   <Col size={1} style={{paddingTop:4}}>
//     <Radio
//       selected={this.state.furnished}
//       onPress={() => this.toggleFurnished()}
//     />
//   </Col>
//   <Col size={4}>
//   <Text style={customStyles.formLabel}>Furnished</Text>
//   </Col>
//   <Col size={1} style={{paddingTop:4}}>
//     <Radio
//       selected={this.state.semifurnished}
//       onPress={() => this.toggleSemifurnished()}
//     />
//   </Col>
//   <Col size={4}>
//   <Text style={customStyles.formLabel}>Semi Furnished</Text>
//   </Col>
//   <Col size={1} style={{paddingTop:4}}>
//     <Radio
//       selected={this.state.unfurnished}
//       onPress={() => this.toggleUnfurnished()}
//     />
//   </Col>
//   <Col size={4}>
//   <Text style={customStyles.formLabel}>Unfurnished</Text>
//   </Col>
// </Grid>
