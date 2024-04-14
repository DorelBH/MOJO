import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InputChooser from '../../components/InputChooser';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { apiUrl } from "../../api";
import { getToken } from "../../util/authToken"; 
import useAuthCheck from '../../hooks/useAuthCheck';

const NewEventScreen = () => {
  useAuthCheck();
  const [eventType, setEventType] = useState('');
  const [username, setUsername] = useState(''); 
  const navigation = useNavigation();
  const options = ["חתונה", "חינה", "בר/בת מצווה", "ברית", "אירוע פרטי"];

  useEffect(() => {
    fetchUserData(setUsername);
  }, []);


    const fetchUserData = async () => {
      const token = await getToken();
      if (token) {
        try {
          const response = await fetch(`${apiUrl}/api/events/newEvent`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const responseData = await response.json();
          if (response.ok) {
            setUsername(responseData.username); 
          } else {
            throw new Error(responseData.message || 'Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

  const handleEventTypeChange = (value) => {
    setEventType(value);
  };

  const onContinuePressed = () => {
    if (eventType !== '') {
      navigation.navigate('EditEvent', { eventType: eventType });
    } else {
      console.warn("בחר סוג אירוע!");
    }
  };

  return (
    <View style={NewEventStyle.container}>
      <Text style={NewEventStyle.title}>Hello {username || "...."}</Text>
      <InputChooser
        options={options}
        onSelect={handleEventTypeChange}
        chooserText={eventType || 'בחר סוג אירוע'}
      />
      <Text>Selected Event Type: {eventType}</Text>
      <CustomButton
        text="הבא"
        onPress={onContinuePressed}
        type="CONTINUE"
      />
    </View>
  );
};

const NewEventStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    marginTop: 80,
  },
  title: {
    fontSize: 30,
    marginBottom: 50,
  }
});

export default NewEventScreen;
