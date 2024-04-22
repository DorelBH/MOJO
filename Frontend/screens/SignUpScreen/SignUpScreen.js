import React,{useState} from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground } from "react-native";

import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons/SocialSignInButtons";
import Boardingimage from '../../assets/images/Boardingimage.png';
import TermsOfUse from "../../components/LegalDocs/TermsOfUse";
import PrivacyPolicy from "../../components/LegalDocs/PrivacyPolicy";

import { useNavigation } from "@react-navigation/native";

import { apiUrl } from "../../api";


const SignUpScreen = () => {
    const [username,setUserName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [passwordRepeat,setPasswordRepeat]=useState('')

    const [showTermsOfUse, setShowTermsOfUse] = useState(false); 
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

    const navigation = useNavigation();

    const onRegisterPressed = async () => {

        if (password !== passwordRepeat) {
            console.warn('הסיסמאות לא זהות.');
            return;
        }

    try {
        const response = await fetch(`${apiUrl}/api/users/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
        });

        if (!response.ok) {
            const responseData = await response.json();
            throw new Error(responseData.message || 'Registration failed.');
          }
    
          navigation.navigate("ConfirmEmail", { email }); //נשלח את האימייל שאיתו נרשמנו

        } catch (error) {
          console.error('Error:', error.message || 'Something went wrong during registration.');
        }
      };


    const onSignInPress = () =>{
        navigation.navigate('SignIn');
    }

    const onTermsOfUsePressed = () =>{
        setShowTermsOfUse(!showTermsOfUse);
    }

    const onPrivacyPressed = () =>{
        setShowPrivacyPolicy(!showPrivacyPolicy);
    }

   
    return(
        <ImageBackground
        source={Boardingimage}
        style={signUpStyles.backgroundImage}
        resizeMode="cover"
        >
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={signUpStyles.container}>
            <Text style={signUpStyles.title}>צור חשבון</Text>
                
            <CustomInput 
                    iconName="account"
                    placeholder="שם משתמש" 
                    value={username} 
                    setValue={setUserName}
                    validators={[{ type: 'MINLENGTH', val: 3 }, { type: 'REQUIRE' }]}
                    errorMessage="מינימום 3 תווים"
                />
    
    
                <CustomInput 
                    iconName="email-outline"
                    placeholder="אימייל" 
                    value={email} 
                    setValue={setEmail}
                    validators={[{ type: 'EMAIL' }, { type: 'REQUIRE' }]}
                    errorMessage="אימייל לא תקין"
                />
    
    
                 <CustomInput 
                 iconName="lock-outline"
                 placeholder="סיסמא" 
                 value={password} 
                 setValue={setPassword} 
                 secureTextEntry={true}
                 validators={[{ type: 'MINLENGTH', val: 8 }, { type: 'REQUIRE' }]}
                 errorMessage="מינימום 8 תווים!" 
                 />
    
                 <CustomInput 
                 iconName="lock-outline"
                 placeholder="אימות סיסמא" 
                 value={passwordRepeat} 
                 setValue={setPasswordRepeat} 
                 secureTextEntry={true} 
                 validators={[{ type: 'MINLENGTH', val: 8 }, { type: 'REQUIRE' }]}
                 />
    
                 <CustomButton 
                 text="הירשם" 
                 onPress={onRegisterPressed}
                 type="MAINBROWN"
                 />
    

                 <CustomButton 
                 text="יש לך חשבון? התחבר" 
                 onPress={onSignInPress} 
                 type="TERTIARY"
                 />
                
                <Text style={[signUpStyles.text, {textAlign: 'right'}]}>
                בהרשמה, את/ה מאשר/ת שאתה מקבל/ת את 
                <Text style={signUpStyles.link} onPress={onTermsOfUsePressed}> תנאי השימוש</Text> ואת
                <Text style={signUpStyles.link} onPress={onPrivacyPressed}> מדיניות הפרטיות</Text> שלנו.
                </Text>
    
                
    
            {showTermsOfUse && (
              <TermsOfUse onClose={onTermsOfUsePressed} /> // Render the TermsOfUse component when showTermsOfUse is true
            )}
    
            {showPrivacyPolicy && (
                        <PrivacyPolicy visible={showPrivacyPolicy} onClose={onPrivacyPressed} />
                    )}
            </View>
        </ScrollView>
    </ImageBackground>
    );
    
};



const signUpStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
        marginTop: '100%',
    },
    backgroundImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
    fontSize:20,
    fontFamily: 'AcademyEngravedLetPlain',
    color:'white',
    
    },

    text: {
        color: 'gray',
        marginVertical: 10,
    },

    link: {
        color: '#FDB075',
        

    }
});

export default SignUpScreen;
