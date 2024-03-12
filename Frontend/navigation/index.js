import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen/ConfirmEmailScreen';
import HomeScreen from '../screens/HomeScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';


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

            <Stack.Screen name="HomeScreen" component={HomeScreen}/>

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation