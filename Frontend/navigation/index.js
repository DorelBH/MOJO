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
// import InviteScreen from "../screens/InviteScreen";


import MainScreen from "../screens/MainScreen";
import AlcoholCalculatorScreen from "../screens/AlcoholCalculatorScreen/AlcoholCalculatorScreen";
import CostCalculator from "../screens/CostCalculator/CostCalculator";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        //hide navbar - headerShown:false
        <NavigationContainer> 
            <Stack.Navigator screenOptions={{headerShown:false}}> 
            <Stack.Screen name="SignIn" component={SignInScreen}/>
            <Stack.Screen name="SignUp" component={SignUpScreen}/>
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen}/>
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
            <Stack.Screen name="NewPassword" component={NewPasswordScreen}/> 
            <Stack.Screen name="HomeScreen" component={HomeScreen}/>
            <Stack.Screen name="NewEvent" component={NewEventScreen}/>
            <Stack.Screen name="EditEvent" component={EditEventScreen}/>
            <Stack.Screen name="Main" component={MainScreen}/> 
            <Stack.Screen name="AlcoholCalculator" component={AlcoholCalculatorScreen}/>
            <Stack.Screen name="CostCalculator" component={CostCalculator}/>
            {/* <Stack.Screen name="InviteScreen" component={InviteScreen}/> */}

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation