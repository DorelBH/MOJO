import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView ,ImageBackground,useWindowDimensions} from "react-native";

import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import Boardingimage from '../../assets/images/Boardingimage.png';

import { useNavigation, useRoute } from "@react-navigation/native";

import { apiUrl } from "../../api";

const NewPasswordScreen = () => {
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigation = useNavigation();
    const { height } = useWindowDimensions();

    const route = useRoute();
    const { username } = route.params; // מהמסך הקודם

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
                    newPassword: newPassword
                }),
            });

            if (!response.ok) {
                const responseData = await response.json();
                throw new Error(responseData.message || 'איפוס נכשל.');
            }

            navigation.navigate('HomeScreen');

        } catch (error) {
            console.error('Error:', error.message || 'משהו השתבש במהלך האיפוס.');
        }
    };

    const onSignInPress = () => {
        navigation.navigate('SignIn');
    }

    return(
        <ImageBackground
        source={Boardingimage}
        style={newPassStyles.backgroundImage}
        resizeMode="cover"
    >

        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[newPassStyles.container, { marginTop: height * 0.6 }]}>
                <Text style={newPassStyles.title}>אפס את סיסמתך</Text>

                <CustomInput 
                iconName="email-check"
                placeholder="קוד" 
                value={code} 
                setValue={setCode}
                validators={[ { type: 'REQUIRE' }]}
                errorMessage="פורמט הקוד אינו תקין"
                keyboardType="numeric"
                />

                <CustomInput 
                iconName="lock-outline"
                placeholder="הכנס סיסמה חדשה" 
                value={newPassword} 
                secureTextEntry={true} 
                setValue={setNewPassword}
                validators={[{ type: 'MINLENGTH', val: 8 }, { type: 'REQUIRE' }]}
                errorMessage="הסיסמה חייבת להיות באורך של לפחות 8 תווים"
                />

                <CustomButton 
                text="שלח" 
                onPress={onSubmitPressed}
                type="MAINBROWN"

                />

                <CustomButton 
                text="חזרה להתחברות" 
                onPress={onSignInPress} 
                type="TERTIARY"
                />
            </View>
        </ScrollView>
        </ImageBackground>
    );
    
};

const newPassStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
    },

    text: {
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075',
    },
    backgroundImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontFamily: 'AcademyEngravedLetPlain',
        color: 'white',
      
    },
});

export default NewPasswordScreen;
