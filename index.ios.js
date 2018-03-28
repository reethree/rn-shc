import React from 'react';
import {
  AppRegistry
} from 'react-native';
import App from './App';

class SaleshackApps extends React.Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('SalesHack', () => SaleshackApps);
