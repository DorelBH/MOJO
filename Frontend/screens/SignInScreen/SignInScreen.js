import React, { useState } from "react";
import { View, Image, StyleSheet, useWindowDimensions, ScrollView, ImageBackground } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons";
import Boardingimage from '../../assets/images/Boardingimage.png';

import { useNavigation } from "@react-navigation/native";
import { apiUrl } from "../../api";
import { saveToken } from "../../util/authToken"; 

const SignInScreen = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const { height } = useWindowDimensions();
    const navigation = useNavigation();

    const onSignInPress = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'התחברות נכשלה.');
            }

            if (responseData.navigateTo === 'ConfirmEmail') {
                navigation.navigate("ConfirmEmail", { email: responseData.email });
            } else {
                await saveToken(responseData.token); 
                navigation.navigate("HomeScreen");
            }
        } catch (error) {
            console.error('Error:', error.message || 'משהו השתבש במהלך ההתחברות.');
        }
    };

    const onForgotPasswordPress = () => {
        navigation.navigate('ForgotPassword');
    }

    const onSignUpPress = () => {
        navigation.navigate('SignUp');
    }

    return(
        <ImageBackground
            source={Boardingimage}
            style={signInStyles.backgroundImage}
            resizeMode="cover"
        >
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[signInStyles.container, { marginTop: height * 0.6 }]}>
                    
                    <CustomInput 
                        iconName="account"
                        placeholder="שם משתמש" 
                        value={username} 
                        setValue={setUserName}
                        validators={[{ type: 'MINLENGTH', val: 3 }, { type: 'REQUIRE' }]}
                        errorMessage="שם המשתמש חייב להיות בעל 3 תווים לפחות"
                    />

                    <CustomInput 
                        iconName="lock-outline"
                        placeholder="סיסמא" 
                        value={password} 
                        setValue={setPassword} 
                        secureTextEntry={true} 
                        validators={[{ type: 'MINLENGTH', val: 8 }, { type: 'REQUIRE' }]}
                        errorMessage="הסיסמה חייבת להיות באורך של 8 תווים לפחות"
                    />

                    <CustomButton 
                        text="התחבר" 
                        onPress={onSignInPress}
                        type="MAINBROWN"
                        
                    />

                    <CustomButton 
                        text="שכחת סיסמא?" 
                        onPress={onForgotPasswordPress} 
                        type="TERTIARY"
                    />

                    <CustomButton 
                        text=" התחבר עם פייסבוק" 
                        onPress={onForgotPasswordPress} 
                        type="TERTIARY"
                    />
                    <CustomButton 
                        text="אין לך חשבון? צור אחד" 
                        onPress={onSignUpPress} 
                        type="TERTIARY"
                    />
                </View>
            </ScrollView>
        </ImageBackground>
    );
    
};

const signInStyles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        padding: 20,
 },
    
    backgroundImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default SignInScreen;
