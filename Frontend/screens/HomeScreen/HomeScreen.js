import React,{useState} from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomButton from "../../components/CustomButton";
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import EventsList from '../../components/EventList';
import { apiUrl } from "../../api";
import { getToken } from "../../util/authToken"; 


const HomeScreen = () => {
    const navigation = useNavigation();
    const [events, setEvents] = useState([]);

    const createNewEvent = () => {
        navigation.navigate("NewEvent");
    }

    const showAlert = (eventType) => {
        console.warn(`Event Type: ${eventType}`);
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
                <CustomButton
                    text="יצירת אירוע חדש"
                    onPress={createNewEvent}
                    type="HALL"
                />
                <Text style={HomeScreenStyle.title}>
                    {events.length > 0 ? "האירועים שלי:" : "לא קיימים אירועים"}
                </Text>
            </View>
            {/* כאן מציגים את רשימת האירועים */}
            <EventsList events={events} onPress={showAlert} onDeletePress={deleteEvent} />
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
