import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const EventDetails = ({ event }) => {
  if (event.eventType === "חתונה" || event.eventType === "חינה") {
    return (
      <>
        <Text style={CardStyles.description}>{event.eventType} של {event.groomName} & {event.brideName}</Text>
      </>
    );
  } else {
    return <Text style={CardStyles.description}>{event.eventType} של {event.name}</Text>;
  }
};

const EventsList = ({ events, onPress, onDeletePress, onEditPress }) => {
  return (
    <ScrollView>
      {events.map((event, index) => (
        <View 
            key={index} 
            style={CardStyles.cardContainer}
        >
          <View style={CardStyles.buttonsContainer}>
            <TouchableOpacity onPress={() => onDeletePress(event._id)} style={CardStyles.deleteButton}>
              <Icon name="trash-can-outline" size={24} color="red" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onEditPress(event._id, event.eventType)} style={CardStyles.editButton}>
              <Icon name="pencil" size={24} color="#00308F" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => onPress(event._id, event)} style={CardStyles.cardContentContainer}>
            <View style={CardStyles.cardContent}>
              <View style={CardStyles.textContainer}>
                <Text style={CardStyles.title}>{event.eventType}</Text>
                <EventDetails event={event} />
              </View>
              {event.photo && (
                <Image source={{ uri: event.photo }} style={CardStyles.eventImage} />
              )}
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const CardStyles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row', 
    backgroundColor: '#fff',
    padding: 20,
    width: '100%',
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
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContentContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventImage: {
    width: 50,
    height: 50,
    borderRadius: 20,
    marginLeft: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'right',
  },
  description: {
    textAlign: 'right',
  },
  deleteButton: {
    marginRight: 10,
  },
  editButton: {
    marginRight: 10,
  },
});

export default EventsList;
