import React,{useState} from "react";
import { View, Text, StyleSheet,ScrollView } from "react-native";

import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

import { apiUrl } from "../../api";


import { useNavigation,useRoute} from "@react-navigation/native";

const ConfirmEmailScreen = () => {
    const [code,setCode]=useState('')
    const navigation=useNavigation();
    const route = useRoute();
    const { email } = route.params;// מהמסך הקודם
    // const apiUrl = process.env.REACT_APP_API_URL;


    const onConfirmPressed = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/users/confirmEmail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    verificationCode: code,
                    email: email,
                }),
            });

            if (!response.ok) {
                const responseData = await response.json();
                throw new Error(responseData.message || 'Confirmation failed.');
                }

                navigation.navigate('HomeScreen');
            } catch (error) {
                console.error('Error:', error.message || 'Something went wrong during confirmation.');
            }
         };



    const onSignInPress = () =>{
        navigation.navigate('SignIn')
    }



    const onResendPress = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/users/resendVerificationCode`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                }),
            });

            if (response.ok) {
                const responseData = await response.json(); // extract data from successful response
                console.warn(responseData.message); // display success message to the user
                setCode(''); // empty code - resend new
            } else {
                const responseData = await response.json(); // extract error data from response
                throw new Error(responseData.message || 'Resend Code failed.'); // throw error with message from response or default message
            }
        } catch (error) {
            console.error('Error:', error.message || 'Something went wrong during Resend.');
        }
    };

    
    return(
        <ScrollView showsVerticalScrollIndicator= {false}>
        <View style={confirmStyles.container}>
            <Text style={confirmStyles.title}>Confirm your Email</Text>

             <CustomInput 
             iconName="email-check-outline" 
             placeholder="Enter your confirmation code" 
             value={code} 
             setValue={setCode}
             validators={[{ type: 'LENGTH', val: 6 }, { type: 'REQUIRE' }]}
             errorMessage="Code must be 6 digits"
            />

             <CustomButton 
             text="Confirm" 
             onPress={onConfirmPressed}
             />

             <CustomButton 
             text="Resend code" 
             onPress={onResendPress} 
             type="SECONDARY"
             />

             <CustomButton 
             text="Back to sign in" 
             onPress={onSignInPress} 
             type="TERTIARY"
             />


        </View>
        </ScrollView>
    );
    
};

const confirmStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding:20
    },

    title:{
    fontSize:26,
    fontWeight:'bold',
    color:'#051C60',
    marginTop:60,
    marginBottom:10,
    },
    text: {
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075',
    }
});

export default ConfirmEmailScreen;
