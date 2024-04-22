import React, { useState } from "react";
import { View, Image, StyleSheet, useWindowDimensions, ScrollView, ImageBackground } from "react-native";
import CustomButton from "../../components/CustomButton";
import Boardingimage from '../../assets/images/Boardingimage.png';
import { useNavigation } from "@react-navigation/native";
import { apiUrl } from "../../api";
import { saveToken } from "../../util/authToken"; 

const SignInOrSignOutScreen = () => {

    const navigation = useNavigation();

    const onSignInPress = () => {
        navigation.navigate('SignIn');
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
                <View style={signInStyles.container}>
                    
                    <CustomButton 
                        text="התחבר" 
                        onPress={onSignInPress}
                        type="MAINBROWN"
                    />
                    <CustomButton 
                        text="הירשם" 
                        type="MAINGRAY"
                        onPress={onSignUpPress}  
                    />
                </View>
            </ScrollView>
        </ImageBackground>
    );
   
};

const signInStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
        marginTop: '200%',
    },
    logo: {
        maxHeight: 200,
        maxWidth: 200,
        resizeMode: 'contain'
    },
    backgroundImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default SignInOrSignOutScreen;
