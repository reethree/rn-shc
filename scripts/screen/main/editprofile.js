import React, { Component } from "react";
import { Image, View, StyleSheet, AsyncStorage, TouchableOpacity } from "react-native";
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
  Form,
  Toast,
  Spinner
} from "native-base";

import RNFetchBlob from 'react-native-fetch-blob';

import getTheme from '../../../native-base-theme/components';
import commonColor from '../../../native-base-theme/variables/commonColor';

import ButtonGradient from '../../components/gradient/button';
import HeaderWithBack from '../../components/header/withBack';
import FloatingLabelInput from '../../components/input/floating';

import ImagePicker from 'react-native-image-picker';

import { onSignOut } from "../../Auth";

class EditProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      unique_id: '',
      user_id: '',
      name:'',
      phone:'',
      avatar: {uri: 'https://www.buira.org/assets/images/shared/default-profile.png'},
      changePhoto: false,
      userdata: []
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('userdata')
      .then(res => {
        if(res){
          let userdata = JSON.parse(res);
          this.setState({name:userdata.name, phone:userdata.phone, user_id:userdata.id, unique_id:userdata.unique_id, userdata:userdata})
          if(userdata.photo){
            this.setState({avatar:{uri: userdata.avatar}})
          }
        }
      })
      .catch(err => reject(err));
  }

  selectPhotoTapped() {

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
      else 
      {
        let source = { uri: response.uri };
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({avatar: source, changePhoto: true})
      }
    });
  }

  _onPressChangeProfile() {

    this.setState({isLoading:true});

    if(this.state.changePhoto){
      var postData =  [
        { name : 'user_id', data: this.state.user_id },
        { name : 'unique_id', data: this.state.unique_id },
        { name : 'name', data : this.state.name},
        { name : 'phone', data : this.state.phone},
        { name : 'photo', filename : 'photo.jpg', type:'image/jpg', data: RNFetchBlob.wrap(this.state.avatar.uri.replace('file://','')) }
      ];
    }else{
      var postData =  [
        { name : 'user_id', data: this.state.user_id },
        { name : 'unique_id', data: this.state.unique_id },
        { name : 'name', data : this.state.name},
        { name : 'phone', data : this.state.phone}
      ];
    }

    RNFetchBlob.fetch('POST', 'https://www.rukamen.com/api/v1/change-profile', {
      'Content-Type' : 'multipart/form-data',
    }, postData
    ).then((res) => {
      let text = res.text()
      let json = res.json()

      // alert(text);

      if(json.success){
        let UID123_object = json.customer;
        AsyncStorage.setItem('userdata', JSON.stringify(UID123_object));

        Toast.show({
          text: json.msg,
          position: 'bottom',
          buttonText: 'OK',
          type: 'success'
        });
        this.setState({isLoading:false});
      }else{
        Toast.show({
          text: json.msg,
          position: 'bottom',
          buttonText: 'OK',
          type: 'danger'
        });
        this.setState({isLoading:false});
      }

    }).catch((err) => {
      alert(err);
    })

  }

  render() {
      
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>

        <HeaderWithBack title='Edit Profile' navigation={this.props.navigation} iconBack='md-close' helpBtn={false} />

          <Content padder>

            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                <TouchableOpacity
                    onPress={this.selectPhotoTapped.bind(this)}
                >
                    <Thumbnail large source={this.state.avatar} />
                </TouchableOpacity>
            </View>

            <Form>

              <FloatingLabelInput
                label="Your Name"
                value={this.state.name}
                onChangeText={(text) => this.setState({name:text})}
              />

              <FloatingLabelInput
                label="Phone"
                ref={'phoneNumber'}
                type={'cel-phone'}
                options={{ dddMask: '(9999) ' }}
                underlineColorAndroid='transparent'
                value={this.state.phone}
                onChangeText={(text) => this.setState({phone:text})}
              />

            </Form>

            <ButtonGradient
                colors={['#3db54a','#00af84']}
                style={{margin: 10,borderRadius: 30, marginTop: 30}}
            >              
              {(this.state.isLoading) ?
                <Button block disabled transparent>
                  <Spinner color='#FFF' /><Text style={{fontWeight: 'bold', color:'#FFF'}}>PLEASE WAIT</Text>
                </Button>
                :
                <Button block transparent
                onPress={() => this._onPressChangeProfile()}
                >
                  <Text style={{fontWeight: 'bold', color:'#FFF'}}>Change Profile</Text>
                </Button>
              }
            </ButtonGradient>

          </Content>

        </Container>
      </StyleProvider>
    );
  }
}

export default EditProfile;
