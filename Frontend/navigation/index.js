import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen/ConfirmEmailScreen';
import HomeScreen from '../screens/HomeScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from "../screens/NewPasswordScreen";
import NewEventScreen from "../screens/NewEventScreen";
import EditEventScreen from "../screens/EditEventScreen";
import SignInOrSignOutScreen from "../screens/SignInOrSignOutScreen";
// import InviteScreen from "../screens/InviteScreen";
import CheckList from "../screens/CheckList/CheckList";

import MainScreen from "../screens/MainScreen";
import AlcoholCalculatorScreen from "../screens/AlcoholCalculatorScreen/AlcoholCalculatorScreen";
import CostCalculator from "../screens/CostCalculator/CostCalculator";
import AlcoholMain from "../screens/AlcoholMain/AlcoholMain";

import ChatbotScreen from "../screens/Chatbot/ChatbotScreen";
import GuestListScreen from "../screens/GuestListScreen.js/GuestListScreen";
import AddGuestScreen from "../screens/AddGuestScreen/AddGuestScreen";
import GuestCheckScreen from "../screens/GuestCheckScreen/GuestCheckScreen";

import ProviderDetails from "../screens/ProviderDetails";;
import RavProviders from "../Providers/RavProviders";
import HallsProviders from "../Providers/HallsProviders";
import PhotographerProviders from "../Providers/PhotographerProviders";
import SongsMain from "../screens/SongsMain";
import RecommendedSongsScreen from "../screens/RecommendedSongsScreen";
import PaymentDeadlines from "../screens/PaymentDeadlines";

import HupaSongsScreen from "../screens/HupaSongsScreen/HupaSongsScreen";
import HebrewHupaSongsScreen from "../screens/HebrewHupaSongsScreen/HebrewHupaSongsScreen";
import LoazitHupaSongsScreen from "../screens/LoazitHupaSongsScreen/LoazitHupaSongsScreen";
import SlowSongsScreen from "../screens/SlowSongsScreen/SlowSongsScreen";
import HebrewSlowSongsScreen from "../screens/HebrewSlowSongsScreen/HebrewSlowSongsScreen";
import LoazitSlowSongsScreen from "../screens/LoazitSlowSongsScreen/LoazitSlowSongsScreen";

import LogoutButton from "../components/LogoutButton";
const Stack = createNativeStackNavigator();

const withLogoutButton = (Component) => {
    return (props) => (
      <React.Fragment>
        <LogoutButton />
        <Component {...props} />
      </React.Fragment>
    );
  };

const Navigation = () => {
    return (
        //hide navbar - headerShown:false
        <NavigationContainer> 
            <Stack.Navigator screenOptions={{headerShown:false}}> 
            <Stack.Screen name="SignInOrSignOut" component={SignInOrSignOutScreen}/>
            <Stack.Screen name="SignIn" component={SignInScreen}/>
            <Stack.Screen name="SignUp" component={SignUpScreen}/>
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen}/>
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
            <Stack.Screen name="NewPassword" component={NewPasswordScreen}/> 

            <Stack.Screen name="HomeScreen" component={withLogoutButton(HomeScreen)} />
        <Stack.Screen name="NewEvent" component={withLogoutButton(NewEventScreen)} />
        <Stack.Screen name="EditEvent" component={withLogoutButton(EditEventScreen)} />
        <Stack.Screen name="Main" component={withLogoutButton(MainScreen)} />
        <Stack.Screen name="AlcoholCalculator" component={withLogoutButton(AlcoholCalculatorScreen)} />
        <Stack.Screen name="CostCalculator" component={withLogoutButton(CostCalculator)} />
        <Stack.Screen name="AlcoholMain" component={withLogoutButton(AlcoholMain)} />
        <Stack.Screen name="CheckList" component={withLogoutButton(CheckList)} />
        <Stack.Screen name="ChatBot" component={withLogoutButton(ChatbotScreen)} />
        <Stack.Screen name="GuestList" component={withLogoutButton(GuestListScreen)} />
        <Stack.Screen name="AddGuest" component={withLogoutButton(AddGuestScreen)} />
        <Stack.Screen name="GuestCheck" component={withLogoutButton(GuestCheckScreen)} />
        <Stack.Screen name="ProviderDetails" component={withLogoutButton(ProviderDetails)} />
        <Stack.Screen name="RavProviders" component={withLogoutButton(RavProviders)} />
        <Stack.Screen name="HallsProviders" component={withLogoutButton(HallsProviders)} />
        <Stack.Screen name="PhotographerProviders" component={withLogoutButton(PhotographerProviders)} />
        <Stack.Screen name="SongsMain" component={withLogoutButton(SongsMain)} />
        <Stack.Screen name="RecommendedSongs" component={withLogoutButton(RecommendedSongsScreen)} />
        <Stack.Screen name="PaymentDeadlines" component={withLogoutButton(PaymentDeadlines)} />
            <Stack.Screen name="HupaSongs" component={withLogoutButton(HupaSongsScreen)}/>
            <Stack.Screen name="HebrewHupaSongs" component={HebrewHupaSongsScreen}/>
            <Stack.Screen name="LoazitHupaSongs" component={LoazitHupaSongsScreen}/>
            <Stack.Screen name="SlowSongs" component={SlowSongsScreen}/>
            <Stack.Screen name="HebrewSlowSongs" component={HebrewSlowSongsScreen}/>
            <Stack.Screen name="LoazitSlowSongs" component={LoazitSlowSongsScreen}/>

            </Stack.Navigator>
            
        </NavigationContainer>
    )
}

export default Navigation