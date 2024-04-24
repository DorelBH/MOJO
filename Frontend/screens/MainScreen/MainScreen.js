
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MainSlots from '../../components/MainSlots';
import CameraButton from '../../components/CameraButton';
import useAuthCheck from '../../hooks/useAuthCheck';
import { useRoute } from "@react-navigation/native";
import { apiUrl } from "../../api";
import { getToken } from "../../util/authToken"; 

import CoupleImage from '../../assets/images/CoupleImage.png';
import BritImage from '../../assets/images/BritImage.png';
import HennaImage from '../../assets/images/HennaImage.jpg'
import PartyImage from '../../assets/images/PartyImage.jpg'
import BarMitzvaImage from '../../assets/images/BarMitzvaImage.jpg'

const MainScreen = ({ navigation }) => {
  useAuthCheck();
  const route = useRoute();
  const { eventId } = route.params;  // קבלת ה-ID מה-HomeScreen
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    if (eventId) {
      fetchEventData(eventId);
    }
  }, [eventId,eventData]);//
  


  const fetchEventData = async (eventId) => {
    if (!eventId) return;
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
    {
      title: 'אז איך מתחילים?',
      description: 'הפכו את התכנון לחוויה חלקה ומהנה של הצקליסט שלנו! כל מה שאתם צריכים לניהול מושלם של ספקים אולמות וכל פרט נוסף.',
      image: require('../../assets/images/CheckListSlot.png'),
      buttonText: 'התחילו עכשיו',
      action: 'start'
    },
    {
      title: 'שירותי בר',
      description: 'הליך התכנון שלנו כולל מחשבון אלכוהול מותאם אישית שיעזור לכם לחשב את הכמות הנדרשת לפי מספר המוזמנים, וכן רשימת ספקים מובחרים שיספקו את השירות ברמה הגבוהה ביותר.',
      image: require('../../assets/images/bar.png'),
      buttonText: 'אלכוהול',
      action: 'ChooseMain'
    },
    {
      title: 'תמיד תהיו בבקרה על ההוצאות',
      description: 'עם מחשבון ההוצאות שלנו תוכלו לאגד ולנהל את כל ההוצאות לחתונה במקום אחד. המחשבון מאפשר לכם לשמור על התקציב ולהישאר בבקרה תמיד.',
      image: require('../../assets/images/calc.png'),
      buttonText: 'למחשבון שלנו',
      action: 'CostCalculator'
    },
    {
      title: 'רשימת מוזמנים',
      description: 'ארגן את רשימת המוזמנים בצורה הפשוטה והיעילה ביותר! עם פונקציית רשימת המוזמנים שלנו תוכל להוסיף מוזמנים בקלות מתוך אנשי הקשר שלך ולעקוב אחרי אישורי ההגעה.',
      image: require('../../assets/images/check.png'),
      image2: require('../../assets/images/plus.png'),
      action: 'GuestList'
    }
  ];
  

  const handleSlotPress = (action) => {
    if (action === 'AlcoholCalculator' && eventData) {
      navigation.navigate('AlcoholCalculator', { amountInvited: eventData.amountInvited });
    }
    if (action === 'CostCalculator' && eventData) {
      navigation.navigate('CostCalculator', {eventType:eventData.eventType,costs:eventData.costs,eventId});
    }
    if (action === 'ChooseMain' && eventData) {
      navigation.navigate('ChooseMain',{ amountInvited: eventData.amountInvited });
    }

  };


 const ImageByType = () => {
    if (!eventData) return null; // אם אין נתונים, אל תחזיר תמונה
    switch (eventData.eventType) {
      case "חתונה": return CoupleImage;
      case "חינה": return HennaImage;
      case "ברית": return BritImage;
      case "בר/בת מצווה": return BarMitzvaImage;
      case "אירוע פרטי": return PartyImage;
      default: return null;
    }
  };

  const ImageFromDB = () => {
    if (!eventData) return null; // אם אין נתונים, אל תחזיר תמונה
    return eventData.photo;
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={ImageFromDB() ? { uri: ImageFromDB() } : ImageByType()}
          style={styles.coupleImg}
        />
        <CameraButton eventId={eventId} style={styles.cameraButton} />
      </View>
      <MainSlots slotsData={slotsData} handleSlotPress={handleSlotPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '30%', 
    
  },
  coupleImg: {
    width: '100%',
    height: '100%', 
    resizeMode: 'stretch',
    
  }
});

export default MainScreen;


