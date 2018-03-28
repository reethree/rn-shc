import React, { Component } from "react";
import { Share, Image, View, ListView, StyleSheet, TouchableOpacity, AsyncStorage, RefreshControl, ActivityIndicator, FlatList, Dimensions, Platform } from "react-native";
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
  List,
  ListItem,
  Tab,
  Tabs,
  TabHeading,
  SwipeRow,
  Grid,
  Col,
  Toast
} from "native-base";

import Swiper from 'react-native-swiper';
import Moment from 'moment';
import AwesomeAlert from 'react-native-awesome-alerts';

import getTheme from '../../../native-base-theme/components';
import commonColor from '../../../native-base-theme/variables/commonColor';

const customStyles = require('../../Styles');
const logo = require('../../../assets/images/v3/Saleshack-Logo.png');
const empty = require('../../../assets/images/No-Draft.png');
const emptyPost = require('../../../assets/images/No-Post.png');

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

import ButtonGradient from '../../components/gradient/button';
import HeaderWithDrawer from '../../components/header';

import { onSignOut } from "../../Auth";

import uuid from 'uuid';
import { connectRealm } from 'react-native-realm';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      refreshing: false,
      isLoading: true,
      name: '',
      userdata: [],
      dataSourcePosted: [],
      dataPost: [],
      swiperWidth: deviceWidth,
      showAlert: false,
      draftDelete: '',
      tabInitialPage: 0
    }
  }
  
  componentWillMount() {
    const { state } = this.props.navigation;
    if(state.params){
      if(state.params.initialPage){
        this.setState({
          tabInitialPage: 1
        })
      }else if(state.params.saveToDraft){
        Toast.show({
          text: 'Saved to Draft!',
          position: 'bottom',
          duration: 3000
        })
      }else if(state.params.invoice_id){
        return this.props.navigation.navigate("Invoice",{adsId: state.params.invoice_id});
      }
    }
  }
  
  componentDidMount() {
    // const { state } = this.props.navigation;
    // if(state.params){
      AsyncStorage.getItem('userdata')
      .then(res => {
        if(res){
          userdata = JSON.parse(res);
          this.setState({name:userdata.name, userdata:userdata});
          this.getAds(this.state.userdata).done();
        }
      })
      .catch(err => reject(err));
    // }
  }

  async getAds(userdata) {
    try {
      let response = await fetch('https://www.rukamen.com/api/v1/get_saleshack_ads', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userdata),
      });

      // if(response.success) {
        let responseJson = await response.json();
        
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.setState({
          isLoading: false,
          refreshing: false,
          dataSourcePosted: ds.cloneWithRows(responseJson.data),
          dataPost: responseJson.data
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

  _onRefresh() {
    this.setState({
      isLoading: false,
      refreshing: true
    }, function() {
      // this.getAds(this.state.userdata).done()
    });
  }

  onPressRemoveItem(item){
    const { realm } = this.props;
    realm.write(() => {
      realm.delete(item);
    });
  };

  ucfirst(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  renderSwiperItems(photos){
    if(photos.length > 0){
      return (
        <View style={{flex: 1,justifyContent: 'center'}}>
            <Image style={{height: (deviceHeight/2) - 100,width: null,position: 'relative'}} source={{uri: photos[0]}} />
        </View>
      );
      // return photos.map((item, index) => {
      //   return (
      //     <View key={index} style={{flex: 1,justifyContent: 'center'}}>
      //         <Image style={{height: (deviceHeight/2) - 30,width: null,position: 'relative'}} source={{uri: item}} />
      //     </View>
      //   );
      // });
    }else{
      return null;
    }
  }

  onScrollMoveFooter(event) {
    const currentOffset = event.nativeEvent.contentOffset.y
    const direction = currentOffset > this.offset ? 'down' : 'up'
    const distance = this.offset ? (this.offset - currentOffset) : 0

    alert(direction);

  }

  showAlert = (data) => {
    this.setState({
      showAlert: true,
      draftDelete: data
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
      draftDelete: ''
    });
  };

  onTabSwitch(i) {
    if(i == 1){
    //   setTimeout(() => {
    //     this.setState(previousState => {
    //       return { swiperWidth: previousState.swiperWidth+1 };
    //     });
    // }, 100);
    // setInterval(() => {
    //   this.setState(previousState => {
    //     return { swiperWidth: previousState.swiperWidth+0.1 };
    //   });
    // }, 1000);
    }
  }

  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>

          <Header
          style={{elevation: 0}}
          androidStatusBarColor="#f8961d"
          iosBarStyle="light-content"
          hasTabs
          >
            <Left style={{flex: 1}}>
              <Button
                transparent
                onPress={() => this.props.navigation.navigate("Profile")}
              >
                <Icon name="md-person" style={{ color: "#FFF" }} />
              </Button>
            </Left>
            <Body style={{ flex: 1,  justifyContent: 'center', alignItems: 'center' }}>
              <View>
                <Image source={logo} style={{width: 115, height: 20, resizeMode: "contain"}} />
              </View>
            </Body>
            <Right style={{flex: 1}}>
              <Button transparent iconLeft small
              onPress={() => this.props.navigation.navigate('Support')}
              // onPress={() => this.showShare()}
              >
                <Icon name="ios-information-circle-outline" style={{ color: "#FFF", fontSize: 30 }} />
              </Button>
            </Right>

          </Header>
          <Tabs initialPage={this.state.tabInitialPage} locked={true} onChangeTab={({ i, ref, from }) => this.onTabSwitch(i)}>
            <Tab heading="Draft">
              <Content padder>
                {(this.props.items.filtered('category = "Draft" AND unique_id = "'+this.state.userdata.unique_id+'"').length > 0) ? 
                  <ListView style={{marginBottom: 30}}
                    enableEmptySections
                    dataSource={this.ds.cloneWithRows(this.props.items.filtered('category = "Draft"'))}
                    renderRow={data =>
                      <Card>
                        <CardItem cardBody style={{padding: 20, marginTop: 10}}>
                          <Body>
                            <Text style={{alignSelf:'flex-start'}}>{this.ucfirst(data.property_type)}</Text>
                          </Body>
                          <Right>
                            <Button
                              danger
                              transparent
                              onPress={() => this.showAlert(data)}
                            >
                              <Icon active name="trash" style={{fontSize: 25}} />
                            </Button>
                          </Right>
                        </CardItem>

                        <CardItem cardBody style={{padding: 20, marginBottom: 10}}>
                          <Body>
                            <Text style={{alignSelf:'flex-start'}}>{data.property_name} - {this.ucfirst(data.want_to)}</Text>
                            <Text numberOfLines={1} note>{data.address}</Text>
                          </Body>
                        </CardItem>

                        <CardItem cardBody style={{alignSelf: 'center', justifyContent: 'center', padding: 20, marginBottom: 10}}>
                          <Body>
                            <Grid>
                              <Col>
                                <Text numberOfLines={1} note>Create Date</Text>
                                <Text>{Moment(data.postDate).format('DD MMM YYYY')}</Text>
                              </Col>
                              <Col>
                                <ButtonGradient
                                  colors={['#3db54a','#00af84']}
                                  style={{alignSelf: 'center', justifyContent: 'center'}}
                                >
                                  <Button block transparent
                                    style={{ width: '100%'}}
                                    onPress={() => this.props.navigation.navigate("StepFive",{adsId: data.id})}
                                  >
                                    <Text style={{color:'#FFF', fontWeight: 'bold', marginRight: 10}}>Continue</Text>
                                  </Button>
                                </ButtonGradient>
                              </Col>
                            </Grid>                       
                          </Body>

                        </CardItem>
                      </Card>
                    }
                    />
                :
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: deviceHeight / 6}}>
                    <Image source={empty} style={{resizeMode: "contain", alignSelf: 'center', width: 250}} />
                    <Text style={{marginTop: 20}}>You don't have any draft yet</Text>
                  </View>
                }
                
              </Content>
            </Tab>
            <Tab heading="Posted">
            <Content padder>
              {(this.state.isLoading) ?
                  <ActivityIndicator size="large" color="#000" style={{marginTop: 30}} />
                :
                  (this.state.dataPost.length > 0) ? 
                  <ListView style={{marginBottom: 30}}
                    dataSource={this.state.dataSourcePosted}
                    renderRow={(data) =>
                      <Card
                        // style={{shadowColor: 'transparent',shadowOpacity: 0,elevation: 1}}
                      >
                        <CardItem cardBody bordered style={{position: 'relative'}}>
                          {this.renderSwiperItems(data.photos_)}
                        </CardItem>
                        <CardItem bordered>
                          <Body>
                            <TouchableOpacity
                              onPress={() => this.props.navigation.navigate("DetailPost",{adsId: data.id})}
                            >
                              <Text style={{fontWeight:'bold',fontSize:16}}>{data.title}</Text>
                            </TouchableOpacity>
                            <Text note style={{fontSize:14}}>{this.ucfirst(data.property_type)}</Text>
                          </Body>
                        </CardItem>
                        <CardItem content bordered>
                          <Body>
                            <Grid>
                              <Col>
                                <Text numberOfLines={1} note>Posted Date</Text>
                                <Text style={{fontSize:14}}>{Moment(data.created_at).format('DD MMM YYYY')}</Text>
                              </Col>
                              <Col>
                                <Text style={{fontSize:14}}>{data.property_name}</Text>
                                <Text numberOfLines={1} note>Status : {data.status}</Text>
                              </Col>
                            </Grid>
                          </Body>
                        </CardItem>
                      </Card>
                    }
                    enableEmptySections
                    disableRightSwipe={true}
                    renderLeftHiddenRow={data =>
                      <Button full onPress={() => alert(data)}>
                        <Icon active name="information-circle" />
                      </Button>
                    }
                    renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                      <Button full danger
                      onPress={() => this.showAlert(data)}
                      >
                        <Icon active name="trash" />
                      </Button>
                    }
                    leftOpenValue={75}
                    rightOpenValue={-75}
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                      />
                    }
                    onScroll={this.onScrollMoveFooter.bind(this)}
                    scrollEventThrottle={16}
                  />
                  :
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: deviceHeight / 6}}>
                    <Image source={emptyPost} style={{resizeMode: "contain", alignSelf: 'center', width: 250}} />
                    <Text style={{marginTop: 20}}>You don't have any post yet</Text>
                  </View>
                }
              </Content>
            </Tab>
          </Tabs>

          <Footer padder style={{backgroundColor: '#fff', borderColor: 'transparent', height: 65}}>
            <ButtonGradient
              colors={['#3db54a','#00af84']}
              style={customStyles.footerBtn}
            >
              <Button block transparent
              onPress={() => this.props.navigation.navigate("CreateAds")}
              >
                <Text style={{fontWeight: 'bold', color: '#FFF'}}>Create New Post</Text>
              </Button>
            </ButtonGradient>
          </Footer>

          {(this.state.showAlert) ?
            <AwesomeAlert
              show={this.state.showAlert}
              showProgress={false}
              title="Confirmation Delete Draft"
              message="Are you sure to delete this draft?"
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              showConfirmButton={true}
              cancelText="No, cancel"
              confirmText="Yes, delete it"
              confirmButtonColor="#DD6B55"
              onCancelPressed={() => {
                this.hideAlert();
              }}
              onConfirmPressed={() => {
                this.onPressRemoveItem(this.state.draftDelete);
              }}
            />
            :
            null
          }

        </Container>
      </StyleProvider>
    );
  }
}

// export default Dashboard;
export default connectRealm(Dashboard, {
  schemas: ['Item'],
  mapToProps(results, realm) {
    return {
      realm,
      items: results.items || [],
    };
  },
});

{/* <List
  dataSource={this.ds.cloneWithRows(this.props.items.filtered('category = "Draft"'))}
  renderRow={data =>
    <ListItem style={{ marginLeft: 0 }}
      onPress={() => this.props.navigation.navigate("StepFive",{adsId: data.id})}
    >
      <Body>
        <Text style={{alignSelf:'flex-start'}}>{this.ucfirst(data.property_type)}</Text>
        <Text style={{alignSelf:'flex-start'}}>{data.property_name} - {this.ucfirst(data.want_to)}</Text>
        <Text numberOfLines={1} note>{data.address}</Text>
      </Body>
    </ListItem>
  }
  enableEmptySections
  disableRightSwipe={true}
  renderLeftHiddenRow={data =>
    <Button full onPress={() => alert(data)}>
      <Icon active name="information-circle" />
    </Button>}
  renderRightHiddenRow={(data, secId, rowId, rowMap) =>
    <Button full danger
    onPress={() => this.onPressRemoveItem(data)}
    >
      <Icon active name="trash" />
    </Button>}
  leftOpenValue={75}
  rightOpenValue={-75}
/> */}

// <List
//   dataArray={this.props.items}
//   renderRow={data =>
//       <SwipeRow
//         style={{padding: 0, margin: 0}}
//         disableRightSwipe={true}
//         rightOpenValue={-75}
//         body={
//           <TouchableOpacity
//             onPress={() => this.props.navigation.navigate("StepFive",{adsId: data.id})}
//           >
//           <View style={{ paddingLeft: 20 }}>
//             <Text style={{alignSelf:'flex-start'}}>{data.property_type}</Text>
//             <Text style={{alignSelf:'flex-start'}}>{data.property_name} - {data.want_to}</Text>
//             <Text numberOfLines={1} note>{data.address}</Text>
//           </View>
//           </TouchableOpacity>
//         }
//         right={
//           <Button danger
//             onPress={() => this.onPressRemoveItem(data)}
//           >
//             <Icon active name="trash" />
//           </Button>
//         }
//       />
//     }
// />

// <List
//   dataSource={this.ds.cloneWithRows(this.props.items.filtered('category = "Posted"'))}
//   renderRow={data =>
//     <ListItem style={{ marginLeft: 0 }}
//       onPress={() => this.props.navigation.navigate("Invoice",{adsId: data.id})}
//     >
//       <Body>
//       <Text style={{alignSelf:'flex-start'}}>{this.ucfirst(data.property_type)}</Text>
//       <Text style={{alignSelf:'flex-start'}}>{data.property_name} - {this.ucfirst(data.want_to)}</Text>
//       <Text numberOfLines={1} note>{data.address}</Text>
//       <Text numberOfLines={1} note>Status: {data.status}</Text>
//       </Body>
//     </ListItem>
//   }
//   enableEmptySections
//   disableRightSwipe={true}
//   renderLeftHiddenRow={data =>
//     <Button full onPress={() => alert(data)}>
//       <Icon active name="information-circle" />
//     </Button>
//   }
//   renderRightHiddenRow={(data, secId, rowId, rowMap) =>
//     <Button full danger
//     onPress={() => this.onPressRemoveItem(data)}
//     >
//       <Icon active name="trash" />
//     </Button>
//   }
//   leftOpenValue={75}
//   rightOpenValue={-75}
// />

// <ListItem style={{ marginLeft: 0 }}
//   onPress={() => this.props.navigation.navigate("Invoice",{adsId: data.id})}
// >
//   <Body>
//   <Text style={{alignSelf:'flex-start'}}>{this.ucfirst(data.property_type)}</Text>
//   <Text style={{alignSelf:'flex-start'}}>{data.property_name} - {this.ucfirst(data.want_to)}</Text>
//   <Text numberOfLines={1} note>{data.address}</Text>
//   <Text numberOfLines={1} note>Status: {data.status}</Text>
//   </Body>
// </ListItem>


{/* <Swiper removeClippedSubviews={this.state.isLoading}                     
    height={240}
    width={this.state.swiperWidth}
    loop={false}
    showsButtons={false}
    dot={<View style={{backgroundColor: 'rgba(255,255,255,.5)', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
    activeDot={<View style={{backgroundColor: '#fcb415', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
    paginationStyle={{
      bottom: 20
    }}
>
  {this.renderSwiperItems(data.photos_)}
</Swiper> */}