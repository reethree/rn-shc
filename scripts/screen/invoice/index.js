import React, { Component } from "react";
import { Platform, View, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
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
  Card,
  CardItem,
  Spinner,
  Grid,
  Col
} from "native-base";

import { connectRealm } from 'react-native-realm';
import RNFetchBlob from 'react-native-fetch-blob';

import getTheme from '../../../native-base-theme/components';
import commonColor from '../../../native-base-theme/variables/commonColor';
const customStyles = require('../../Styles');

import HeaderWithBack from '../../components/header/withBack';
import ButtonGradient from '../../components/gradient/button';

class Invoice extends Component {

  constructor(props) {
    super(props);
    this.state = {
      invoice: [],
      property_type: '',
      want_to: '',
      property_name: '',
      address: '',
      bedroom: '',
      condition: '',
      status: '',
      isLoading: false,
      isLoadingPage: true,
      refPage: null
    }

  }

  componentDidMount() {
    const { realm } = this.props;
    const { state } = this.props.navigation;
    
    if(state.params.reff){
      this.setState({refPage:state.params.reff});
    }

    this.getDetailInvoice(state.params.adsId).done();

    // let draft = realm.objects('Item').filtered('id = "'+state.params.adsId+'"');
    // if(draft.length > 0){
    //   let loadData = draft[0];
    //   this.setState({
    //     invoice: JSON.parse(loadData.invoice),
    //     property_type: loadData.property_type,
    //     want_to: loadData.want_to,
    //     property_name: loadData.property_name,
    //     address: loadData.address,
    //     bedroom: loadData.bedroom,
    //     condition: loadData.condition,
    //     status: loadData.status
    //   });
    // }
  }

  async getDetailInvoice(ads_id) {
    try {
      let response = await fetch('https://www.rukamen.com/api/v1/get_saleshack_detail_invoice', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adsId: ads_id
        }),
      });

      // if(response.success){
        let responseJson = await response.json();
        this.setState({
          invoice: responseJson.data,
          isLoadingPage: false
        }, function() {
          // do something with new state
        });
      // }else{
      //   this.setState({
      //     isLoading: false
      //   }, function() {
      //     // do something with new state
      //   });
      // }

    } catch (error) {
      console.error(error);
    }
  }

  ucfirst(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  renderStatus(){
    
    switch(this.state.invoice.status) {
      case 'send':
          return 'Waiting for Payment';
          break;
      default:
          return 'Unpaid';
    }
  }

  payNow(){

    this.setState({isLoading:true});

    var enabled_payments = [];
    enabled_payments.push('credit_card');
    enabled_payments.push('bca_klikbca');
    enabled_payments.push('mandiri_clickpay');
    enabled_payments.push('cimb_clicks');
    enabled_payments.push('permata_va');
    enabled_payments.push('bca_va');
    enabled_payments.push('bni_va');

    RNFetchBlob.fetch('POST', 'https://app.sandbox.midtrans.com/snap/v1/transactions', {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // 'Authorization': 'Basic U0ItTWlkLXNlcnZlci1iZEltU3hEZVRHN3Jva3hKbzZ4eEhJX0k6'
      'Authorization': 'Basic TWlkLXNlcnZlci1HNGhRSl9hR0V0NnM3Smw4ZXFoSURQRjI6' 
    }, JSON.stringify(
      {
        // "enabled_payments": enabled_payments,
        "transaction_details": {
          "order_id": this.state.invoice.invoice_no,
          "gross_amount": this.state.invoice.price
        },
        "item_details": [{
          "id": "shc1",
          "price": this.state.invoice.price,
          "quantity": this.state.invoice.qty,
          "name": "Saleshack Package"
        }],
        "customer_details": {
          "first_name": this.state.invoice.name,
          "last_name": "",
          "email": this.state.invoice.email,
          "phone": this.state.invoice.phone,
        }
      }
    )
    ).uploadProgress((written, total) => {
        console.log('uploaded', written / total);
    }).then((res) => {
      let text = res.text()
      let json = res.json()

      this.setState({isLoading:false});

      if(json.redirect_url){
          this.props.navigation.navigate("Midtrans",{token: json.token, redirect_url: json.redirect_url})
      }else{
        alert(json.error_messages);
      }
    }).catch((err) => {
      alert(err);
    })
  }

  render() {

    let status_inv  = this.renderStatus();

    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>
          
          {(this.state.refPage == 'post') ? 
            <HeaderWithBack title='Invoice' navigation={this.props.navigation} iconBack='md-close' helpBtn={true} reff='Dashboard' />
            :
            <HeaderWithBack title='Invoice' navigation={this.props.navigation} helpBtn={true} />
          }

          <Content padder>
            {(this.state.isLoadingPage) ?
              <ActivityIndicator size="large" color="#000" style={{marginTop: 30}} />
            :
            <View style={{marginBottom: 30}}>
              <Card style={{flex: 0, elevation: 5}}>
                <CardItem bordered style={{backgroundColor: '#ffb600'}}>
                  <Body>
                    <Grid>
                      <Col size={1}>
                        <Text style={{fontSize: 14, textAlign: 'right'}}>{'Invoice Number : INV'+this.state.invoice.invoice_no}</Text>  
                      </Col>
                    </Grid>
                  </Body>
                </CardItem>
                <CardItem cardBody>
                  <View style={{backgroundColor: '#f2f2f2', padding: 20, borderBottomColor: '#ccc', borderBottomWidth: 1, width: '100%'}}>
                    <Text style={{textAlign: 'center'}}>{this.state.invoice.title}</Text>
                  </View>
                </CardItem>
                <CardItem>
                  <Body>
                    <Text style={{alignSelf:'center', textAlign:'center', color: '#999'}}>Total Price</Text>
                    <Text style={{fontSize: 25, alignSelf:'center', textAlign:'center'}}>IDR {this.state.invoice.price_f}</Text>
                  </Body>
                </CardItem>
                <View
                  style={[customStyles.sparator,{marginTop: 0, marginBottom: 0, marginLeft: 20, marginRight: 20}]}
                />
                <CardItem style={{alignSelf: 'center', justifyContent: 'center'}}>
                  <Body>
                      <Text style={{alignSelf:'center', textAlign:'center', color: '#999', fontSize: 12}}>Status Invoice</Text>
                      <Text style={{alignSelf:'center', textAlign:'center'}}>{(this.state.invoice.status == 'send') ? 'Unpaid' : this.state.invoice.status_f}</Text>
                  </Body>
                </CardItem>
                {(this.state.invoice.status == 'waiting for payment') ? 
                    <CardItem style={{alignSelf: 'center', justifyContent: 'center'}}>
                    <Body>
                        <View style={stylesTextLine.container}>
                            <Text style={stylesTextLine.normalText}>Please complete payment before </Text>
                            <Text style={stylesTextLine.normalText}>{this.state.invoice.expired_time} Asia / Jakarta. </Text>
                            <Text style={stylesTextLine.normalText}>If you pass the time limit, your order will be automatically canceled.</Text> 
                        </View>
                    </Body>
                  </CardItem>
                : null }
                {(this.state.invoice.status == 'send') ?
                  <CardItem cardBody style={{alignSelf: 'center', justifyContent: 'center'}}>
                      <ButtonGradient
                          colors={['#3db54a','#00af84']}
                          style={{margin: 10, borderRadius: 30, alignSelf: 'center', justifyContent: 'center'}}
                      >              
                        {(this.state.isLoading) ?
                          <Button block disabled transparent style={{width: '100%'}}
                          >
                            <Spinner color='#FFF' /><Text style={{fontWeight: 'bold', color:'#FFF'}}>PLEASE WAIT</Text>
                          </Button>
                          :
                          <Button block transparent style={{width: '100%'}}
                          onPress={() => this.payNow() }
                          >
                            <Text style={{fontWeight: 'bold', color: 'white'}}>Pay Now</Text>
                          </Button>
                        }
                      </ButtonGradient>
                  </CardItem>
                  :
                  null
                }
              </Card>
              {(this.state.invoice.transaction_id != null) ? 
              <Card style={{flex: 0, elevation: 5}}>
                <CardItem bordered>
                  <Body>
                    <Grid>
                        <Col size={1}><Text style={[customStyles.formLabel,{color:'#666',fontSize: 12}]}>Transaction ID</Text></Col>
                        <Col size={1}><Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.invoice.transaction_id}</Text></Col>
                    </Grid>
                    <Grid>
                        <Col size={1}><Text style={[customStyles.formLabel,{color:'#666',fontSize: 12}]}>Transaction Time</Text></Col>
                        <Col size={1}><Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.invoice.transaction_time}</Text></Col>
                    </Grid>
                    <Grid>
                        <Col size={1}><Text style={[customStyles.formLabel,{color:'#666',fontSize: 12}]}>Transaction Status</Text></Col>
                        <Col size={1}><Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.invoice.transaction_status}</Text></Col>
                    </Grid>
                    <Grid>
                        <Col size={1}><Text style={[customStyles.formLabel,{color:'#666',fontSize: 12}]}>Payment Type</Text></Col>
                        <Col size={1}><Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.invoice.payment_type}</Text></Col>
                    </Grid>
                  </Body>
                </CardItem>
              </Card>
              : null }

              </View>
            }
          </Content>

        </Container>
      </StyleProvider>
    );
  }
}

const stylesTextLine = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  normalText: {
      fontSize: 12, 
      color: "#FF0000",
      textAlign: 'center'
  },
  clickableText: {
      fontSize: 12, 
      color: "#0375aa"
  }
});

export default connectRealm(Invoice, {
  schemas: ['Item'],
  mapToProps(results, realm) {
    return {
      realm,
      items: results.items || [],
    };
  },
});
