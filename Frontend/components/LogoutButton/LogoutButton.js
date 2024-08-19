import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // או ספריית אייקונים אחרת
import { useNavigation } from '@react-navigation/native';
import { removeToken } from '../../util/authToken'; 

const LogoutButton = () => {
    const navigation = useNavigation();

    const handleLogout = async () => {
        await removeToken(); // מחיקת הטוקן
        navigation.replace('SignInOrSignOut'); // ניווט למסך ההתחברות
    };

    return (
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Icon name="logout" size={35} color="black" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    logoutButton: {
        // הגדר סגנונות לפי הצורך שלך
    },
});

export default LogoutButton;
