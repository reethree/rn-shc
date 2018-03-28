import React, { Component } from "react";
import { Platform, Dimensions, View, Image, TextInput, TouchableOpacity, AsyncStorage, StyleSheet } from 'react-native';
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
  Card,
  CardItem,
  Body,
  Toast
} from "native-base";

import { Grid, Col, Row } from "react-native-easy-grid";
import RNFetchBlob from 'react-native-fetch-blob';
import AwesomeAlert from 'react-native-awesome-alerts';
import Swiper from 'react-native-swiper';
import Moment from 'moment';

import getTheme from '../../../native-base-theme/components';
import commonColor from '../../../native-base-theme/variables/commonColor';
const customStyles = require('../../Styles');
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

import ButtonGradient from '../../components/gradient/button';
import HeaderWithBack from '../../components/header/withBack';
import { TextInputMask } from 'react-native-masked-text';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { connectRealm } from 'react-native-realm';

import { NavigationActions } from 'react-navigation'

class StepPreview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      facilitiesDraft: [],
      imagesDraft: [],
      dataDraft: [],
      imagesDataDraft: [],
      userdata: null,
      showAlert: false,
      showProgressUpload: false,
      progressUpload: ''
    };
  }

  componentDidMount() {
    const { realm } = this.props;
    const { state } = this.props.navigation;
    let draft = realm.objects('Item').filtered('id = "'+state.params.adsId+'"');
    let imagesDraft = JSON.parse(draft[0].images);
    let imagesDataDraft = JSON.parse(draft[0].imagesData);
    let facilitiesDraft = JSON.parse(draft[0].facilities);
    if(imagesDraft){
      this.setState({imagesDraft:imagesDraft});
    }
    if(imagesDataDraft){
      this.setState({imagesDataDraft:imagesDataDraft});
    }
    if(facilitiesDraft){
      this.setState({facilitiesDraft:facilitiesDraft});
    }
    if(draft.length > 0){
      this.setState({
        dataDraft: draft[0]
      });
    }

    AsyncStorage.getItem('userdata')
      .then(res => {
        if(res){
          let userdata = JSON.parse(res);
          this.setState({userdata:userdata})
        }
      })
      .catch(err => reject(err));
  }

  renderFacilities() {
    if (!this.state.facilitiesDraft || this.state.facilitiesDraft.length === 0)return;
    var len = this.state.facilitiesDraft.length;
    var views = [];
    for (var i = 0, l = len - 2; i < l; i += 2) {
        views.push(
            <View key={i}>
                <View style={{flexDirection: 'row'}}>
                    {this.renderFacility(this.state.facilitiesDraft[i])}
                    {this.renderFacility(this.state.facilitiesDraft[i + 1])}
                </View>
                <View style={{flex: 1,height: 0.3,backgroundColor: 'transparent'}}/>
            </View>
        )
    }
    views.push(
        <View key={len - 1}>
            <View style={{flexDirection: 'row'}}>
                {len % 2 === 0 ? this.renderFacility(this.state.facilitiesDraft[len - 2]) : null}
                {this.renderFacility(this.state.facilitiesDraft[len - 1])}
            </View>
        </View>
    )
    return views;
  }
  renderFacility(data) {
      var leftText = data.name;
      if(data.checked){
        return (
            <Text style={[customStyles.formLabel,{fontSize: 12}]}>- {leftText}</Text>
        );
      }else{
          return;
      }
  }

  _onSubmitPost() {
    this.hideAlert();
    this.setState({
      showProgressUpload: true
    });

    var postData = [
      { name : 'property_type', data : this.state.dataDraft.property_type},
      { name : 'want_to', data : this.state.dataDraft.want_to},
      { name : 'property_name', data : this.state.dataDraft.property_name},
      { name : 'address', data : this.state.dataDraft.address},
      { name : 'district', data : this.state.dataDraft.district},
      { name : 'city', data : this.state.dataDraft.city},
      { name : 'bedroom', data : this.state.dataDraft.bedroom},
      { name : 'bathroom', data : this.state.dataDraft.bathroom},
      { name : 'parking', data : this.state.dataDraft.parking},
      { name : 'size', data : this.state.dataDraft.size},
      { name : 'luas_tanah', data : this.state.dataDraft.lot_area},
      { name : 'luas_bangunan', data : this.state.dataDraft.floor_area},
      { name : 'condition', data : this.state.dataDraft.condition},
      { name : 'tower', data : this.state.dataDraft.tower},
      { name : 'floor', data : this.state.dataDraft.floor},
      { name : 'view', data : this.state.dataDraft.view},
      { name : 'daya_listrik', data : this.state.dataDraft.electrical_power},
      { name : 'jalur_tlp', data : this.state.dataDraft.land_line},
      { name : 'certificate', data : this.state.dataDraft.certificate},
      { name : 'summary', data : this.state.dataDraft.summary},
      { name : 'facilities', data : this.state.dataDraft.facilities},
      { name : 'curr', data : this.state.dataDraft.curr},
      { name : 'selling_price', data : this.state.dataDraft.selling_price},
      { name : 'price_per_year', data : this.state.dataDraft.price_per_year},
      { name : 'price_per_month', data : this.state.dataDraft.price_per_month},
      { name : 'minRent', data : this.state.dataDraft.minRent},
      { name : 'name', data : this.state.dataDraft.name},
      { name : 'phone', data : this.state.dataDraft.phone},
      { name : 'email', data : this.state.dataDraft.email},
      { name : 'unique_id', data : this.state.userdata.unique_id}
    ];

    this.state.imagesDraft.map((imgData, i) => {
      postData.push(
        { name : 'postimg[]', filename : 'postimage-'+i+'.jpg', data: RNFetchBlob.wrap(imgData.uri.replace('file://','')) }
      );
    });

    RNFetchBlob.fetch('POST', 'https://www.rukamen.com/api/v1/uploadPost', {
      'Content-Type' : 'multipart/form-data',
    }, postData
    ).uploadProgress((written, total) => {
        console.log('uploaded', written / total);
        this.setState({
          progressUpload: 'Please Wait ... '+written / total
        });
    }).then((res) => {
      let text = res.text()
      let json = res.json()

      const { realm } = this.props;
      const { state } = this.props.navigation;

      realm.write(() => {
        realm.create('Item', {
          id: state.params.adsId,
          posted: true,
          category: 'Posted',
          status: 'Waiting for Payment',
          invoice: JSON.stringify(json.invoice)
        }, true);
      });

      // const resetAction = NavigationActions.reset({
      //   index: 0,
      //   actions: [
      //     // NavigationActions.navigate({ routeName: 'Dashboard', params: {message : json.msg, invoice_id: json.invoice.invoice_id}})
      //     NavigationActions.navigate({ routeName: 'Invoice', params: {ref: 'post', message : json.msg, adsId: json.invoice.invoice_id}})
      //   ]
      // })
      // this.props.navigation.dispatch(resetAction)

      this.props.navigation.navigate("Dashboard",{adsId: json.invoice.invoice_id, message : json.msg, reff: 'post'})

    }).catch((err) => {
      this.setState({
        showProgressUpload: false
      });
      alert(err);
    })
  }

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  backToDashboard = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Dashboard', params: {saveToDraft: true}})
      ]
    })
    this.props.navigation.dispatch(resetAction)
    // this.props.navigation.navigate("Dashboard")
  }

  renderSwiperItems(){
    return this.state.imagesDraft.map((item, index) => {
      return (
        <View key={index} style={{flex: 1,justifyContent: 'center',zIndex: 999999}}>
            <Image style={{height: (deviceHeight/2) - 30,width: null,position: 'relative',zIndex: 9999999}} source={item} />
        </View>
      );
    });
  }

  ucfirst(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    const {state} = this.props.navigation;
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>
          <HeaderWithBack title='Preview' navigation={this.props.navigation} helpBtn={true} />
          <Content padder>
            {(this.state.imagesDraft.length > 0) ? 
              <Swiper                       
                  height={240}
                  loop={false}
                  showsButtons={false}
                  removeClippedSubviews={false}
                  automaticallyAdjustContentInsets={true}
                  dot={<View style={{backgroundColor: 'rgba(255,255,255,.5)', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
                  activeDot={<View style={{backgroundColor: '#fcb415', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
                  paginationStyle={{
                    bottom: 20
                  }}
              >
                {this.renderSwiperItems()}
              </Swiper>
            :  
              null
            }

            <Card style={{marginBottom: 30}}>
              <CardItem bordered>
                <Body>
                  <Text style={[customStyles.formLabelSub, {marginTop: 10}]}>Property Name</Text>
                  <Text style={{fontSize: 12}}>{this.state.dataDraft.property_name}</Text>
                  <Text style={[customStyles.formLabelSub, {marginTop: 10}]}>Address</Text>
                  <Text style={{fontSize: 12}}>{this.state.dataDraft.address}</Text>
                  {(this.state.dataDraft.district) ?
                      <Text style={{fontSize: 12}}>{this.state.dataDraft.district}</Text>
                  : null }
                  {(this.state.dataDraft.city) ?
                      <Text style={{fontSize: 12}}>{this.state.dataDraft.city}</Text>
                  : null }
                  {(this.state.dataDraft.selling_price) ?
                      <View>
                          <Text style={[customStyles.formLabelSub, {marginTop: 10}]}>Selling Price</Text>
                          <Text style={{fontSize: 14}}>{this.state.dataDraft.selling_price}</Text>
                      </View>
                  : null }
                  {(this.state.dataDraft.price_per_month) ?
                      <View>
                          <Text style={[customStyles.formLabelSub, {marginTop: 10}]}>Price per Month</Text>
                          <Text style={{fontSize: 14}}>{this.state.dataDraft.price_per_month}</Text>
                      </View>
                  : null }
                  {(this.state.dataDraft.price_per_year) ?
                      <View>
                          <Text style={[customStyles.formLabelSub, {marginTop: 10}]}>Price per Year</Text>
                          <Text style={{fontSize: 14}}>{this.state.dataDraft.price_per_year}</Text>
                      </View>
                  : null }
                </Body>
              </CardItem>
              <CardItem bordered>
                <Body>
                <Grid>
                    <Col size={1}><Text style={[customStyles.formLabel,{color:'#666',fontSize: 12}]}>Type / Condition</Text></Col>
                    <Col size={1}><Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.dataDraft.want_to+' / '+this.state.dataDraft.condition}</Text></Col>
                </Grid>
                {(this.state.dataDraft.minimum_rent > 0) ?
                    <Grid>
                        <Col size={1}><Text style={[customStyles.formLabel,{color:'#666',fontSize: 12}]}>Minimun Rent</Text></Col>
                        <Col size={1}><Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.dataDraft.minRent} Month</Text></Col>
                    </Grid>
                : null }
                <Grid>
                    <Col size={1}><Text style={[customStyles.formLabel,{color:'#666',fontSize: 12}]}>Bedroom / Bathroom</Text></Col>
                    <Col size={1}><Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.dataDraft.bedroom+' / '+this.state.dataDraft.bathroom}</Text></Col>
                </Grid>
                <Grid>
                    <Col size={1}><Text style={[customStyles.formLabel,{color:'#666',fontSize: 12}]}>Parking</Text></Col>
                    <Col size={1}><Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.dataDraft.parking}</Text></Col>
                </Grid>
                {(this.state.dataDraft.size > 0) ?
                <Grid>
                    <Col size={1}><Text style={[customStyles.formLabel,{color:'#666',fontSize: 12}]}>Area</Text></Col>
                    <Col size={1}><Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.dataDraft.size} m2</Text></Col>
                </Grid>
                : null }
                {(this.state.dataDraft.floor_area > 0) ?
                <Grid>
                    <Col size={1}><Text style={[customStyles.formLabel,{color:'#666',fontSize: 12}]}>Building Area</Text></Col>
                    <Col size={1}><Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.dataDraft.floor_area} m2</Text></Col>
                </Grid>
                : null }
                {(this.state.dataDraft.lot_area > 0) ?
                <Grid>
                    <Col size={1}><Text style={[customStyles.formLabel,{color:'#666',fontSize: 12}]}>Lot Area</Text></Col>
                    <Col size={1}><Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.dataDraft.lot_area} m2</Text></Col>
                </Grid>
                : null }
                {(this.state.dataDraft.type == 'apartment') ?
                <Grid>
                    <Col size={1}><Text style={[customStyles.formLabel,{color:'#666',fontSize: 12}]}>Tower / Floor / View</Text></Col>
                    <Col size={1}><Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.dataDraft.tower+' / '+this.state.dataDraft.floor+' / '+this.state.dataDraft.view}</Text></Col>
                </Grid>
                : 
                <Grid>
                    <Col size={1}><Text style={[customStyles.formLabel,{color:'#666',fontSize: 12}]}>Number of Floor</Text></Col>
                    <Col size={1}><Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.dataDraft.floor}</Text></Col>
                </Grid>
                }
                <Grid>
                    <Col size={1}><Text style={[customStyles.formLabel,{color:'#666',fontSize: 12}]}>Certificate</Text></Col>
                    <Col size={1}><Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.dataDraft.certificate}</Text></Col>
                </Grid>
                {(this.state.dataDraft.land_line > 0) ?
                <Grid>
                    <Col size={1}><Text style={[customStyles.formLabel,{color:'#666',fontSize: 12}]}>Land Line</Text></Col>
                    <Col size={1}><Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.dataDraft.land_line}</Text></Col>
                </Grid>
                : null }
                {(this.state.dataDraft.electrical_power > 0) ?
                <Grid>
                    <Col size={1}><Text style={[customStyles.formLabel,{color:'#666',fontSize: 12}]}>Electrical Power</Text></Col>
                    <Col size={1}><Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.dataDraft.electrical_power+' kWh'}</Text></Col>
                </Grid>
                : null }
                <Grid>
                    <Col size={1}><Text style={[customStyles.formLabel,{color:'#666',fontSize: 12}]}>Facilities</Text></Col>
                    <Col size={1}>{this.renderFacilities()}</Col>
                </Grid>
                <Grid>
                    <Col size={1}><Text style={[customStyles.formLabel,{color:'#666',fontSize: 12}]}>Contact</Text></Col>
                    <Col size={1}>
                    <Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.dataDraft.name}</Text>
                    <Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.dataDraft.phone}</Text>
                    <Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.dataDraft.email}</Text>
                    </Col>
                </Grid>
                <Text style={[customStyles.formLabelSub, {marginTop: 10}]}>Summary</Text>
                <Text style={{fontSize: 12}}>{this.state.dataDraft.summary}</Text>
                </Body>
              </CardItem>
              
            </Card>

          </Content>
          <Footer padder style={{backgroundColor: '#fff', borderColor: 'transparent', height: 65}}>
              <Grid>
                <Col size={1}>
                  <Button block bordered rounded style={{borderColor: '#333',margin:10}}
                  onPress={() => this.backToDashboard() }
                  >
                    <Icon name='ios-archive' style={{fontWeight: 'bold',color: '#333'}} />
                  </Button>
                </Col>
                <Col size={2}>
                  <ButtonGradient
                    colors={['#3db54a','#00af84']}
                    style={{margin: 10}}
                  >
                    <Button block transparent iconRight
                    onPress={() => this.showAlert() }
                    >
                      <Text style={{fontWeight: 'bold', color: '#FFF'}}>Continue To Pay</Text>
                      <Icon name='ios-checkmark-circle-outline' style={{color: '#FFF'}} />
                    </Button>
                  </ButtonGradient>
                </Col>
              </Grid>
            
          </Footer>
          
          {(this.state.showAlert) ?
            <AwesomeAlert
              show={this.state.showAlert}
              showProgress={false}
              title="Confirmation Upload"
              message="Are you sure to upload this post? You cannot edit this post after upload."
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              showConfirmButton={true}
              cancelText="No, cancel"
              confirmText="Yes, upload it"
              confirmButtonColor="#DD6B55"
              onCancelPressed={() => {
                this.hideAlert();
              }}
              onConfirmPressed={() => {
                this._onSubmitPost();
              }}
            />
            :
            null
          }

          {(this.state.showProgressUpload) ?
            <AwesomeAlert
              show={this.state.showProgressUpload}
              showProgress={true}
              title="Processing Upload"
              message={this.state.progressUpload}
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
              showCancelButton={false}
              showConfirmButton={false}
            />
            :
            null
          }

        </Container>

      </StyleProvider>
    );
  }
}

// export default StepPreview;

export default connectRealm(StepPreview, {
  schemas: ['Item'],
  mapToProps(results, realm) {
    return {
      realm,
      items: results.items || [],
    };
  },
});


{/* <Card>
  <CardItem>
    <Body>
      <Text style={[customStyles.formLabel,{color:'#666'}]}>Images Property</Text>
      <View style={{flex: 1, alignItems: 'flex-start', flexDirection: 'row', flexWrap: 'wrap'}}>

        {this.state.imagesDraft.map((a, i) => (
          <View key={i}
          style={{
            position: 'relative',
            borderRadius: 10,
            width: (deviceWidth/3)-30,
            height: (deviceWidth/3)-30,
            margin:5
          }}>
          <Image style={{
            borderRadius: 10,
            width: (deviceWidth/3)-30,
            height: (deviceWidth/3)-30}}
            source={a} />
            </View>
        ))}

      </View>
    </Body>
  </CardItem>
</Card> */}

{/* <CardItem bordered>
    <Body>
      <Grid>
        <Col size={1}><Text style={[customStyles.formLabel,{color:'#666'}]}>Property Type</Text></Col>
        <Col size={2}><Text style={customStyles.formLabel}>{this.state.dataDraft.want_to} - {this.state.dataDraft.property_type}</Text></Col>
      </Grid>
    </Body>
  </CardItem>
  <CardItem bordered>
    <Body>
      <Grid>
        <Col size={1}><Text style={[customStyles.formLabel,{color:'#666'}]}>Property Name</Text></Col>
        <Col size={2}><Text style={customStyles.formLabel}>{this.state.dataDraft.property_name}</Text></Col>
      </Grid>
    </Body>
  </CardItem>
  <CardItem bordered>
    <Body>
      <Grid>
        <Col size={1}><Text style={[customStyles.formLabel,{color:'#666'}]}>Address</Text></Col>
        <Col size={2}><Text style={customStyles.formLabel}>{this.state.dataDraft.address}</Text></Col>
      </Grid>
    </Body>
  </CardItem>
  <CardItem bordered>
    <Body>
      <Grid>
        <Col size={1}><Text style={[customStyles.formLabel,{color:'#666'}]}>Bedroom</Text></Col>
        <Col size={2}><Text style={customStyles.formLabel}>{this.state.dataDraft.bedroom}</Text></Col>
      </Grid>
    </Body>
  </CardItem>
  <CardItem bordered>
    <Body>
      <Grid>
        <Col size={1}><Text style={[customStyles.formLabel,{color:'#666'}]}>Bathroom</Text></Col>
        <Col size={2}><Text style={customStyles.formLabel}>{this.state.dataDraft.bathroom}</Text></Col>
      </Grid>
    </Body>
  </CardItem>
  <CardItem bordered>
    <Body>
      <Grid>
        <Col size={1}><Text style={[customStyles.formLabel,{color:'#666'}]}>Parking</Text></Col>
        <Col size={2}><Text style={customStyles.formLabel}>{this.state.dataDraft.parking}</Text></Col>
      </Grid>
    </Body>
  </CardItem>
  <CardItem bordered>
    <Body>
      <Grid>
        <Col size={1}><Text style={[customStyles.formLabel,{color:'#666'}]}>Size</Text></Col>
        <Col size={2}><Text style={customStyles.formLabel}>{this.state.dataDraft.size}m2</Text></Col>
      </Grid>
    </Body>
  </CardItem>
  <CardItem bordered>
    <Body>
      <Grid>
        <Col size={1}><Text style={[customStyles.formLabel,{color:'#666'}]}>Condition</Text></Col>
        <Col size={2}><Text style={customStyles.formLabel}>{this.state.dataDraft.condition}</Text></Col>
      </Grid>
    </Body>
  </CardItem>
  <CardItem bordered>
    <Body>
      <Grid>
        <Col size={1}><Text style={[customStyles.formLabel,{color:'#666'}]}>Tower</Text></Col>
        <Col size={2}><Text style={customStyles.formLabel}>{this.state.dataDraft.tower}</Text></Col>
      </Grid>
    </Body>
  </CardItem>
  <CardItem bordered>
    <Body>
      <Grid>
        <Col size={1}><Text style={[customStyles.formLabel,{color:'#666'}]}>Floor</Text></Col>
        <Col size={2}><Text style={customStyles.formLabel}>{this.state.dataDraft.floor}</Text></Col>
      </Grid>
    </Body>
  </CardItem>
  <CardItem bordered>
    <Body>
      <Grid>
        <Col size={1}><Text style={[customStyles.formLabel,{color:'#666'}]}>View</Text></Col>
        <Col size={2}><Text style={customStyles.formLabel}>{this.state.dataDraft.view}</Text></Col>
      </Grid>
    </Body>
  </CardItem>
  <CardItem bordered>
    <Body>
      <Grid>
        <Col size={1}><Text style={[customStyles.formLabel,{color:'#666'}]}>Certificate</Text></Col>
        <Col size={2}><Text style={customStyles.formLabel}>{this.state.dataDraft.certificate}</Text></Col>
      </Grid>
    </Body>
  </CardItem>
  <CardItem bordered>
    <Body>
      <Grid>
        <Col size={1}><Text style={[customStyles.formLabel,{color:'#666'}]}>Facilities</Text></Col>
        <Col size={2}>{this.renderFacilities()}</Col>
      </Grid>
    </Body>
  </CardItem>
  <CardItem bordered>
    <Body>
      <Grid>
        <Col size={1}><Text style={[customStyles.formLabel,{color:'#666'}]}>Summary</Text></Col>
        <Col size={2}><Text style={customStyles.formLabel}>{this.state.dataDraft.summary}</Text></Col>
      </Grid>
    </Body>
  </CardItem>
  {(this.state.dataDraft.want_to === 'jual') ?
  <CardItem bordered>
    <Body>
      <Grid>
        <Col size={1}><Text style={[customStyles.formLabel,{color:'#666'}]}>Selling Price</Text></Col>
        <Col size={2}><Text style={customStyles.formLabel}>{this.state.dataDraft.selling_price}</Text></Col>
      </Grid>
    </Body>
  </CardItem>
  :
  <CardItem bordered>
    <Body>
      <Grid>
        <Col size={1}><Text style={[customStyles.formLabel,{color:'#666'}]}>Min Rent</Text></Col>
        <Col size={2}><Text style={customStyles.formLabel}>{this.state.dataDraft.minRent} Month</Text></Col>
      </Grid>
      <Grid>
        <Col size={1}><Text style={[customStyles.formLabel,{color:'#666'}]}>Price per Month</Text></Col>
        <Col size={2}><Text style={customStyles.formLabel}>{this.state.dataDraft.price_per_month}</Text></Col>
      </Grid>
      <Grid>
        <Col size={1}><Text style={[customStyles.formLabel,{color:'#666'}]}>Price per Year</Text></Col>
        <Col size={2}><Text style={customStyles.formLabel}>{this.state.dataDraft.price_per_year}</Text></Col>
      </Grid>
    </Body>
  </CardItem>
  }
  <CardItem bordered>
    <Body>
      <Grid>
        <Col size={1}><Text style={[customStyles.formLabel,{color:'#666'}]}>Contact</Text></Col>
        <Col size={2}>
          <Text style={customStyles.formLabel}>{this.state.dataDraft.name}</Text>
          <Text style={customStyles.formLabel}>{this.state.dataDraft.phone}</Text>
          <Text style={customStyles.formLabel}>{this.state.dataDraft.email}</Text>
        </Col>
      </Grid>
    </Body>
  </CardItem> */}