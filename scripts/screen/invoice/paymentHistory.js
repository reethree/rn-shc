import React, { Component } from "react";
import { Image, View, ListView, StyleSheet, AsyncStorage, ActivityIndicator, TouchableOpacity, Dimensions, RefreshControl } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  StyleProvider,
  Card,
  CardItem,
  Thumbnail,
  Grid,
  Col,
  Row
} from "native-base";

import RNFetchBlob from 'react-native-fetch-blob';
import Moment from 'moment';

import getTheme from '../../../native-base-theme/components';
import commonColor from '../../../native-base-theme/variables/commonColor';

import HeaderWithBack from '../../components/header/withBack';
import ButtonGradient from '../../components/gradient/button';
var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
const emptyPayment = require('../../../assets/images/No-Payment.png');

class PaymentHistory extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      userdata: [],
      dataSource: [],
      data: [],
      refreshing: false,
      isLoading: true,
    }
  }

  componentDidMount() {

    AsyncStorage.getItem('userdata')
      .then(res => {
        if(res){
          userdata = JSON.parse(res);
          this.setState({userdata:userdata})
          this.getAds(userdata).done()
        }
        this.setState({refreshing: false});
      })
      .catch(err => reject(err));
  }

  async getAds(userdata) {
    try {
      let response = await fetch('https://www.rukamen.com/api/v1/get_saleshack_invoices', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userdata),
      });

      // if(response.success){

        let responseJson = await response.json();

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.setState({
          isLoading: false,
          refreshing: false,
          dataSource: ds.cloneWithRows(responseJson.data),
          data: responseJson.data
        }, function() {
          // do something with new state
        });
      // } else {
      //   this.setState({
      //     isLoading: false,
      //     refreshing: false,
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

  _onRefresh(){
      // alert('refresh');
      this.setState({refreshing: true});
      this.componentDidMount();
  }

  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>

          <HeaderWithBack title='Payment History' navigation={this.props.navigation} helpBtn={true} />
          <Content padder refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              title=""
              />
            }>
            
            {(this.state.isLoading) ?
              <ActivityIndicator size="large" color="#000" style={{marginTop: 30}} />
            :
              (this.state.data.length > 0) ?
              <ListView style={{marginBottom: 30}}
                enableEmptySections
                dataSource={this.state.dataSource}
                renderRow={(data) =>
                  <Card>
                    <CardItem cardBody>
                      {(data.status == 'waiting for payment' || data.status == 'waiting for approval') ? 
                        <View style={{backgroundColor: '#6199d1', padding: 2, width: '100%'}} />
                      : null }
                      {(data.status == 'paid') ? 
                        <View style={{backgroundColor: '#5cba47', padding: 2, width: '100%'}} />
                      : null }
                      {(data.status == 'unpaid' || data.status == 'send') ? 
                        <View style={{backgroundColor: '#f89929', padding: 2, width: '100%'}} />
                      : null }
                      {(data.status == 'cancel' || data.status == 'expire') ? 
                        <View style={{backgroundColor: '#c1272d', padding: 2, width: '100%'}} />
                      : null }
                    </CardItem>
                    <CardItem bordered>
                      <Body>
                        <Grid>
                          <Col size={2}>
                            <Text style={{fontSize: 12, color: '#666'}}>{data.post_type_f}</Text>
                          </Col>
                          <Col size={1}>
                            <Text style={{fontSize: 12, textAlign: 'right'}}>INV{data.invoice_no}</Text>  
                          </Col>
                        </Grid>
                      </Body>
                    </CardItem>
                    <CardItem>
                      <Body>
                          <Text style={{fontWeight:'bold',fontSize:16}}>{data.title}</Text>
                      </Body>
                    </CardItem>
                    <CardItem>
                      <Body>
                        <Grid>
                          <Col>
                            <Text style={{fontSize: 12, color: '#666'}}>Invoice Date</Text>
                            <Text style={{fontSize:14}}>{Moment(data.invoice_date).format('DD MMM YYYY')}</Text>
                          </Col>
                          <Col>
                            <Text style={{textAlign: 'right',fontSize: 12, color: '#666'}}>Status</Text>
                            <Text style={{fontSize:14,textAlign: 'right'}}>{(data.status == 'send') ? 'Unpaid' : data.status_f}</Text>
                          </Col>
                        </Grid>
                      </Body>
                    </CardItem>
                    <CardItem cardBody style={{alignSelf: 'center', justifyContent: 'center'}}>
                      <ButtonGradient
                        colors={['#3db54a','#00af84']}
                        style={{margin: 10, alignSelf: 'center', justifyContent: 'center'}}
                      >
                        <Button block transparent style={{width: '100%',  alignSelf: 'center', justifyContent: 'center'}}
                            onPress={() => this.props.navigation.navigate("Invoice",{adsId: data.id})}
                        >
                            <Text style={{fontWeight: 'bold', color: '#FFF', alignSelf: 'center', textAlign: 'center'}}>View Invoice</Text>
                        </Button>
                      </ButtonGradient>
                    </CardItem>
                  </Card>
                }
                // enableEmptySections
                // disableRightSwipe={true}
                // renderLeftHiddenRow={data =>
                //   <Button full onPress={() => alert(data)}>
                //     <Icon active name="information-circle" />
                //   </Button>
                // }
                // renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                //   <Button full danger
                //   onPress={() => this.showAlert(data)}
                //   >
                //     <Icon active name="trash" />
                //   </Button>
                // }
                // leftOpenValue={75}
                // rightOpenValue={-75}
                refreshing={this.state.refreshing}
                // onRefresh={this._onRefresh.bind(this)}
                // onScroll={this.onScrollMoveFooter.bind(this)}
                // scrollEventThrottle={16}
              />
              :
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: deviceHeight / 6}}>
                <Image source={emptyPayment} style={{resizeMode: "contain", alignSelf: 'center', width: 250}} />
                <Text style={{marginTop: 20}}>You don't have any payment yet</Text>
              </View>
            }

          </Content>

        </Container>
      </StyleProvider>
    );
  }
}

export default PaymentHistory;
