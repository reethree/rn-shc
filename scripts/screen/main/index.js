import React, { Component } from "react";
import { StackNavigator } from "react-navigation";

import Dashboard from "./dashboard";
import DetailPost from "./detail";
import Report from "./report";
import Profile from "./profile";
import EditProfile from "./editprofile";
import Setting from "./setting";
import Support from "../support";
import Invite from "../support/invite.js";
import Chat from "../chat";
import Conversation from "../chat/conversation.js";
import ZopimChat from "../chat/zopimchat.js";
import BrowserPage from "../support/browser.js";

import CreateAds from "../createads";
import StepOne from "../createads/stepone.js";
import StepTwo from "../createads/steptwo.js";
import StepThree from "../createads/stepthree.js";
import StepFour from "../createads/stepfour.js";
import StepFive from "../createads/stepfive.js";
import StepPreview from "../createads/steppreview.js";

import Invoice from "../invoice";
import PaymentHistory from "../invoice/paymentHistory.js";
import Midtrans from "../invoice/midtrans.js";

export default (HomeNav = StackNavigator({
  Dashboard: { screen: Dashboard },
  DetailPost: { screen: DetailPost },
  Report: { screen: Report },
  Profile: { screen: Profile },
  EditProfile: { screen: EditProfile },
  Setting: { screen: Setting },
  Support: { screen: Support },
  Invite: { screen: Invite },
  Chat: { screen: Chat },
  Conversation: { screen: Conversation },
  ZopimChat: { screen: ZopimChat },
  BrowserPage: { screen: BrowserPage },
  CreateAds: { screen: CreateAds },
  StepOne: { screen: StepOne },
  StepTwo: { screen: StepTwo },
  StepThree: { screen: StepThree },
  StepFour: { screen: StepFour },
  StepFive: { screen: StepFive },
  StepPreview: { screen: StepPreview },
  Invoice: { screen: Invoice },
  Midtrans: { screen: Midtrans },
  PaymentHistory: { screen: PaymentHistory }
},{
  mode: 'card',
  headerMode: 'none',
}));
