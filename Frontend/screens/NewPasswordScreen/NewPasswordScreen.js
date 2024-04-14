import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

import { useNavigation, useRoute } from "@react-navigation/native";

import { apiUrl } from "../../api";

const NewPasswordScreen = () => {
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigation = useNavigation();

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
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={newPassStyles.container}>
                <Text style={newPassStyles.title}>אפס את סיסמתך</Text>

                <CustomInput 
                iconName="email-check"
                placeholder="קוד" 
                value={code} 
                setValue={setCode}
                validators={[ { type: 'REQUIRE' }]}
                errorMessage="פורמט הקוד אינו תקין"
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
                />

                <CustomButton 
                text="חזרה להתחברות" 
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
        padding: 20
    },

    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#051C60',
        marginTop: 60,
        marginBottom: 10,
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
