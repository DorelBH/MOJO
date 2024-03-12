import React,{useState} from "react";
import { View, Text, StyleSheet,ScrollView } from "react-native";

import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

import { useNavigation } from "@react-navigation/native";
import { apiUrl } from "../../api";


const ForgotPasswordScreen = () => {
    const [username,setUsername]=useState('')
    const navigation= useNavigation();

        const onSendPressed = async () =>{
            try {
                const response = await fetch(`${apiUrl}/api/users/verifyUsername`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                    }),
                });
        

                const responseData = await response.json(); // extract data from successful response

                if(response.ok){
                    console.warn(responseData.message); // display success message to the user
                    navigation.navigate("NewPassword", { username }); //נשלח את השם משתמש שאותו רוצים לאפס
                }
                else {
                    throw new Error(responseData.message || 'verify Username failed.');
                  }
                } catch (error) {
                  console.error('Error:', error.message || 'Something went wrong during verify.');
                }
              };

    const onSignInPress = () =>{
        navigation.navigate('SignIn')
    }


    
    return(
        <ScrollView showsVerticalScrollIndicator= {false}>
        <View style={forgotStyles.container}>
            <Text style={forgotStyles.title}>Reset your password</Text>

             <CustomInput 
             iconName="account"
             placeholder="username" 
             value={username} 
             setValue={setUsername}
             validators={[{ type: 'MINLENGTH', val: 3 }, { type: 'REQUIRE' }]}
             errorMessage="Username must be at least 3 characters"
            />

             <CustomButton 
             text="Send" 
             onPress={onSendPressed}
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

const forgotStyles = StyleSheet.create({
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

export default ForgotPasswordScreen;
