import React from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomButton from "../../components/CustomButton";
import { useNavigation } from '@react-navigation/native';
import EventsList from '../../components/EventList';

const HomeScreen = () => {
    const navigation = useNavigation();

    const createNewEvent = () => {
        navigation.navigate("NewEvent");
    }

    const showAlert = (message) => {
        console.warn(`לחצת על כרטיסיית "${message}"`);
    }


    // הנתונים של האירועים
    const events = [
        {
            title: "חתונה",
            description: "החתונה של דוראל וטל "
        },
        {
            title: "חינה",
            description: "החינה של דוראל וטל"
        },
    ];

    return (
        <View style={HomeScreenStyle.container}>
            <View style={HomeScreenStyle.content}>
                <CustomButton
                    text="יצירת אירוע חדש"
                    onPress={createNewEvent}
                    type="HALL"
                />
                <Text style={HomeScreenStyle.title}>האירועים שלי: </Text>
            </View>
            {/* כאן מציגים את רשימת האירועים */}
            <EventsList events={events} onPress={showAlert} />
        </View>
    );
};

const HomeScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 40,
    },
    content: {
        alignItems: 'center', 
        marginBottom: 20, 
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
    },
});

export default HomeScreen;
