import React,{useState} from "react";
import { View, Text, StyleSheet,ScrollView } from "react-native";

import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

import { useNavigation ,useRoute} from "@react-navigation/native";

import { apiUrl } from "../../api";

const NewPasswordScreen = () => {
    const [code,setCode]=useState('')
    const [newPassword,setNewPassword]=useState('')
    const navigation=useNavigation();

    const route = useRoute();
    const { username } = route.params;// מהמסך הקודם


    const onSubmitPressed = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/users/resetPassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    resetCode: code,
                    newPassword:newPassword
                }),
            });

            if (!response.ok) {
                const responseData = await response.json();
                throw new Error(responseData.message || 'Reset failed.');
                }

                navigation.navigate('HomeScreen');

            } catch (error) {
                console.error('Error:', error.message || 'Something went wrong during Reset.');
            }
         };

    const onSignInPress = () =>{
        navigation.navigate('SignIn');
    }

    
    return(
        <ScrollView showsVerticalScrollIndicator= {false}>
        <View style={newPassStyles.container}>
            <Text style={newPassStyles.title}>Reset your password</Text>

             <CustomInput 
             iconName="email-check"
             placeholder="Code" 
             value={code} 
             setValue={setCode}
             validators={[ { type: 'REQUIRE' }]}
             errorMessage="Invalid code format"
            />

             <CustomInput 
             iconName="lock-outline"
             placeholder="Enter your new password" 
             value={newPassword} 
             secureTextEntry={true} 
             setValue={setNewPassword}
             validators={[{ type: 'MINLENGTH', val: 8 }, { type: 'REQUIRE' }]}
             errorMessage="Password must be at least 8 characters long"
            />

             <CustomButton 
             text="Submit" 
             onPress={onSubmitPressed}
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

const newPassStyles = StyleSheet.create({
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

export default NewPasswordScreen;
