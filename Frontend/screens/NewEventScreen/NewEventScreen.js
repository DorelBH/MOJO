import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InputChooser from '../../components/InputChooser';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';


const NewEvent = () => {
  const [eventType, setEventType] = useState('');
  const navigation = useNavigation();

  const options = ["חתונה","חינה", "בר/בת מצווה", "ברית", "אירוע פרטי"];

  const handleEventTypeChange = (value) => {
    setEventType(value);
  };

  const onContinuePressed =() =>{
    if(eventType!=='')
    navigation.navigate('EditEvent', { eventType: eventType });
    else
    console.warn("בחר סוג אירוע!")
};

  return (
    <View style={NewEventStyle.container}>
      <Text style={NewEventStyle.title}>Hello .....</Text>
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

export default NewEvent;
