import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { apiUrl } from "../../api";
import { getToken } from "../../util/authToken";
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon

const GuestCheckScreen = ({ route }) => {
  const eventId = route.params.eventId;
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showArriving, setShowArriving] = useState(false);
  const [showNotAttending, setShowNotAttending] = useState(false);
  const [showNotResponded, setShowNotResponded] = useState(false);

  useEffect(() => {
    const fetchGuests = async () => {
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
      } finally {
        setLoading(false);
      }
    };

    fetchGuests();
  }, [eventId]);

  const arrivingGuests = guests.filter(guest => guest.response === '1' || guest.response === '2');
  const notAttendingGuests = guests.filter(guest => guest.response === '0');
  const notRespondedGuests = guests.filter(guest => guest.response === null || guest.response === undefined);

  const totalArriving = arrivingGuests.reduce((total, guest) => total + (parseInt(guest.response) || 0) + 1, 0);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}  {item.response === '1' ? '1 person' : item.response === '2' ? '2 people' : ''}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>סטטוס מוזמנים</Text>

      <View style={styles.section}>
        <TouchableOpacity onPress={() => setShowArriving(!showArriving)} style={styles.touchable}>
          <Icon name={showArriving ? 'expand-less' : 'expand-more'} size={24} />
          <Text style={styles.sectionTitle}>מגיעים ({totalArriving} סה״כ)</Text>
        </TouchableOpacity>
        {showArriving && (
          <FlatList
            data={arrivingGuests}
            renderItem={renderItem}
            keyExtractor={(item) => item._id.toString()}
          />
        )}
      </View>

      <View style={styles.section}>
        <TouchableOpacity onPress={() => setShowNotAttending(!showNotAttending)} style={styles.touchable}>
          <Icon name={showNotAttending ? 'expand-less' : 'expand-more'} size={24} />
          <Text style={styles.sectionTitle}>לא מגיעים</Text>
        </TouchableOpacity>
        {showNotAttending && (
          <FlatList
            data={notAttendingGuests}
            renderItem={renderItem}
            keyExtractor={(item) => item._id.toString()}
          />
        )}
      </View>

      <View style={styles.section}>
        <TouchableOpacity onPress={() => setShowNotResponded(!showNotResponded)} style={styles.touchable}>
        <Icon name={showNotResponded ? 'expand-less' : 'expand-more'} size={24} />
          <Text style={styles.sectionTitle}>לא הגיבו</Text>
        </TouchableOpacity>
        {showNotResponded && (
          <FlatList
            data={notRespondedGuests}
            renderItem={renderItem}
            keyExtractor={(item) => item._id.toString()}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
    paddingTop: 80,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'AcademyEngravedLetPlain',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'AcademyEngravedLetPlain',
    textAlign: 'right', // Align section titles to the right
  },
  itemContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
    textAlign: 'right', // Align item texts to the right
  },
  touchable: {
    flexDirection: 'row-reverse', // Reverse row direction
  },
});

export default GuestCheckScreen;
