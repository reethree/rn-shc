import React, { Component } from "react";
import { Platform, Dimensions, View, Image, TextInput, TouchableOpacity, AsyncStorage, StyleSheet, NativeModules } from 'react-native';
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
  Radio
} from "native-base";

import { Grid, Col, Row } from "react-native-easy-grid";

import getTheme from '../../../native-base-theme/components';
import commonColor from '../../../native-base-theme/variables/commonColor';
const customStyles = require('../../Styles');

import ButtonGradient from '../../components/gradient/button';
import HeaderWithBack from '../../components/header/withBack';

import { TextInputMask } from 'react-native-masked-text';

import KeyboardSpacer from 'react-native-keyboard-spacer';

import { connectRealm } from 'react-native-realm';
import Realm from 'realm';

// var ImagePicker = NativeModules.ImageCropPicker;
// import ImagePicker from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-picker';

var index = 0
const deviceWidth = Dimensions.get('window').width;

class StepFive extends Component {

  constructor(props) {
    super(props);
    this.state = {
      CertSelected: 'shm',
      avatarSource: null,
      videoSource: null,
      imagesData: [],
      imageArr: [],
      imagesUri: []
    };
  }

  componentDidMount() {
    const { realm } = this.props;
    const { state } = this.props.navigation;
    let draft = realm.objects('Item').filtered('id = "'+state.params.adsId+'"');
    let imagesDraft = JSON.parse(draft[0].images);
    if(imagesDraft){
      this.setState({imageArr:imagesDraft});
    }
  }

  onCertChange(value: string) {
    this.setState({
      CertSelected: value
    });
  }

  selectPhotoTapped() {
    // console.log('PhotoTapped');
    // console.log(ImagePicker);
    // ImagePicker.openPicker({
    //   width: 300,
    //   height: 400,
    //   cropping: true
    // }).then(image => {
    //   console.log(image);
    //   this.setState({
    //     avatarSource: image
    //   });
    // });

    const options = {
      title: 'Choose From',
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Camera',
      chooseFromLibraryButtonTitle: 'Library',
      takePhotoButtonTitleColor: '#FF0000',
      chooseFromLibraryButtonTitleColor: '#000',
      quality: 1.0,
      maxWidth: 800,
      maxHeight: 800,
      allowsEditing: true,
      storageOptions: {
        skipBackup: true
      },
      multiple: true,
      cropping: true
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        this.state.imagesUri.push(response.uri)

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        let temp = index ++
        this.state.imageArr.push(source)
        this.state.imagesData.push(response.data)
        this.setState({
            imageArr: this.state.imageArr,
            imagesUri: this.state.imagesUri,
            imagesData: this.state.imagesData,
        })

      }
    });
  }

  // selectVideoTapped() {
  //   console.log('VideoTapped');
  //   console.log(ImagePicker);
  //   // ImagePicker.openPicker({
  //   //   mediaType: "video",
  //   // }).then((video) => {
  //   //   this.setState({
  //   //     videoSource: video
  //   //   });
  //   // });
  //
  //   const options = {
  //     title: 'Video Picker',
  //     takePhotoButtonTitle: 'Take Video...',
  //     mediaType: 'video',
  //     videoQuality: 'medium'
  //   };
  //
  //   ImagePicker.showImagePicker(options, (response) => {
  //     console.log('Response = ', response);
  //
  //     if (response.didCancel) {
  //       console.log('User cancelled video picker');
  //     }
  //     else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     }
  //     else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //     }
  //     else {
  //       this.setState({
  //         videoSource: response.uri
  //       });
  //     }
  //   });
  //
  // }

  removeImage(i) {
    this.state.imageArr.splice(i,1);
    this.state.imagesUri.splice(i,1);
    this.state.imagesData.splice(i,1);
    this.setState({
        imageArr: this.state.imageArr,
        imagesUri: this.state.imagesUri,
        imagesData: this.state.imagesData
    })
  }

  onUpdateModel() {
    const { realm } = this.props;
    const { state } = this.props.navigation;

    realm.write(() => {
      realm.create('Item', {
        id: state.params.adsId,
        images: JSON.stringify(this.state.imageArr),
        imagesData: JSON.stringify(this.state.imagesData)
      }, true);
    });

    this.props.navigation.navigate("StepTwo",{adsId: state.params.adsId});
  }

  render() {
    const {state} = this.props.navigation;
    let Arr = this.state.imageArr.map((a, i) => {
      return <View key={i}
      style={{
        position: 'relative',
        borderRadius: 10,
        width: (deviceWidth/3)-20,
        height: (deviceWidth/3)-20,
        margin:5
      }}>
      <TouchableOpacity
      onPress={() => this.removeImage(i)}
      style={{
        paddingRight: 10,
        paddingLeft: 10,
        backgroundColor: '#000',
        position: 'absolute',
        zIndex: 999999}}>
        <Icon name='md-close' style={{color: '#FFF'}} />
      </TouchableOpacity>
      <Image style={{
        borderRadius: 10,
        width: (deviceWidth/3)-20,
        height: (deviceWidth/3)-20}}
        source={a} />
        </View>
    })
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>

          <HeaderWithBack title='Photo Unit' navigation={this.props.navigation} helpBtn={true} />
          <Content padder style={{backgroundColor: '#FFF'}}>
            
            <View>
              <Text style={customStyles.formLabel}>Add Photos of Your Property</Text>
              <Text style={customStyles.formLabelSub}>Tambahkan Photo Properti Anda</Text>
            </View>

            <View style={{flex: 1, alignItems: 'flex-start', flexDirection: 'row', flexWrap: 'wrap'}}>
              { Arr }
              <View key="add-image">
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                  <View style={{borderRadius: 2,
                    width: (deviceWidth/3)-20,
                    height: (deviceWidth/3)-20,
                    margin:5,
                    borderWidth: 1,
                    borderColor:'#eee',
                    alignItems: 'center',
                    backgroundColor: '#fcb415',
                    flex: 1,
                    justifyContent: 'center'}}>
                    <Icon name="md-images" style={{color: '#FFF', fontSize: 50}} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <KeyboardSpacer />

          </Content>
          <Footer padder style={{backgroundColor: '#fff', borderColor: 'transparent', height: 65}}>
            <ButtonGradient
              colors={['#3db54a','#00af84']}
              style={customStyles.footerBtn}
            >
              <Button block transparent
              onPress={() => this.onUpdateModel()}
              >
                <Text style={{fontWeight: 'bold', color: '#FFF'}}>Next</Text>
              </Button>
            </ButtonGradient>
          </Footer>
        </Container>
      </StyleProvider>
    );
  }
}

// export default StepFive;

export default connectRealm(StepFive, {
  schemas: ['Item'],
  mapToProps(results, realm) {
    return {
      realm,
      items: results.items || [],
    };
  },
});
