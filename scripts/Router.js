import React from "react";
import { Platform, StatusBar } from "react-native";
import { StackNavigator, DrawerNavigator, TabNavigator } from "react-navigation";
import { FontAwesome } from "react-native-vector-icons";

import Home from "./screen/home";
import Chat from "./screen/chat";
import Main from "./screen/main";
import CreateAds from "./screen/createads";
import StepOne from "./screen/createads/stepone";
import SideBar from "./components/sidebar";
import SideBarGuest from "./components/sidebar/guest";

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const SignedIn = DrawerNavigator(
  {
    Main: { screen: Main },
    // Chat: { screen: Chat },
    // CreateAds: { screen: CreateAds },
    // StepOne: { screen: StepOne },
  },
  {
    initialRouteName: "Main",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

export const SignedOut = DrawerNavigator(
  {
    Home: { screen: Home },
    // Chat: { screen: Chat },
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBarGuest {...props} />
  }
);

export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      SignedIn: {
        screen: Main,
        navigationOptions: {
          gesturesEnabled: true,
          drawerLockMode: 'locked-closed'
        }
      },
      SignedOut: {
        screen: Home,
        navigationOptions: {
          gesturesEnabled: true,
          drawerLockMode: 'locked-closed'
        }
      }
    },
    {
      headerMode: "none",
      mode: "card",
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
