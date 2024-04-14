import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CoupleLogo from '../../components/CoupleLogo';
import MainSlots from '../../components/MainSlots';
import useAuthCheck from '../../hooks/useAuthCheck';
import { useRoute } from "@react-navigation/native";
import { apiUrl } from "../../api";
import { getToken } from "../../util/authToken"; 

const MainScreen = ({ navigation }) => {
  useAuthCheck();
  const route = useRoute();
  const { eventId } = route.params;  // קבלת ה-ID מה-HomeScreen
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    if (eventId) {
      fetchEventData(eventId);
    }
  }, [eventId]);

  const fetchEventData = async (eventId) => {
    const token = await getToken();
    try {
      const response = await fetch(`${apiUrl}/api/events/getEvent/${eventId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setEventData(data.event);
      } else {
        throw new Error(data.message || 'Failed to fetch event data');
      }
    } catch (error) {
      console.error('Error fetching event data:', error);
    }
  };

  const slotsData = [
    { slot: 'מחשבון הוצאות', icon: 'calculator' },
    { slot: 'רשימת מוזמנים', icon: 'users' },
    { slot: 'מחשבון אלכוהול', icon: 'glass', action: 'AlcoholCalculator' },
    { slot: 'אולמות', icon: 'home' },
    { slot: 'ספקים', icon: 'star' },
    { slot: 'צק ליסט', icon: 'check' },
    { slot: 'טיפים', icon: 'lightbulb-o' },
    { slot: 'בחירת שירים', icon: 'music' },
  ];

  const handleSlotPress = (action) => {
    if (action === 'AlcoholCalculator' && eventData) {
      navigation.navigate('AlcoholCalculator', { amountInvited: eventData.amountInvited });
    }
  };

/*   if (!eventData) {
    return (
      <View style={styles.container}>
        <Text>Loading event data...</Text>
      </View>
    );
  } */

  return (
    <View style={styles.container}>
      <CoupleLogo />
      <MainSlots slotsData={slotsData} handleSlotPress={handleSlotPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default MainScreen;
