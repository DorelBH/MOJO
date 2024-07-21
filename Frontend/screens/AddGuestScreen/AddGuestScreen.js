import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import * as Contacts from 'expo-contacts';
import useGuestServerConnect from './useGuestServerConnect'; // ייבוא useGuestServerConnect

const AddGuestScreen = ({ navigation, route }) => {
  const eventId = route && route.params && route.params.eventId ? route.params.eventId : null;
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [searchText, setSearchText] = useState(''); // New state for search text
  const [selectedContacts, setSelectedContacts] = useState(route.params.guests || []);
  const [contactPermission, setContactPermission] = useState(null);
  const [allContacts, setAllContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [showAddNewContact, setShowAddNewContact] = useState(false); // State to manage the display of new contact fields

  const { addGuest: addGuestFromServer, fetchContacts, searchContacts } = useGuestServerConnect(eventId, setSelectedContacts, setAllContacts, setFilteredContacts);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Contacts.requestPermissionsAsync();
        setContactPermission(status === 'granted');
        if (status === 'granted') {
          await fetchContacts(); // קריאה לפונקציה fetchContacts מתוך useGuestServerConnect
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    })();
  }, []);

  const addGuest = (name, phone, contactId) => {
    const newGuest = { name, phone };
    if (selectedContacts.some(contact => contact.phone === phone)) {
      Alert.alert(
        'איש הקשר קיים',
        'מספר הפלאפון כבר קיים ברשימת המוזמנים',
        [{ text: 'אישור' }]
      );
      return;
    }
    setSelectedContacts(prev => [...prev, newGuest]);
    setSelectedContactId(contactId);
    addGuestFromServer(name, phone); // שימוש בפונקציה המיובאת להוספת אורח לשרת
  };

  const handleContactSelect = (contact) => {
    if (contact.phoneNumbers.length > 0) {
      const selectedPhone = contact.phoneNumbers[0].number;
      setGuestName(contact.name);
      setGuestPhone(selectedPhone);
      addGuest(contact.name, selectedPhone, contact.id);
    } else {
      Alert.alert('לאורח לא קיים מספר פלאפון');
    }
  };

  const handleManualAdd = () => {
    if (guestName && guestPhone) {
      addGuest(guestName, guestPhone, null); // Use null as the value for contactId in this case
      setGuestName('');
      setGuestPhone('');
      setShowAddNewContact(false); // After adding, close the fields again
    } else {
      Alert.alert('תמלא בבקשה את שם איש הקשר ומספר הפלאפון שלו');
    }
  };

  const handleSearch = (text) => {
    setSearchText(text); // Update the search text state
    searchContacts(text); // קריאה לפונקציה searchContacts מתוך useGuestServerConnect
  };

  const isGuestSelected = (phone) => {
    return selectedContacts.some(contact => contact.phone === phone);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>הוסף מוזמנים</Text>
      <TextInput
        style={styles.input}
        placeholder="חפש אורח מאנשי הקשר"
        value={searchText}
        onChangeText={handleSearch} // Use the handleSearch function for the search input
      />

      {showAddNewContact && (
        <>
          <TextInput
            style={styles.input}
            placeholder="שם איש קשר חדש"
            value={guestName}
            onChangeText={text => setGuestName(text)} // Use setGuestName for the new contact name input
          />
          <TextInput
            style={styles.input}
            placeholder="מספר פלאפון איש קשר חדש"
            value={guestPhone}
            onChangeText={text => setGuestPhone(text)}
            keyboardType="numeric"
          />
          <TouchableOpacity onPress={handleManualAdd}>
            <Image source={require('../../assets/images/plus.png')} style={styles.addButton} />
          </TouchableOpacity>
        </>
      )}

      {!showAddNewContact && (
        <Button title="הוסף איש קשר חדש" onPress={() => setShowAddNewContact(true)} color='#cd853f' />
      )}

      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleContactSelect(item)}>
            <View style={styles.contactCard}>
              <Text style={styles.contactName}>{item.name}</Text>
              <Text style={styles.contactPhone}>{item.phoneNumbers && item.phoneNumbers.length > 0 ? item.phoneNumbers[0].number : ''}</Text>
              {isGuestSelected(item.phoneNumbers && item.phoneNumbers[0].number) && <Text style={styles.checkMark}>✓</Text>}
            </View>
          </TouchableOpacity>
        )}
      />

      <Button title="חזור אל רשימת המוזמנים" onPress={() => navigation.navigate('GuestList', { eventId, guests: selectedContacts })} color='#cd853f' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'AcademyEngravedLetPlain',
    marginTop: '10%',
    marginBottom: '2%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    textAlign: 'right',
  },
  contactCard: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#2f2f2f',
    borderRadius: 8,
    paddingVertical: 12,
  },
  contactName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 6,
    fontFamily: 'AcademyEngravedLetPlain',
  },
  contactPhone: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'right',
    fontFamily: 'AcademyEngravedLetPlain',
  },
  checkMark: {
    fontSize: 20,
    color: 'green',
    fontFamily: 'AcademyEngravedLetPlain',
    position: 'absolute',
    left: 16, // If you want the check mark on the left side
  },
  addButton: {
    bottom: 1,
    left: 360,
    borderRadius: 50,
    padding: 16,
    width: 24,
    height: 24,
    tintColor: '#cd853f',
  },
  textButton: {
    tintColor: '#cd853f',
  },
});

export default AddGuestScreen;
