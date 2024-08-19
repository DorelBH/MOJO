import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet, useWindowDimensions, ScrollView, ImageBackground } from "react-native";
import CustomButton from "../../components/CustomButton";
import Boardingimage from '../../assets/images/Boardingimage.png';
import { useNavigation } from "@react-navigation/native";
import { getToken, isTokenExpired } from "../../util/authToken";

const SignInOrSignOutScreen = () => {
    const [loading, setLoading] = useState(true); // מצב טעינה
    const navigation = useNavigation();
    const { height } = useWindowDimensions();

    useEffect(() => {
        const checkToken = async () => {
            const token = await getToken();
            if (token && !isTokenExpired(token)) {
                navigation.navigate('HomeScreen'); // מעבר אוטומטי למסך הבית
            } else {
                setLoading(false); // סיום הטעינה רק אם אין טוקן תקף
            }
        };

        checkToken();
    }, []);

    if (loading) {
        // הצגת מסך טעינה בזמן הבדיקה
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ImageBackground
            source={Boardingimage}
            style={signInStyles.backgroundImage}
            resizeMode="cover"
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[signInStyles.container, { marginTop: height * 0.7 }]}>
                    <CustomButton 
                        text="התחבר" 
                        onPress={() => navigation.navigate('SignIn')}
                        type="MAINBROWN"
                    />
                    <CustomButton 
                        text="הירשם" 
                        type="MAINGRAY"
                        onPress={() => navigation.navigate('SignUp')}  
                    />
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // רקע לבן לטעינה
    },
    container: {
        alignItems: 'center',
        padding: 20,
    },
    backgroundImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const signInStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
    },
    backgroundImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default SignInOrSignOutScreen;
