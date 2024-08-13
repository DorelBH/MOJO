// LogoutButton.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomButton from '../CustomButton';
import { useNavigation } from '@react-navigation/native';
import { removeToken } from '../../util/authToken'; 

const LogoutButton = () => {
    const navigation = useNavigation();

    const handleLogout = async () => {
        await removeToken(); // מחיקת הטוקן
        navigation.replace('SignInOrSignOut'); // ניווט למסך ההתחברות
    };

    return (
        <View style={styles.logoutButtonContainer}>
            <CustomButton
                onPress={handleLogout}
                text="Logout"
                type="LOGOUT"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    logoutButtonContainer: {
        position: 'absolute',
        top: 50, 
        right: 15, 
        zIndex: 1, 
    },
});

export default LogoutButton;
