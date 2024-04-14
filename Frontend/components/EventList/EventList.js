import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // ייבוא האייקונים

const EventDetails = ({ event }) => {
  if (event.eventType === "חתונה" || event.eventType === "חינה") {
    return (
      <>
        <Text>{event.eventType} של {event.groomName} & {event.brideName}</Text>
      </>
    );
  } else {
    return <Text>{event.eventType} של {event.name}</Text>;
  }
};

const EventsList = ({ events, onPress, onDeletePress }) => {
  return (
    <ScrollView>
      {events.map((event, index) => (
        <TouchableOpacity 
            key={index} 
            onPress={() => onPress(event._id, event)}
            style={CardStyles.cardContainer}
        >
          <TouchableOpacity onPress={() => onDeletePress(event._id)} style={CardStyles.deleteButton}>
              <Icon name="trash-can-outline" size={24} color="red" />
            </TouchableOpacity>

            <View style={CardStyles.cardContent}>
              <Text style={CardStyles.title}>{event.eventType}</Text>
              <EventDetails event={event} />
            </View>

          
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const CardStyles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row', 
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center', 
    justifyContent: 'space-between', 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign:'right'
  },

});

export default EventsList;
