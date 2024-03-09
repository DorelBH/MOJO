import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUpScreen from '../screens/SignUpScreen';


const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        //hide navbar - headerShown:false
        <NavigationContainer> 
            <Stack.Navigator screenOptions={{headerShown:false}}> 
            <Stack.Screen name="SignUp" component={SignUpScreen}/>

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation