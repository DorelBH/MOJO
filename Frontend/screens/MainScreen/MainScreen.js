import React, { useEffect, useState, useCallback } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import MainSlots from '../../components/MainSlots';
import CameraButton from '../../components/CameraButton';
import useAuthCheck from '../../hooks/useAuthCheck';
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { apiUrl } from "../../api";
import { getToken } from "../../util/authToken"; 
import { calculateTimeLeft } from '../../util/timeUtils';

import CoupleImage from '../../assets/images/CoupleImage.png';
import BritImage from '../../assets/images/BritImage.png';
import HennaImage from '../../assets/images/HennaImage.jpg';
import PartyImage from '../../assets/images/PartyImage.jpg';
import BarMitzvaImage from '../../assets/images/BarMitzvaImage.jpg';

const MainScreen = ({ navigation }) => {
  useAuthCheck();
  const route = useRoute();
  const { eventId } = route.params;  // קבלת ה-ID מה-HomeScreen
  const [eventData, setEventData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [showBarServices, setShowBarServices] = useState(false);

  const fetchEventData = async () => {
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

  useFocusEffect(
    useCallback(() => {
      fetchEventData();
    }, [eventId])
  );

  useEffect(() => {
    if (eventData && eventData.eventDate) {
      const interval = setInterval(() => {
        const timeLeft = calculateTimeLeft(eventData.eventDate);
        setTimeLeft(timeLeft);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [eventData]);

  const slotsData = [
    {
      title: 'אז איך מתחילים?',
      description: 'ניהול מושלם מתחיל כאן! גלו את רשימת הספקים ונותני השירות המומלצים שלנו וכל הכלים שיעזרו לכם בתכנון האירוע.',
      image: require('../../assets/images/startNow.webp'),
      buttonText: 'התחילו עכשיו',
      action: 'start'
    },
    {
      title: 'צק ליסט',
      description: 'הפכו את התכנון לחוויה חלקה ומהנה של הצקליסט שלנו! כל מה שאתם צריכים לניהול מושלם של ספקים אולמות וכל פרט נוסף.',
      image: require('../../assets/images/CheckListSlot.png'),
      buttonText: "לצ'ק ליסט שלנו",
      action: 'checkList'
    },
    {
      title: 'תשלום לספקים',
      description: 'עם המערכת שלנו תוכלו להוסיף שמות ספקים ותאריכי תשלום לספקים, לנהל את מועדי התשלום ולשמור על סדר ובקרה.',
      image: require('../../assets/images/payment.webp'),
      buttonText: 'מועדי תשלום לספקים',
      action: 'PaymentDeadlines'
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
    },
    {
      title: 'שירותי בר',
      description: 'הליך התכנון שלנו כולל מחשבון אלכוהול מותאם אישית שיעזור לכם לחשב את הכמות הנדרשת לפי מספר המוזמנים, וכן רשימת ספקים מובחרים שיספקו את השירות ברמה הגבוהה ביותר.',
      image: require('../../assets/images/bar.webp'),
      buttonText: 'אלכוהול',
      action: 'AlcoholMain'
    },
    {
      title: 'שירותי מוזיקה',
      description: 'הליך התכנון שלנו כולל רשימת שירים מומלצים לכל סוגי האירועים, וכן רשימת ספקים מובחרים של DJ שיעניקו לכם את השירות המוזיקלי ברמה הגבוהה ביותר.',
      image: require('../../assets/images/music.webp'),
      buttonText: 'מוזיקה',
      action: 'SongsMain'
    },
    {
        title: 'אולמות',
        description: 'אצלנו תמצאו מגוון אולמות וגני אירועים שמתאימים לכל סוגי האירועים. נציע לכם רשימה מובחרת של ספקים ובעלי מקצוע שיעניקו שירות ברמה הגבוהה ביותר, כדי שהאירוע שלכם יהיה בלתי נשכח.',
        image: require('../../assets/images/hall_img.webp'),
        buttonText: 'אולמות וגני אירועים',
        action: 'HallsProviders'
      },
      {
        title: 'צלמים',
        description: 'אצלנו תמצאו מגוון צלמים שמתאימים לכל סוגי האירועים. נציע לכם רשימה מובחרת של ספקים ובעלי מקצוע שיעניקו שירות ברמה הגבוהה ביותר, כדי שהאירוע שלכם יהיה בלתי נשכח.',
        image: require('../../assets/images/photographer_img.webp'),
        buttonText: 'צלמים',
        action: 'PhotographerProviders'
      }
      
      
  ];

  if (eventData && eventData.eventType === 'חתונה') {
    slotsData.push({
      title: 'רב לאירוע',
      description: 'מצא את הרב המושלם לאירוע שלך! אנו מציעים מגוון רבנים מוסמכים שיברכו אתכם ביום החשוב שלכם ויוסיפו לקדושת הטקס.',
      image: require('../../assets/images/rabbi_wedding.webp'),
      buttonText: 'רב לאירוע',
      action: 'RavProviders'
    });
  }

  const handleSlotPress = (action) => {
    if (action === 'start') {
      setShowBarServices(true);
    } else {
      if (action === 'CostCalculator' && eventData) {
        navigation.navigate('CostCalculator', { amountInvited: eventData.amountInvited, guests:eventData.guests, eventType: eventData.eventType, costs: eventData.costs, eventId });
      }
      if (action === 'AlcoholMain' && eventData) {
        navigation.navigate('AlcoholMain', { amountInvited: eventData.amountInvited, guests:eventData.guests, eventType: eventData.eventType, eventId});
      }
      if (action === 'SongsMain' && eventData) {
        navigation.navigate('SongsMain', { amountInvited: eventData.amountInvited, guests:eventData.guests, eventType: eventData.eventType});
      }
      if (action === 'checkList' && eventData) {
        navigation.navigate('CheckList', { amountInvited: eventData.amountInvited, guests:eventData.guests, eventType: eventData.eventType, checkLists: eventData.checkLists, eventId });
      }
      if (action === 'ChatBot') {
        navigation.navigate('ChatBot', { amountInvited: eventData.amountInvited, guests:eventData.guests, eventId});
      }
      if (action === 'GuestList' && eventData) {
        navigation.navigate('GuestList',{ amountInvited: eventData.amountInvited, guests:eventData.guests, eventId });
      }
      if (action === 'GuestCheck' && eventData) {
        navigation.navigate('GuestCheck',{ amountInvited: eventData.amountInvited, guests:eventData.guests, eventId });
      }
      if (action === 'RavProviders' && eventData) {
        navigation.navigate('RavProviders', { amountInvited: eventData.amountInvited, guests:eventData.guests, eventId });
      }
      if (action === 'HallsProviders' && eventData) {
        navigation.navigate('HallsProviders', { amountInvited: eventData.amountInvited, guests:eventData.guests, selectedRegions: eventData.selectedRegions, eventId });
      }
      if (action === 'PhotographerProviders' && eventData) {
        navigation.navigate('PhotographerProviders', { amountInvited: eventData.amountInvited, guests:eventData.guests, selectedRegions: eventData.selectedRegions, eventId });
      }
      if(action === 'PaymentDeadlines' && eventData) {
        navigation.navigate('PaymentDeadlines',{ amountInvited: eventData.amountInvited, guests:eventData.guests, eventId});
      }
      if(action === 'HupaSongs' && eventData) {
        navigation.navigate('HupaSongs',{eventType: eventData.eventType, amountInvited: eventData.amountInvited, guests:eventData.guests, eventId});
      }
      if(action === 'SongsMain' && eventData) {
        navigation.navigate('SongsMain',{eventType: eventData.eventType, amountInvited: eventData.amountInvited, guests:eventData.guests, eventId});
      }
    }
  };
  
  const handleBackPress = () => {
    setShowBarServices(false);
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
        <View style={styles.countdownContainer}>
          {timeLeft && (
            <View style={styles.countdown}>
              <View style={styles.countdownItem}>
                <Text style={styles.countdownValue}>{timeLeft.days}</Text>
                <Text style={styles.countdownLabel}>ימים</Text>
              </View>
              <View style={styles.countdownItem}>
                <Text style={styles.countdownValue}>{timeLeft.hours}</Text>
                <Text style={styles.countdownLabel}>שעות</Text>
              </View>
              <View style={styles.countdownItem}>
                <Text style={styles.countdownValue}>{timeLeft.minutes}</Text>
                <Text style={styles.countdownLabel}>דקות</Text>
              </View>
              <View style={styles.countdownItem}>
                <Text style={styles.countdownValue}>{timeLeft.seconds}</Text>
                <Text style={styles.countdownLabel}>שניות</Text>
              </View>
            </View>
          )}
        </View>
        <CameraButton eventId={eventId} style={styles.cameraButton} />
      </View>
      {showBarServices ? (
        <MainSlots slotsData={slotsData.filter(item => item.action === 'AlcoholMain' || item.action === 'ChatBot' || item.action === 'RavProviders' ||item.action === 'HallsProviders' ||item.action === 'PhotographerProviders' ||item.action ==='SongsMain' )} handleSlotPress={handleSlotPress} showBackButton={true} handleBackPress={handleBackPress} />
      ) : (
        <MainSlots slotsData={slotsData.filter(item => item.action !== 'AlcoholMain' && item.action !== 'RavProviders' && item.action !== 'HallsProviders' && item.action !=='PhotographerProviders' && item.action !=='SongsMain')} handleSlotPress={handleSlotPress} showBackButton={false} />
      )}
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
  },
  countdownContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  countdown: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 10,
  },
  countdownItem: {
    alignItems: 'center',
  },
  countdownValue: {
    color: 'white',
    fontSize: 24,
  },
  countdownLabel: {
    color: 'white',
    fontSize: 12,
  },
  cameraButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default MainScreen;
