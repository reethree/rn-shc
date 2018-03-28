import React from 'react';
import {
  AppRegistry
} from 'react-native';
import App from './App';

import realm from './scripts/RealmPost';
import { RealmProvider } from 'react-native-realm';

class SalesHack extends React.Component {
  render() {
    return (
      <RealmProvider realm={realm}>
        <App />
      </RealmProvider>
    );
  }
}

AppRegistry.registerComponent('SalesHack', () => SalesHack);
