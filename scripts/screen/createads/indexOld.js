import React, { Component } from "react";
import { Platform, View, TextInput } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Grid,
  Col,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  Form,
  Picker,
  Item,
  Item as FormItem,
  Input,
  StyleProvider,
  H2,
  Textarea,
  ListItem,
  Radio,
  Label,
  Tabs,
  Tab,
  TabHeading
} from "native-base";

import getTheme from '../../../native-base-theme/components';
import commonColor from '../../../native-base-theme/variables/commonColor';
const customStyles = require('../../Styles');

import HeaderWithDrawer from '../../components/header';

class CreateAds extends Component {

  constructor(props) {
      super(props);

      this.state = {
          textInputValueApt: '',
          textInputValueBed: '',
          textInputValueBath: '',
          textInputValueParking: '',
          textInputValueCert: '',
          radio1: true,
          radio2: false,
          curr1: true,
          curr2: false,
          cond1: true,
          cond2: false,
          cond3: false
      }
  }

  toggleRadio1() {
    this.setState({
      radio1: true,
      radio2: false
    });
  }

  toggleRadio2() {
    this.setState({
      radio1: false,
      radio2: true
    });
  }

  toggleCurr1() {
    this.setState({
      curr1: true,
      curr2: false
    });
  }

  toggleCurr2() {
    this.setState({
      curr1: false,
      curr2: true
    });
  }

  toggleCond1() {
    this.setState({
      cond1: true,
      cond2: false,
      cond3: false
    });
  }
  toggleCond2() {
    this.setState({
      cond1: false,
      cond2: true,
      cond3: false
    });
  }
  toggleCond3() {
    this.setState({
      cond1: false,
      cond2: false,
      cond3: true
    });
  }

  handleTextChange(option, type){
    if(type == 'apt'){
      this.setState({textInputValueApt:option.label})
    }else if(type == 'bed'){
      this.setState({textInputValueBed:option.label})
    }else if(type == 'bath'){
      this.setState({textInputValueBath:option.label})
    }else if(type == 'cert'){
      this.setState({textInputValueCert:option.label})
    }
  }

  render() {

    let index = 0;
    const dataApt = [
        { key: index++, label: 'Residence 8 Senopati' },
        { key: index++, label: 'Kalibata City' },
        { key: index++, label: 'Thamrin Residence' },
        { key: index++, label: 'Pakubuwono Residence' },
        { key: index++, label: 'Kuningan City', customKey: 'Not a fruit' }
    ];
    const dataBed = [
        { key: index++, label: 'Studio' },
        { key: index++, label: '1BR' },
        { key: index++, label: '2BR' },
        { key: index++, label: '3BR' },
        { key: index++, label: '4BR' },
        { key: index++, label: '5BR' }
    ];
    const dataBath = [
        { key: index++, label: '1' },
        { key: index++, label: '2' },
        { key: index++, label: '3' },
        { key: index++, label: '4' },
        { key: index++, label: '5' },
        { key: index++, label: '6' }
    ];
    const dataCert = [
        { key: index++, label: 'SHM' },
        { key: index++, label: 'HGB' },
        { key: index++, label: 'Hak Pakai' },
        { key: index++, label: 'Hak Guna' },
        { key: index++, label: 'PPJB' },
        { key: index++, label: 'AJB' },
        { key: index++, label: 'Girik' },
        { key: index++, label: 'Adat' }
    ];

    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>

          <HeaderWithDrawer title='Create Ads' navigation={this.props.navigation} hasTabs='true' />
          <Tabs>
            <Tab heading={ <TabHeading><Icon name="apps" /></TabHeading>}>
              <Content padder>
                <H2>Property & Location</H2>
                <Grid>
                  <Col>
                    <Button transparent dark onPress={() => this.toggleRadio1()}>
                      <Text>SALE</Text>
                      <Radio
                        selected={this.state.radio1}
                        onPress={() => this.toggleRadio1()}
                      />
                    </Button>
                  </Col>
                  <Col>
                    <Button transparent dark onPress={() => this.toggleRadio2()}>
                      <Text>RENT</Text>
                      <Radio
                        selected={this.state.radio2}
                        onPress={() => this.toggleRadio2()}
                      />
                    </Button>
                  </Col>
                </Grid>

                <ModalSelector
                    data={dataApt}
                    animationType="fade"
                    onChange={(option) => this.handleTextChange(option,'apt') }>
                    <Item regular style={customStyles.formItem}>
                      <Input style={customStyles.formItemInput}
                      placeholder='Apartment Name'
                      editable={false}
                      value={this.state.textInputValueApt} />
                    </Item>

                </ModalSelector>
              </Content>
            </Tab>

            <Tab heading={ <TabHeading><Icon name="apps" /></TabHeading>}>
              <Content padder>
                <H2 style={{marginBottom: 10, marginTop: 10}}>Size & Dimension</H2>
                <Grid>
                  <Col style={{paddingRight: 5}}>
                    <ModalSelector
                        data={dataBed}
                        animationType="fade"
                        onChange={(option) => this.handleTextChange(option,'bed') }>
                        <Item regular style={customStyles.formItem}>
                          <Input style={customStyles.formItemInput}
                          placeholder='Bedroom'
                          editable={false}
                          value={this.state.textInputValueBed} />
                        </Item>

                    </ModalSelector>
                    <Item regular style={customStyles.formItem}>
                      <Input style={customStyles.formItemInput} placeholder='Parking Space' />
                    </Item>
                  </Col>
                  <Col>
                    <ModalSelector
                        data={dataBath}
                        animationType="fade"
                        onChange={(option) => this.handleTextChange(option,'bath') }>
                        <Item regular style={customStyles.formItem}>
                          <Input style={customStyles.formItemInput}
                          placeholder='Bathroom'
                          editable={false}
                          value={this.state.textInputValueBath} />
                        </Item>

                    </ModalSelector>
                    <Item regular style={customStyles.formItem}>
                      <Input style={customStyles.formItemInput} placeholder='Area Size' />
                    </Item>
                  </Col>
                </Grid>
              </Content>
            </Tab>
            <Tab heading={ <TabHeading><Icon name="apps" /></TabHeading>}>
              <Content padder>
                <H2 style={{marginBottom: 10, marginTop: 10}}>Summary & Price</H2>
                <Textarea style={{backgroundColor:'#FFF',borderRadius: 5}} placeholder='Summary' />
                <Grid>
                  <Col>
                    <Button transparent dark onPress={() => this.toggleCurr1()}>
                      <Text>IDR</Text>
                      <Radio
                        selected={this.state.curr1}
                        onPress={() => this.toggleCurr1()}
                      />
                    </Button>
                  </Col>
                  <Col>
                    <Button transparent dark onPress={() => this.toggleCurr2()}>
                      <Text>USD</Text>
                      <Radio
                        selected={this.state.curr2}
                        onPress={() => this.toggleCurr2()}
                      />
                    </Button>
                  </Col>
                </Grid>
                <Item regular style={customStyles.formItem}>
                  <Input style={customStyles.formItemInput} placeholder='Selling Price' />
                </Item>
              </Content>
            </Tab>
            <Tab heading={ <TabHeading><Icon name="apps" /></TabHeading>}>
              <Content padder>
                <H2 style={{marginBottom: 10, marginTop: 10}}>Additional Info</H2>
                <Grid>
                  <Col style={{paddingRight: 5}}>
                    <Item regular style={customStyles.formItem}>
                      <Input style={customStyles.formItemInput} placeholder='Tower' />
                    </Item>
                  </Col>
                  <Col style={{paddingRight: 5}}>
                    <Item regular style={customStyles.formItem}>
                      <Input style={customStyles.formItemInput} placeholder='Floor' />
                    </Item>
                  </Col>
                  <Col>
                    <Item regular style={customStyles.formItem}>
                      <Input style={customStyles.formItemInput} placeholder='View' />
                    </Item>
                  </Col>
                </Grid>
                <ModalSelector
                    data={dataCert}
                    animationType="fade"
                    onChange={(option) => this.handleTextChange(option,'cert') }>
                    <Item regular style={customStyles.formItem}>
                      <Input style={customStyles.formItemInput}
                      placeholder='Certificate'
                      editable={false}
                      value={this.state.textInputValueCert} />
                    </Item>

                </ModalSelector>
                <Text>Condition</Text>
                <Grid>
                  <Col>
                    <Button transparent dark onPress={() => this.toggleCond1()}>
                      <Text style={{fontSize: 14}}>Furnish</Text>
                      <Radio
                        selected={this.state.cond1}
                        onPress={() => this.toggleCond1()}
                      />
                    </Button>
                  </Col>
                  <Col>
                    <Button transparent dark onPress={() => this.toggleCond2()}>
                      <Text style={{fontSize: 14}}>Semi Furnish</Text>
                      <Radio
                        selected={this.state.cond2}
                        onPress={() => this.toggleCond2()}
                      />
                    </Button>
                  </Col>
                  <Col>
                    <Button transparent dark onPress={() => this.toggleCond3()}>
                      <Text style={{fontSize: 14}}>Unfurnish</Text>
                      <Radio
                        selected={this.state.cond3}
                        onPress={() => this.toggleCond3()}
                      />
                    </Button>
                  </Col>
                </Grid>
              </Content>
            </Tab>
            <Tab heading={ <TabHeading><Icon name="apps" /></TabHeading>}>
              <Content padder>

              </Content>
            </Tab>
          </Tabs>

        </Container>
      </StyleProvider>
    );
  }
}

export default CreateAds;
