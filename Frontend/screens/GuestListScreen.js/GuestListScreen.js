import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFocusEffect } from '@react-navigation/native';
import useGuestServerConnect from './useGuestServerConnect'; // ייבוא ה-Hook

const GuestListScreen = ({ navigation, route }) => {
  const eventId = route && route.params && route.params.eventId ? route.params.eventId : null;
  const [guests, setGuests] = useState([]);
  const [selectedGuests, setSelectedGuests] = useState([]);

  const { fetchGuests, sendNotificationToGuests, removeSelectedGuests } = useGuestServerConnect(eventId, setGuests, setSelectedGuests);

  useFocusEffect(
    React.useCallback(() => {
      if (eventId) {
        fetchGuests();
      }
    }, [eventId])
  );

  const toggleSelectGuest = (guest) => {
    setSelectedGuests((prevSelected) => {
      if (prevSelected.includes(guest)) {
        return prevSelected.filter((g) => g !== guest);
      } else {
        return [...prevSelected, guest];
      }
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.guestItem, selectedGuests.includes(item) && styles.selectedItem]} 
      onPress={() => toggleSelectGuest(item)}
    >
      <View style={[styles.checkbox, selectedGuests.includes(item) && styles.checked]} />
      <Text style={styles.guestName}>{item.name}</Text>
      <Text style={styles.guestStatus}>{item.status || ''}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
       <View style={styles.header}>
        <Text style={styles.title}>רשימת מוזמנים</Text>
        <TouchableOpacity style={styles.sendButton} onPress={sendNotificationToGuests}>
          
          <Icon name="message-text-outline" size={20} color="#fff" style={styles.sendButtonIcon} />
          <Text style={styles.sendButtonText}>שלח הודעות לכולם</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={guests}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddGuest', { eventId, guests })}>
        <Image source={require('../../assets/images/plus.png')} style={styles.addIcon} />
      </TouchableOpacity>
      {selectedGuests.length > 0 && (
        <TouchableOpacity style={styles.deleteButton} onPress={() => removeSelectedGuests(selectedGuests)}>
          <Icon name="trash-can-outline" size={30} color="red" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'AcademyEngravedLetPlain',
    marginTop: '10%',
    marginBottom: '2%',
  },
  guestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedItem: {
    backgroundColor: '#f0f8ff',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#00bfff',
    borderColor: '#00bfff',
  },
  guestName: {
    fontSize: 18,
    textAlign: 'right',
    flex: 1,
    marginRight: 10,
    fontFamily: 'AcademyEngravedLetPlain',
  },
  guestStatus: {
    fontSize: 16,
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
  deleteButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    borderRadius: 50,
    padding: 16,
  },
  deleteIcon: {
    width: 50,
    height: 50,
    tintColor: 'red',
  },
  sendButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 25,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    maxWidth: 200,
    marginLeft: 200,
  },
  sendButtonIcon: {
    marginLeft: 10,
    color: 'green',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'AcademyEngravedLetPlain',
    color: 'green',
  },
});

export default GuestListScreen;
