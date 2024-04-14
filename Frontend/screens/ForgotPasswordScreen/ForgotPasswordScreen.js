import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

import { useNavigation } from "@react-navigation/native";
import { apiUrl } from "../../api";


const ForgotPasswordScreen = () => {
    const [username, setUsername] = useState('');
    const navigation = useNavigation();

    const onSendPressed = async () => {
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

            const responseData = await response.json(); // חילוץ הנתונים מהתגובה המוצלחת

            if (response.ok) {
                console.warn(responseData.message); // הצגת הודעת ההצלחה למשתמש
                navigation.navigate("NewPassword", { username }); // נשלח את שם המשתמש לדף איפוס סיסמה
            } else {
                throw new Error(responseData.message || 'אימות שם משתמש נכשל.');
            }
        } catch (error) {
            console.error('Error:', error.message || 'משהו השתבש במהלך האימות.');
        }
    };

    const onSignInPress = () => {
        navigation.navigate('SignIn');
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={forgotStyles.container}>
                <Text style={forgotStyles.title}>איפוס הסיסמה שלך</Text>

                <CustomInput 
                iconName="account"
                placeholder="שם משתמש" 
                value={username} 
                setValue={setUsername}
                validators={[{ type: 'MINLENGTH', val: 3 }, { type: 'REQUIRE' }]}
                errorMessage="שם המשתמש חייב להיות בעל 3 תווים לפחות"
                />

                <CustomButton 
                text="שלח" 
                onPress={onSendPressed}
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

const forgotStyles = StyleSheet.create({
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

export default ForgotPasswordScreen;
