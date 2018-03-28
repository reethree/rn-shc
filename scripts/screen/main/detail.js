import React, { Component } from "react";
import { Image, View, StyleSheet, AsyncStorage, ActivityIndicator, Dimensions } from "react-native";
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

import getTheme from '../../../native-base-theme/components';
import commonColor from '../../../native-base-theme/variables/commonColor';
import ButtonGradient from '../../components/gradient/button';
import HeaderWithBack from '../../components/header/withBack';

const customStyles = require('../../Styles');
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class DetailPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
        post: [],
        isLoading: true
    }
  }

  componentDidMount() {
    const { state } = this.props.navigation;

    this.getDetailPost(state.params.adsId).done();
  }

  async getDetailPost(ads_id) {
    try {
      let response = await fetch('https://www.rukamen.com/api/v1/get_saleshack_detail_ads', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adsId: ads_id
        }),
      });

      let responseJson = await response.json();
      this.setState({
        post: responseJson.data,
        isLoading: false
      }, function() {
        // do something with new state
      });

    } catch (error) {
      console.error(error);
    }
  }

  renderNego(){
      if(this.state.post.nego == 'Y') {
        return (
            <Text style={{color:'#999',fontSize: 12}}>Negotiation</Text>
        );
      }
  }

  ucfirst(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>

          <HeaderWithBack title='Detail Post' navigation={this.props.navigation} helpBtn={true} />
          <Content padder>
          {(this.state.isLoading) ?
                <ActivityIndicator size="large" color="#000" style={{marginTop: 30}} />
            :
                <Card style={{marginBottom: 30}}>
                    <CardItem style={{backgroundColor: '#eee'}}>
                        <Body>
                            <Grid>
                                <Col><Text style={{fontSize: 14, color: '#666', textAlign: 'right'}}>Status : </Text></Col>
                                <Col><Text style={{fontSize: 14}}>{this.state.post.status}</Text></Col>
                            </Grid>                           
                        </Body>  
                    </CardItem>
                    <CardItem>
                        <Body>
                            <View>
                                <Text style={{fontSize: 16, fontWeight: 'bold'}}>{this.state.post.title}</Text>
                            </View>
                            <Text style={[customStyles.formLabelSub, {marginTop: 10}]}>Photos</Text>
                            <View style={{flex: 1, alignItems: 'flex-start', flexDirection: 'row', flexWrap: 'wrap'}}>
                                {(this.state.post.photos_.length > 0) ? 
                                    this.state.post.photos_.map((a, i) => (
                                    <View key={i}
                                        style={{
                                            position: 'relative',
                                            borderRadius: 3,
                                            width: (deviceWidth/3)-30,
                                            height: (deviceWidth/3)-30,
                                            margin:5
                                        }}>
                                        <Image style={{
                                            borderRadius: 3,
                                            width: (deviceWidth/3)-30,
                                            height: (deviceWidth/3)-30}}
                                            source={{uri: a}} />
                                    </View>
                                    ))
                                : null }
                            </View>
                            {(this.state.post.post_type == 'apartment') ? 
                                <View>
                                    <Text style={[customStyles.formLabelSub, {marginTop: 10}]}>Property Name</Text>
                                    <Text style={{fontSize: 12}}>{this.state.post.property_name}</Text>
                                </View>
                            :
                                <View>
                                    <Text style={[customStyles.formLabelSub, {marginTop: 10}]}>Property Name</Text>
                                    <Text style={{fontSize: 12}}>{this.state.post.complex_name}</Text>
                                    <Text style={[customStyles.formLabelSub, {marginTop: 10}]}>Address</Text>
                                    <Text style={{fontSize: 12}}>{this.state.post.address}</Text>
                                </View>
                            }
                            {(this.state.post.district) ?
                                <Text style={{fontSize: 12}}>{this.state.post.district}</Text>
                            : null }
                            {(this.state.post.city) ?
                                <Text style={{fontSize: 12}}>{this.state.post.city}</Text>
                            : null }

                            {(this.state.post.selling_price > 0) ?
                                <View>
                                    <Text style={[customStyles.formLabelSub, {marginTop: 10}]}>Selling Price</Text>
                                    <Text style={{fontSize: 14}}>{this.state.post.currency+' '+this.state.post.selling_price_f}</Text>
                                </View>
                            : null }
                            {(this.state.post.price_month > 0) ?
                                <View>
                                    <Text style={[customStyles.formLabelSub, {marginTop: 10}]}>Price per Month</Text>
                                    <Text style={{fontSize: 14}}>{this.state.post.currency+' '+this.state.post.price_month_f}</Text>
                                </View>
                            : null }
                            {(this.state.post.price_year > 0) ?
                                <View>
                                    <Text style={[customStyles.formLabelSub, {marginTop: 10}]}>Price per Year</Text>
                                    <Text style={{fontSize: 14}}>{this.state.post.currency+' '+this.state.post.price_year_f}</Text>
                                </View>
                            : null }
                            {this.renderNego()}
                        </Body>
                    </CardItem>
                    <CardItem bordered>
                        <Body>
                            <Grid>
                                <Col size={1}><Text style={[customStyles.formLabel,{color:'#666',fontSize: 12}]}>Type / Condition</Text></Col>
                                <Col size={1}><Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.ucfirst(this.state.post.type)+' / '+this.state.post.conditions}</Text></Col>
                            </Grid>
                            {(this.state.post.minimum_rent > 0) ?
                                <Grid>
                                    <Col size={1}><Text style={[customStyles.formLabel,{color:'#666',fontSize: 12}]}>Minimun Rent</Text></Col>
                                    <Col size={1}><Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.post.minimum_rent} Month</Text></Col>
                                </Grid>
                            : null }
                            <Grid>
                                <Col size={1}><Text style={[customStyles.formLabel,{color:'#666',fontSize: 12}]}>Bedroom / Bathroom</Text></Col>
                                <Col size={1}><Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.ucfirst(this.state.post.bedroom)+' / '+this.state.post.bathroom}</Text></Col>
                            </Grid>
                            <Grid>
                                <Col size={1}><Text style={[customStyles.formLabel,{color:'#666',fontSize: 12}]}>Parking</Text></Col>
                                <Col size={1}><Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.post.parking}</Text></Col>
                            </Grid>
                            {(this.state.post.size > 0) ?
                            <Grid>
                                <Col size={1}><Text style={[customStyles.formLabel,{color:'#666',fontSize: 12}]}>Area</Text></Col>
                                <Col size={1}><Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.post.size} m2</Text></Col>
                            </Grid>
                            : null }
                            {(this.state.post.luas_bangunan > 0) ?
                            <Grid>
                                <Col size={1}><Text style={[customStyles.formLabel,{color:'#666',fontSize: 12}]}>Building Area</Text></Col>
                                <Col size={1}><Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.post.luas_bangunan} m2</Text></Col>
                            </Grid>
                            : null }
                            {(this.state.post.luas_tanah > 0) ?
                            <Grid>
                                <Col size={1}><Text style={[customStyles.formLabel,{color:'#666',fontSize: 12}]}>Lot Area</Text></Col>
                                <Col size={1}><Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.post.luas_tanah} m2</Text></Col>
                            </Grid>
                            : null }
                            {(this.state.post.type == 'apartment') ?
                            <Grid>
                                <Col size={1}><Text style={[customStyles.formLabel,{color:'#666',fontSize: 12}]}>Tower / Floor / View</Text></Col>
                                <Col size={1}><Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.post.tower+' / '+this.state.post.floor+' / '+this.state.post.view}</Text></Col>
                            </Grid>
                            : 
                            <Grid>
                                <Col size={1}><Text style={[customStyles.formLabel,{color:'#666',fontSize: 12}]}>Number of Floor</Text></Col>
                                <Col size={1}><Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.post.floor}</Text></Col>
                            </Grid>
                            }
                            <Grid>
                                <Col size={1}><Text style={[customStyles.formLabel,{color:'#666',fontSize: 12}]}>Certificate</Text></Col>
                                <Col size={1}><Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.post.sertifikat}</Text></Col>
                            </Grid>
                            {(this.state.post.jalur_tlp > 0) ?
                            <Grid>
                                <Col size={1}><Text style={[customStyles.formLabel,{color:'#666',fontSize: 12}]}>Land Line</Text></Col>
                                <Col size={1}><Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.post.jalur_tlp}</Text></Col>
                            </Grid>
                            : null }
                            {(this.state.post.daya_listrik > 0) ?
                            <Grid>
                                <Col size={1}><Text style={[customStyles.formLabel,{color:'#666',fontSize: 12}]}>Electric Power</Text></Col>
                                <Col size={1}><Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.post.daya_listrik+' kWh'}</Text></Col>
                            </Grid>
                            : null }
                            <Grid>
                                <Col size={1}><Text style={[customStyles.formLabel,{color:'#666',fontSize: 12}]}>Facilities</Text></Col>
                                <Col size={1}><Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.post.facilities_f}</Text></Col>
                            </Grid>
                            <Grid>
                                <Col size={1}><Text style={[customStyles.formLabel,{color:'#666',fontSize: 12}]}>Contact</Text></Col>
                                <Col size={1}>
                                <Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.post.name}</Text>
                                <Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.post.phone}</Text>
                                <Text style={[customStyles.formLabel,{fontSize: 12}]}>{this.state.post.email}</Text>
                                </Col>
                            </Grid>
                            <Text style={[customStyles.formLabelSub, {marginTop: 10}]}>Summary</Text>
                            <Text style={{fontSize: 12}}>{this.state.post.description}</Text>
                        </Body>
                    </CardItem>
                </Card>
          }

          </Content>

          <Footer padder style={{backgroundColor: '#fff', borderColor: 'transparent', height: 65}}>
              <Grid>
                <Col>
                    <ButtonGradient
                        colors={['#3db54a','#00af84']}
                        style={{margin: 10}}
                    >
                        <Button block transparent
                            onPress={() => this.props.navigation.navigate("Invoice",{adsId: this.state.post.invoice_id})}
                        >
                            <Text style={{fontWeight: 'bold', color: '#FFF'}}>View Invoice</Text>
                        </Button>
                    </ButtonGradient>
                </Col>
                <Col>
                    <ButtonGradient
                        colors={['#5fa9dd','#57c9f4']}
                        style={{margin: 10}}
                    >
                        <Button block transparent
                            onPress={() => this.props.navigation.navigate("Report",{adsId: this.state.post.id})}
                        >
                            <Text style={{fontWeight: 'bold', color: '#FFF'}}>Report</Text>
                        </Button>
                    </ButtonGradient>
                </Col>
              </Grid>
            
          </Footer>

        </Container>
      </StyleProvider>
    );
  }
}

export default DetailPost;
