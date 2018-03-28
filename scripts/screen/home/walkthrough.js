import React, { Component } from 'react';
import { Platform, Image } from 'react-native';

import { Container, Content, Text, Button, Icon, View, H3, Footer, StyleProvider } from 'native-base';
import HeaderWithBack from '../../components/header/withBack';
import styles from './styles';

import getTheme from '../../../native-base-theme/components';
import commonColor from '../../../native-base-theme/variables/commonColor';
const customStyles = require('../../Styles');

const Competition = require('../../../assets/images/Competition-Analysis.png');
const Enhancement = require('../../../assets/images/Detail-Enhancement.png');
const Outreach = require('../../../assets/images/Maximum-Outreach.png');
const Commission = require('../../../assets/images/No-Commission.png');

class Walkthrough extends Component {
    render() {
        return (
          <StyleProvider style={getTheme(commonColor)}>
            <Container>
              <HeaderWithBack title='Why SALESHACK' helpBtn={true} navigation={this.props.navigation} />
                <Content scrollEnabled={true}>

                  <View padder style={{backgroundColor: '#faa934'}}>
                    <H3 style={{textAlign: 'center', fontWeight: 'bold', marginTop: 20}}>Maximum Outreach</H3>
                    <Image source={Outreach} style={customStyles.imageFullCenter} />
                    <Text style={{textAlign:'center', marginBottom:10,fontSize: 14}}>Kami akan menyebarkan iklan Anda di lebih dari 15 channel online, di SEMUA website properti ber-reputasi, website marketplace, forum dan group, hingga media sosial.</Text>
                  </View>

                  <View padder>
                    <H3 style={{textAlign: 'center', fontWeight: 'bold', marginTop: 20}}>Competition Analysis</H3>
                    <Image source={Competition} style={customStyles.imageFullCenter} />
                    <Text style={{textAlign:'center', marginBottom:10,fontSize: 14}}>Menentukan harga sangatlah penting. Kami akan membantu Anda mencarikan properti sejenis untuk memudahkan Anda dalam menentukan harga yang paling tepat di pasaran.</Text>
                  </View>

                  <View padder style={{backgroundColor: '#faa934'}}>
                    <H3 style={{textAlign: 'center', fontWeight: 'bold', marginTop: 20}}>Detail Enhancement</H3>
                    <Image source={Enhancement} style={customStyles.imageFullCenter} />
                    <Text style={{textAlign:'center', marginBottom:10,fontSize: 14}}>Kami akan membantu Anda dalam pengeditan foto properti Anda apabila diperlukan dan penambahan informasi secara lengkap agar iklan properti Anda lebih menarik dan menjual di pasaran!</Text>
                  </View>

                  <View padder>
                    <H3 style={{textAlign: 'center', fontWeight: 'bold', marginTop: 20}}>No Commission</H3>
                    <Image source={Commission} style={customStyles.imageFullCenter} />
                    <Text style={{textAlign:'center', marginBottom:10,fontSize: 14}}>Tidak ada biaya tambahan apabila properti Anda terjual atau tersewa!</Text>
                  </View>
                </Content>
                <Footer padder style={{backgroundColor: '#f8961d', borderColor: 'transparent', height: 65}}>

                    <Button block success iconRight style={styles.interestBtn}
                    onPress={() => this.props.navigation.navigate("Signup")}
                    >
                      <Text style={{fontWeight: 'bold'}}>LET'S GO!</Text>
                      <Icon name='ios-arrow-dropright' />
                    </Button>

                </Footer>
            </Container>
          </StyleProvider>
        )
    }
}

export default Walkthrough;

// <Swiper
//     loop={false}
//     dot={<View style={styles.swiperDot} />}
//     activeDot={<View style={styles.swiperActiveDot} />}
// >
//     <View style={styles.slides}>
//         <Text style={Platform.OS === 'android' ? styles.apaginationText : styles.iospaginationText}>
//             1 of 3
//         </Text>
//         <Icon name='ios-paper-outline' style={styles.imageIcons} />
//         <Text numberOfLines={2} style={Platform.OS === 'android' ? styles.aText : styles.iosText}>
//             Explore the latest news from your mobile device
//         </Text>
//
//     </View>
//
//     <View style={styles.slides}>
//         <Text style={Platform.OS === 'android' ? styles.apaginationText : styles.iospaginationText}>
//             2 of 3
//         </Text>
//         <Icon name='ios-information-circle-outline' style={styles.imageIcons} />
//         <Text numberOfLines={2} style={Platform.OS === 'android' ? styles.aText : styles.iosText}>
//             Lorem Ipsum industrys standard dummy text
//         </Text>
//
//     </View>
//
//     <View style={styles.slides}>
//         <Text style={Platform.OS === 'android' ? styles.apaginationText : styles.iospaginationText}>
//             3 of 3
//         </Text>
//         <Icon name='ios-volume-up-outline' style={styles.imageIcons} />
//         <Text numberOfLines={2} style={Platform.OS === 'android' ? styles.aText : styles.iosText}>
//             Lorem Ipsum is not simply random text
//         </Text>
//         <Button
//             success block
//             onPress={() => this.props.navigation.navigate("Signup")}
//             style={{margin: 10}}
//         >
//             <Text>SOUNDS GOOD</Text>
//         </Button>
//     </View>
// </Swiper>
