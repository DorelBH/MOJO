import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFocusEffect } from '@react-navigation/native';
import { apiUrl } from "../../api";
import { getToken } from "../../util/authToken"; 

const GuestListScreen = ({ navigation, route }) => {
  const eventId = route && route.params && route.params.eventId ? route.params.eventId : null;
  const [guests, setGuests] = useState([]);
  const [selectedGuests, setSelectedGuests] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      if (eventId) {
        fetchGuests(eventId);
      }
    }, [eventId])
  );

  const fetchGuests = async (eventId) => {
    if (!eventId) return;
    const token = await getToken();
    try {
      const response = await fetch(`${apiUrl}/api/events/getGuests/${eventId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setGuests(data.guests);
      } else {
        throw new Error(data.message || 'Failed to fetch guests');
      }
    } catch (error) {
      console.error('Error fetching guests:', error);
    }
  };

  const toggleSelectGuest = (guest) => {
    setSelectedGuests((prevSelected) => {
      if (prevSelected.includes(guest)) {
        return prevSelected.filter((g) => g !== guest);
      } else {
        return [...prevSelected, guest];
      }
    });
  };

  const removeSelectedGuests = () => {
    setGuests((prevGuests) => prevGuests.filter((guest) => !selectedGuests.includes(guest)));
    setSelectedGuests([]);
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
      <Text style={styles.title}>רשימת מוזמנים</Text>
      <FlatList
        data={guests}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddGuest', { eventId, guests })}>
        <Image source={require('../../assets/images/plus.png')} style={styles.addIcon} />
      </TouchableOpacity>
      {selectedGuests.length > 0 && (
        <TouchableOpacity style={styles.deleteButton} onPress={removeSelectedGuests}>
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
});

export default GuestListScreen;
