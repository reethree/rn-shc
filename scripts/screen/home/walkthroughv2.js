import React, { Component } from "react";
import { Image, View, StyleSheet, Platform, StatusBar, Dimensions } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body,
  StyleProvider,
  H3,
  Footer
} from "native-base";

import Swiper from 'react-native-swiper';
import getTheme from '../../../native-base-theme/components';
import commonColor from '../../../native-base-theme/variables/commonColor';

import ButtonGradient from '../../components/gradient/button';
import HeaderWithDrawer from '../../components/header';

import styles from './styles';

const logo = require('../../../assets/images/v3/Saleshack-Logo.png');
const Competition = require('../../../assets/images/v3/Competition-Analysis.png');
const Enhancement = require('../../../assets/images/v3/Detail-Enhancement.png');
const Outreach = require('../../../assets/images/v3/Maximum-Outreach.png');
const Commission = require('../../../assets/images/v3/No-Commission.png');

const windowsWidth = Dimensions.get('window').width;
const windowsHeight = Dimensions.get('window').height;

class Walkthroughv2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      endOfSwiper: false,
      carousel: [
        {
          title: 'MAXIMUM OUTREACH',
          desc: 'Kami akan menyebarkan iklan Anda di lebih dari 15 channel online, di SEMUA website properti ber-reputasi, website marketplace, forum dan group, hingga media sosial.',
          image: Outreach
        },
        {
          title: 'COMPETITION ANALYSIS',
          desc: 'Menentukan harga sangatlah penting. Kami akan membantu Anda mencarikan properti sejenis untuk memudahkan Anda dalam menentukan harga yang paling tepat di pasaran.',
          image: Competition
        },
        {
          title: 'DETAIL ENHANCEMENT',
          desc: 'Kami akan membantu Anda dalam pengeditan foto properti Anda apabila diperlukan dan penambahan informasi secara lengkap agar iklan properti Anda lebih menarik dan menjual di pasaran!',
          image: Enhancement
        },
        {
          title: 'NO COMMISSION',
          desc: 'Tidak ada biaya tambahan apabila properti Anda terjual atau tersewa!',
          image: Commission
        }
      ]
    }
  }

  renderContentIos() {
      return (
        <Content scrollEnabled={false}>
          <Swiper
            ref='swiper'
            showsButtons={false}
            loop={false}
            onMomentumScrollEnd ={(e, state, context) => (state.index == 3) ? this.setState({endOfSwiper: !this.state.endOfSwiper}) : this.setState({endOfSwiper: false})}
            // dot={<View style={{backgroundColor: 'rgba(0,0,0,.3)', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
            // activeDot={<View style={{backgroundColor: '#999', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
            // paginationStyle={{
            //   bottom: (Platform.OS === 'ios') ? 150 : 20
            // }}
          >
            {this.renderItems()}
          </Swiper>
        </Content>
      );
  }

  renderItems() {
    return this.state.carousel.map((item, index) => {
      return (
        <View style={{alignItems: 'center', flex: 1, justifyContent: 'center',marginTop: Platform.OS === "ios" ? 20 : null}} key={index}>
          <Image source={item.image} style={Platform.OS === 'android' ? styles.aImgStarted : styles.iosImgStarted} />
          <H3 style={{textAlign: 'center', fontWeight: 'bold', marginTop: 20, fontSize: 16}}>{item.title}</H3>
          <Text style={{justifyContent:"center", textAlign:"center", padding: 10, fontSize: 14, fontFamily: Platform.OS === "ios" ? "System" : "Poppins_regular"}}>{item.desc}</Text>
        </View>
      );
    });
  }

  render() {
    return (

        <StyleProvider style={getTheme(commonColor)}>
          <Container style={{backgroundColor:"#fff"}}>
            <Header style={{backgroundColor:"#fff", elevation: 0}}
              androidStatusBarColor="#f2f2f2"
              iosBarStyle="dark-content"
              >
              <Left style={{ flex: 1 }} />
              <Body style={{ flex: 1,  justifyContent: 'center', alignItems: 'center' }}>
                <View>
                  <Image source={logo} style={{width: 115, height: 20, resizeMode: "contain"}} />
                </View>
              </Body>
              <Right style={{ flex: 1 }} />
            </Header>

            {(Platform.OS === 'ios') ?
              this.renderContentIos()
              :
              <Swiper
                ref='swiper'
                style={{width: windowsWidth, zIndex: 999999}}
                removeClippedSubviews={false}
                showsButtons={false}
                loop={false}
                onMomentumScrollEnd ={(e, state, context) => (state.index == 3) ? this.setState({endOfSwiper: !this.state.endOfSwiper}) : this.setState({endOfSwiper: false})}
                // dot={<View style={{backgroundColor: 'rgba(0,0,0,.3)', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
                // activeDot={<View style={{backgroundColor: '#999', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
                // paginationStyle={{
                //   bottom: (Platform.OS === 'ios') ? 150 : 20
                // }}
              >
                {this.renderItems()}
              </Swiper>
            }

            <Footer padder style={{backgroundColor: 'transparent', elevation: 0, borderColor: 'transparent', height: 130}}>
              <View style={{marginTop: 10}}>
                <ButtonGradient
                  colors={['#3db54a','#00af84']}
                  style={{margin: 10,borderRadius: 30,width: windowsWidth-80}}
                >
                {(this.state.endOfSwiper) ? 
                  <Button block transparent
                    onPress={() => this.props.navigation.navigate("Signup")}
                  >
                    <Text style={{fontSize:16,fontWeight:'bold',color: '#FFF'}}>
                        Continue
                    </Text>
                  </Button>
                :  
                  <Button block transparent
                    // onPress={() => this.props.navigation.navigate("Signup")}
                    onPress={() => this.refs.swiper.scrollBy(1)}
                  >
                    <Text style={{fontSize:16,fontWeight:'bold',color: '#FFF'}}>
                        Next
                    </Text>
                  </Button>
                }
                  
                </ButtonGradient>

                <Button transparent block
                onPress={() => this.props.navigation.navigate("Signin")}
                >
                  <Text style={{fontSize:12, color: '#999'}}>Sign In</Text>
                </Button>
              </View>
            </Footer>
          </Container>
        </StyleProvider>
    );
  }
}

export default Walkthroughv2;
