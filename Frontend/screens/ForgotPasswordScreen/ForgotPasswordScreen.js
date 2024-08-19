import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground, useWindowDimensions, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import Boardingimage from '../../assets/images/Boardingimage.png';
import { useNavigation } from "@react-navigation/native";
import { apiUrl } from "../../api";

const ForgotPasswordScreen = () => {
    const [username, setUsername] = useState('');
    const navigation = useNavigation();
    const { height } = useWindowDimensions();

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

            const responseData = await response.json();

            if (response.ok) {
                navigation.navigate("NewPassword", { username });
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
        <ImageBackground
            source={Boardingimage}
            style={forgotStyles.backgroundImage}
            resizeMode="cover"
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={[forgotStyles.container, { marginTop: height * 0.68 }]}>
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
                                type="MAINBROWN"
                            />

                            <CustomButton 
                                text="חזרה להתחברות" 
                                onPress={onSignInPress} 
                                type="TERTIARY"
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};

const forgotStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontFamily: 'AcademyEngravedLetPlain',
        color: 'white',
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
    }
});

export default ForgotPasswordScreen;
