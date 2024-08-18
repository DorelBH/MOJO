import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import CustomButton from "../../components/CustomButton";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import EventsList from '../../components/EventList';
import { apiUrl } from "../../api";
import { getToken } from "../../util/authToken"; 
import useAuthCheck from "../../hooks/useAuthCheck";

const HomeScreen = () => {
    useAuthCheck();
    const navigation = useNavigation();
    const [events, setEvents] = useState([]);

    const createNewEvent = () => {
        navigation.navigate("NewEvent");
    }

    const goToMain = (eventId) => {
        navigation.navigate("Main", { eventId });  // ניווט למסך Main עם מזהה האירוע
    }

    const editEvent = (eventId, eventType) => {
        navigation.navigate("EditEvent", { eventId, eventType });
    }
    
    const fetchEvents = async () => {
        const token = await getToken();
        try {
            const response = await fetch(`${apiUrl}/api/events/getEvent`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Failed to fetch event data');
            }
            setEvents(responseData.events); 
        } catch (error) {
            console.error('Error fetching event data:', error);
        }
    };

    const deleteEvent = async (eventId) => {
        const token = await getToken();
        if (token) {
        try {
          const response = await fetch(`${apiUrl}/api/events/deleteEvent/${eventId}`, { 
            method: 'DELETE', 
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
    
          const responseData = await response.json(); 
    
          if (!response.ok) {
            throw new Error(responseData.message || 'Failed to delete event.');
          }
          
          fetchEvents(); // רענון האירועים
        } catch (error) {
          console.error('Error:', error.message);
        }
        }
      };
    

    useFocusEffect(
        React.useCallback(() => {
            fetchEvents();
        }, [])
    );
    
    return (
        <View style={HomeScreenStyle.container}>
            <View style={HomeScreenStyle.content}>
                <Text style={HomeScreenStyle.title}>
                    {events.length > 0 ? "האירועים שלי" : "לא קיימים אירועים"}
                </Text>
            </View>
            {/* כאן מציגים את רשימת האירועים */}
            
            <EventsList events={events} onPress={goToMain} onDeletePress={deleteEvent} onEditPress={editEvent} />
            <TouchableOpacity style={HomeScreenStyle.addButton} onPress={createNewEvent}>
                <Image source={require('../../assets/images/plus.png')} style={HomeScreenStyle.addIcon} />
            </TouchableOpacity>
        </View>
    );
};

const HomeScreenStyle = StyleSheet.create({
    container: {
        flex: 1, // Ensure the container takes up the entire screen
        justifyContent: 'center', // Center items vertically
        alignItems: 'center', // Center items horizontally
        padding: 20,
    },
    content: {
        alignItems: 'center', 
        marginBottom: 20, 
    },
    title: {
        fontSize: 30,
        fontFamily: 'AcademyEngravedLetPlain',
        marginTop: '20%',
    },
    addButton: { 
        position: 'absolute',
        bottom: 16,
        right: 16,
        borderRadius: 50,
        padding: 16,
    },
    addIcon: {
        width: 50,
        height: 50,
        tintColor: '#cd853f',
    },
});

export default HomeScreen;
