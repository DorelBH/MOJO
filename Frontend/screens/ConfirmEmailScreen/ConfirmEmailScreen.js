import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { apiUrl } from "../../api";
import { useNavigation, useRoute } from "@react-navigation/native";
import { saveToken } from "../../util/authToken"; 

const ConfirmEmailScreen = () => {
    const [code, setCode] = useState('');
    const navigation = useNavigation();
    const route = useRoute();
    const { email } = route.params; // מהמסך הקודם

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

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'אישור נכשל.');
            }
            await saveToken(responseData.token); 
            navigation.navigate('HomeScreen');
        } catch (error) {
            console.error('Error:', error.message || 'משהו השתבש במהלך האישור.');
        }
    };

    const onSignInPress = () => {
        navigation.navigate('SignIn');
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
                const responseData = await response.json(); // חילוץ הנתונים מהתגובה המוצלחת
                console.warn(responseData.message); // הצגת הודעת ההצלחה למשתמש
                setCode(''); // נקה את הקוד - שלח חדש
            } else {
                const responseData = await response.json(); // חילוץ נתוני השגיאה מהתגובה
                throw new Error(responseData.message || 'שליחת הקוד נכשלה.'); // הטלת שגיאה עם הודעה מהתגובה או הודעה דיפולטיבית
            }
        } catch (error) {
            console.error('Error:', error.message || 'משהו השתבש במהלך שליחת הקוד.');
        }
    };

    
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={confirmStyles.container}>
                <Text style={confirmStyles.title}>אשר את כתובת הדוא"ל שלך</Text>

                <CustomInput 
                iconName="email-check-outline" 
                placeholder="הכנס את קוד האישור שלך" 
                value={code} 
                setValue={setCode}
                validators={[{ type: 'LENGTH', val: 6 }, { type: 'REQUIRE' }]}
                errorMessage="הקוד חייב להיות בן 6 ספרות"
                keyboardType="numeric"
                />

                <CustomButton 
                text="אשר" 
                onPress={onConfirmPressed}
                />

                <CustomButton 
                text="שלח שוב את הקוד" 
                onPress={onResendPress} 
                type="SECONDARY"
                />

                <CustomButton 
                text="חזור להתחברות" 
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

export default ConfirmEmailScreen;
