import React, { Component } from "react";
import { Platform, View, TextInput, TouchableOpacity, Image } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  StyleProvider,
  Footer,
  List,
  ListItem,
  Body,
  Right,
  Left,
  Grid,
  Col,
  Row
} from "native-base";

import getTheme from '../../../native-base-theme/components';
import commonColor from '../../../native-base-theme/variables/commonColor';

import HeaderWithBack from '../../components/header/withBack';
import CardGradient from '../../components/gradient/card';

import { NavigationActions } from 'react-navigation';

const customStyles = require('../../Styles');

const Apartment = require('../../../assets/images/v3/Apartment.png');
const House = require('../../../assets/images/v3/House.png');
const Land = require('../../../assets/images/v3/Land.png');
const Commercial = require('../../../assets/images/v3/Commercial.png');

class StepZero extends Component {

  constructor(props) {
    super(props);
  }

  redirectToDashboard(){
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        // NavigationActions.navigate({ routeName: 'Dashboard', params: {invoice_id: 204}})
        NavigationActions.navigate({ routeName: 'Invoice', params: {ref: 'post', adsId: 204}})
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {

    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>

          <HeaderWithBack title='Property Type' navigation={this.props.navigation} helpBtn={true} />

          <Content padder style={{backgroundColor: '#FFF'}}>
            <View>
              <Text style={customStyles.formLabel}>What is your property type ?</Text>
              <Text style={customStyles.formLabelSub}>Apa jenis properti anda ?</Text>
            </View>
            <Grid>
              <Row>
                <Col>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("StepOne", {property_type: 'apartment'})}
                  >
                    <CardGradient
                      colors={['#4197D1','#3DC6F2']}
                    >
                      <Image source={Apartment} style={{marginTop:10}} />
                      <Text style={{color: '#FFF',backgroundColor: 'transparent', marginTop: 20}}>Apartment</Text>
                    </CardGradient>  
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("StepOne", {property_type: 'house'})}
                  >
                    <CardGradient
                      colors={['#39A588','#6DC071']}
                    >
                      <Image source={House} style={{marginTop:10}} />
                      <Text style={{color: '#FFF',backgroundColor: 'transparent', marginTop: 20}}>House</Text>
                    </CardGradient>
                  </TouchableOpacity>
                </Col>
              </Row>
              <Row>
                <Col>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("StepOne", {property_type: 'land'})}
                  >
                    <CardGradient
                      colors={['#F5A71C','#F17222']}
                    >
                      <Image source={Land} style={{marginTop:10}} />
                      <Text style={{color: '#FFF',backgroundColor: 'transparent', marginTop: 20}}>Land</Text>
                    </CardGradient>
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("StepOne", {property_type: 'commercial'})}
                    // onPress={() => this.props.navigation.navigate("Invoice", {adsId: 204, reff: 'post'})}
                    // onPress={() => this.redirectToDashboard()}
                  >
                    <CardGradient
                      colors={['#D46F9A','#A26FAB']}
                    >
                      <Image source={Commercial} style={{marginTop:10}} />
                      <Text style={{color: '#FFF',backgroundColor: 'transparent', marginTop: 20}}>Commercial</Text>
                    </CardGradient>
                  </TouchableOpacity>
                </Col>
              </Row>
            </Grid>
            
          </Content>

        </Container>
      </StyleProvider>
    );
  }
}

export default StepZero;
// saveData('randomKey', {propertyType: 'Apartment'}).then(() => this.props.navigation.navigate("StepOne", {propertyType: 'Apartment'}));

// export default connectRealm(StepZero, {
//   schemas: ['Item'],
//   mapToProps(results, realm) {
//     return {
//       realm,
//       items: results.items || [],
//     };
//   },
// });

{/* <List>

<ListItem button
style={{borderColor: '#FFF',borderWidth: 10,marginLeft: 0, backgroundColor: '#ec3e41'}}
onPress={() => this.props.navigation.navigate("StepOne", {property_type: 'apartment'})}
>
  <Body>
    <Text style={{color: '#FFF', textAlign: 'center', fontWeight: 'bold'}}>APARTMENT</Text>
  </Body>
  <Right>
      <Image source={Apartment} />
  </Right>
</ListItem>

<ListItem button
style={{borderColor: '#FFF',borderWidth: 10,marginLeft: 0, backgroundColor: '#23C2E1'}}
onPress={() => this.props.navigation.navigate("StepOne", {property_type: 'house'})}
>
  <Body>
    <Text style={{color: '#FFF', textAlign: 'center', fontWeight: 'bold'}}>HOUSE</Text>
  </Body>
  <Right>
    <Image source={House} />
  </Right>
</ListItem>

<ListItem button
style={{borderColor: '#FFF',borderWidth: 10,marginLeft: 0, backgroundColor: '#FBAC3D'}}
onPress={() => this.props.navigation.navigate("StepOne", {property_type: 'land'})}
>
  <Body>
    <Text style={{color: '#FFF', textAlign: 'center', fontWeight: 'bold'}}>LAND</Text>
  </Body>
  <Right>
    <Image source={Land} />
  </Right>
</ListItem>

<ListItem button
style={{borderColor: '#FFF',borderWidth: 10,marginLeft: 0, backgroundColor: '#00C15E'}}
onPress={() => this.props.navigation.navigate("StepOne", {property_type: 'commercial'})}
>
  <Body>
    <Text style={{color: '#FFF', textAlign: 'center', fontWeight: 'bold'}}>COMMERCIAL</Text>
  </Body>
  <Right>
    <Image source={Commercial} />
  </Right>
</ListItem>

</List> */}
