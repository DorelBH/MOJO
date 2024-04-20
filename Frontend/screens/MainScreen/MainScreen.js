import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CoupleImage from '../../assets/images/CoupleImage.png';
import MainSlots from '../../components/MainSlots';
import CameraButton from '../../components/CameraButton';
import useAuthCheck from '../../hooks/useAuthCheck';
import { useRoute } from "@react-navigation/native";
import { apiUrl } from "../../api";
import { getToken } from "../../util/authToken"; 



const MainScreen = ({ navigation }) => {
  useAuthCheck();
  const route = useRoute();
  const { eventId } = route.params;  // קבלת ה-ID מה-HomeScreen
  const [eventData, setEventData] = useState(null);
  const [imageUri, setImageUri] = useState(null);

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
    { title: 'אז איך מתחילים?', description: 'הפכו את התכנון לחוויה חלקה ומהנה של הצקליסט שלנו! כל מה שאתם צריכים לניהול מושלם של ספקים אולמות וכל פרט נוסף.', image: require('../../assets/images/CheckListSlot.png') },
    { title: 'תמיד תהיו בבקרה על ההוצאות',description:'עם מחשבון ההוצאות שלנו תוכלו לאגד ולנהלאת כל ההוצאות לחתונה במקום אחד.המחשבון מאפשר לכם לשמור על התקציב ולהישאר בבקרה תמיד.', action: 'CostCalculator', image: require('../../assets/images/calc.png') },
    { title: 'רשימת מוזמנים', description: 'ארגן את רשימת המוזמנים בצורה הפשוטה והיעילה ביותר! עם פונקציית רשימת המוזמנים שלנו תוכל להוסיף מוזמנים בקלות מתוך אנשי הקשר שלך ולעקוב אחרי אישורי ההגעה.', image: require('../../assets/images/GuestList.png') },
    
  ];

  const handleSlotPress = (action) => {
    if (action === 'AlcoholCalculator' && eventData) {
      navigation.navigate('AlcoholCalculator', { amountInvited: eventData.amountInvited });
    }
    if (action === 'CostCalculator' && eventData) {
      navigation.navigate('CostCalculator', { eventType: eventData.eventType });
    }
  };

  
  const handleImageChange = (uri) => {
    console.log("selected image URI:", uri)
    setImageUri(uri); // Update imageUri state with selected image URI
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
      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image
            source={{uri: imageUri}}
            style={styles.coupleImg}
          />
        ) : (
          <Image
            source={CoupleImage}
            style={styles.coupleImg}
          />
        )}
        <CameraButton onPress={handleImageChange} style={styles.cameraButton} />
      </View>
      <MainSlots slotsData={slotsData} handleSlotPress={handleSlotPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '30%', // Adjust the height as per your image aspect ratio
  },
  coupleImg: {
    width: '100%',
    height: '100%', // Adjust the height as per your image aspect ratio
    resizeMode: 'cover',
    
  },
  
  
});

export default MainScreen;
