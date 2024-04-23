import React, { useState } from "react";
import { View, Image, StyleSheet, useWindowDimensions, ScrollView, ImageBackground } from "react-native";
import CustomButton from "../../components/CustomButton";
import Boardingimage from '../../assets/images/Boardingimage.png';
import { useNavigation } from "@react-navigation/native";


const SignInOrSignOutScreen = () => {


    const navigation = useNavigation();
    const { height } = useWindowDimensions(); // Get the full height of the screen

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
                <View style={[signInStyles.container,{ marginTop: height * 0.7 }]}>
                    
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
