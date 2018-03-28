import React, { Component } from "react";
import { Image, View, StyleSheet, AsyncStorage, ActivityIndicator, Dimensions, ListView, TouchableOpacity, Clipboard, Linking } from "react-native";
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
  List,
  ListItem,
  Toast
} from "native-base";

import RNFetchBlob from 'react-native-fetch-blob';

import getTheme from '../../../native-base-theme/components';
import commonColor from '../../../native-base-theme/variables/commonColor';

import HeaderWithBack from '../../components/header/withBack';
import ButtonGradient from '../../components/gradient/button';

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
const emptyReport = require('../../../assets/images/No-Report.png');

class Report extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userdata:[],
      dataSource: [],
      data: [],
      refreshing: false,
      isLoading: true,
    }
  }

  componentWillMount() {

    const { state } = this.props.navigation;

    AsyncStorage.getItem('userdata')
      .then(res => {
        if(res){
          let userdata = JSON.parse(res);
          this.setState({userdata:userdata})
          this.getDetailReport(state.params.adsId).done();
        }
      })
      .catch(err => reject(err));

  }

  async getDetailReport(ads_id) {
    try {
      let response = await fetch('https://www.rukamen.com/api/v1/get_saleshack_report_ads', {
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

      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

      this.setState({
        isLoading: false,
        refreshing: false,
        dataSource: ds.cloneWithRows(responseJson.data),
        data: responseJson.data
      }, function() {
        // do something with new state
      });

    } catch (error) {
      console.error(error);
    }
  }
  
  handelViewUrl(url)
  {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        alert('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  writeToClipboard = async (url) => {
    await Clipboard.setString(url);
    Toast.show({
      text: 'Copied to Clipboard!',
      position: 'bottom',
      duration: 3000
    })
  };

  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>
          
            <HeaderWithBack title='Report' navigation={this.props.navigation} helpBtn={true} />

            <Content padder>

            {(this.state.isLoading) ?
              <ActivityIndicator size="large" color="#000" style={{marginTop: 30}} />
            :
              (this.state.data.length > 0) ?
                <ListView
                  enableEmptySections
                  dataSource={this.state.dataSource}
                  renderRow={(data) =>
                      <ListItem>
                          <Body>
                              <Text>{data.media_type}</Text>
                              <Text note>{data.media_name}</Text>
                          </Body>
                          <Right style={{flex: 1}}>
                            <View style={stylesTerm.container}>                            
                              <ButtonGradient
                                  colors={['#57cbf5','#5fa9dd']}
                                  style={{borderRadius: 30, marginRight: 3}}
                                >  
                                  <TouchableOpacity style={{paddingRight: 15, paddingLeft: 15, paddingTop: 5, paddingBottom: 5}}
                                    onPress={() => this.writeToClipboard(data.media_url)}
                                  >
                                    <Text style={{color:'white', fontSize: 12}}>Copy Link</Text>
                                  </TouchableOpacity>
                              </ButtonGradient>
                              <ButtonGradient
                                colors={['#59ba49','#009157']}
                                style={{borderRadius: 30}}
                              >  
                                <TouchableOpacity style={{paddingRight: 15, paddingLeft: 15, paddingTop: 5, paddingBottom: 5}}
                                  onPress={() => this.handelViewUrl(data.media_url)}
                                >
                                  <Text style={{color:'white', fontSize: 12}}>View</Text>
                                </TouchableOpacity>
                              </ButtonGradient>
                            </View>
                          </Right>
                      </ListItem>
                  }
                />
              :
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: deviceHeight / 6}}>
                  <Image source={emptyReport} style={{resizeMode: "contain", alignSelf: 'center', width: 250}} />
                  <Text style={{marginTop: 20}}>Report URL not yet available</Text>
                </View>
            }

            </Content>

        </Container>
      </StyleProvider>
    );
  }
}

const stylesTerm = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
});

export default Report;
