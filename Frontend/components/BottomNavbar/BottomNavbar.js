import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import LogoutButton from '../../components/LogoutButton';

const BottomNavbar = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const eventId = route.params?.eventId; // בדיקה אם eventId קיים

    return (
        <View style={styles.navbar}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={35} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => eventId && navigation.navigate('Main', { eventId })}>
                <Icon name="home" size={35} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => eventId && navigation.navigate('ChatBot', { eventId })}>
                <Icon name="reddit" size={35} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => eventId && navigation.navigate('GuestList', { eventId })}>
                <Icon name="people" size={35} color="black" />
            </TouchableOpacity>
            <LogoutButton />
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 4,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        height: 60,
    },
});

export default BottomNavbar;
