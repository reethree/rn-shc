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
  H3
} from "native-base";

import Swiper from 'react-native-swiper';
import getTheme from '../../../native-base-theme/components';
import commonColor from '../../../native-base-theme/variables/commonColor';

import HeaderWithDrawer from '../../components/header';

import styles from './styles';

const Competition = require('../../../assets/images/v2/Competition-Analysis.png');
const Enhancement = require('../../../assets/images/v2/Detail-Enhancement.png');
const Outreach = require('../../../assets/images/v2/Maximum-Outreach.png');
const Commission = require('../../../assets/images/v2/No-Commission.png');

const windowsWidth = Dimensions.get('window').width;
const windowsHeight = Dimensions.get('window').height;

class Startedv2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
          <Text style={{alignSelf:"center", fontWeight:"bold", fontSize: 28, marginTop: 20}}>WHY SALESHACK?</Text>
          <Swiper
            showsButtons={false}
            loop={false}
            dot={<View style={{backgroundColor: 'rgba(0,0,0,.3)', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
            activeDot={<View style={{backgroundColor: '#999', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
            paginationStyle={{
              bottom: (Platform.OS === 'ios') ? 150 : 20
            }}
          >
            {this.renderItems()}
          </Swiper>
        </Content>
      );
  }

  renderItems() {
    return this.state.carousel.map((item, index) => {
      return (
        <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}} key={index}>
          <Image source={item.image} style={Platform.OS === 'android' ? styles.aImgStarted : styles.iosImgStarted} />
          <H3 style={{textAlign: 'center', fontWeight: 'bold', marginTop: 20}}>{item.title}</H3>
          <Text style={{justifyContent:"center", textAlign:"center", padding: 10}}>{item.desc}</Text>
        </View>
      );
    });
  }

  render() {
    return (

        <StyleProvider style={getTheme(commonColor)}>
          <Container style={{backgroundColor:"#fff"}}>
            <Header style={{backgroundColor:"#fff", elevation: 0}}
              androidStatusBarColor="#fff"
              iosBarStyle="dark-content"
              >
                <Right>
                  <Button transparent iconLeft small dark
                  onPress={() => this.props.navigation.navigate('Support')}
                  >
                    <Icon name="ios-information-circle-outline" />
                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>Help</Text>
                  </Button>
                </Right>
            </Header>

            {(Platform.OS === 'android') ?
              <Text style={{alignSelf:"center", fontWeight:"bold", fontSize: 28, marginTop: 20}}>WHY SALESHACK?</Text>
              :
              null
            }

            {(Platform.OS === 'ios') ?
              this.renderContentIos()
              :
              <Swiper
                style={{width: windowsWidth, zIndex: 999999}}
                removeClippedSubviews={false}
                showsButtons={false}
                loop={false}
                dot={<View style={{backgroundColor: 'rgba(0,0,0,.3)', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
                activeDot={<View style={{backgroundColor: '#999', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
                paginationStyle={{
                  bottom: (Platform.OS === 'ios') ? 150 : 20
                }}
              >
                {this.renderItems()}
              </Swiper>
            }
          </Container>
        </StyleProvider>
    );
  }
}

export default Startedv2;
