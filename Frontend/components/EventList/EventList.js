import React from 'react';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';

const EventsList = ({ events ,onPress }) => {
  return (
    <ScrollView>
      {events.map((event, index) => (
        <TouchableOpacity key={index} onPress={() => onPress(event.description)}>
            <View key={index} style={CardStyles.cardContainer}>
              <Text style={CardStyles.title}>{event.title}</Text>
              <Text>{event.description}</Text>
            </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const CardStyles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    alignItems:'flex-end',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default EventsList;
