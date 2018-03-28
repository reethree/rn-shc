import React, { Component } from "react";
import { StackNavigator } from "react-navigation";

import Started from "./started";
import Startedv2 from "./startedv2";
import Startedv3 from "./startedv3";
import Signin from "../auth/signin";
import Signup from "../auth/signup";
import ForgotPassword from "../auth/forgot";
import Walkthrough from "./walkthrough";
import Walkthroughv2 from "./walkthroughv2";
import Support from "../support";
import Chat from "../chat";
import Conversation from "../chat/conversation.js";
import BrowserPage from "../support/browser.js";

export default (HomeNav = StackNavigator({
  Startedv3: { screen: Startedv3 },
  Started: { screen: Started },
  Startedv2: { screen: Startedv2 },
  Walkthrough: { screen: Walkthrough },
  Walkthroughv2: { screen: Walkthroughv2 },
  Signin: { screen: Signin },
  Signup: { screen: Signup },
  ForgotPassword: { screen: ForgotPassword },
  Support: { screen: Support },
  Chat: { screen: Chat },
  Conversation: { screen: Conversation },
  BrowserPage: { screen: BrowserPage }
},{
  mode: 'card',
  headerMode: 'none',
}));
