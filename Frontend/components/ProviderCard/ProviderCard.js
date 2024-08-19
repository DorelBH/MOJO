import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const ProviderCard = ({ name, imageUrl, description, price, phone, whatsapp, gallery, address }) => {
  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate('ProviderDetails', {
      name,
      imageUrl,
      description,
      price,
      phone,
      whatsapp,
      gallery,
      address
    });
  };

  const openWhatsApp = () => {
    if (!phone) {
      Alert.alert('שגיאה', 'מספר הטלפון אינו זמין');
      return;
    }

    // ניקוי מספר הטלפון מכל תו שאינו ספרה
    const cleanedPhoneNumber = phone.replace(/\D/g, '');
    
    // בדיקה אם מדובר במספר קווי בישראל שלא מתאים ל-WhatsApp
    const isLandline = /^0[23489]/.test(cleanedPhoneNumber);

    if (isLandline) {
      Alert.alert('שגיאה', 'מספר טלפון זה אינו נתמך ב-WhatsApp');
      return;
    }

    // הוספת קוד מדינה למספר הטלפון
    const fullPhoneNumber = `972${cleanedPhoneNumber.slice(1)}`;
    const url = `https://wa.me/${fullPhoneNumber}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          Alert.alert('שגיאה', 'WhatsApp אינו מותקן או שהקישור אינו נתמך');
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleCardPress}>
      <View style={styles.content}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => Linking.openURL(`tel:${phone}`)}>
            <Icon name="phone" size={30} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={openWhatsApp}>
            <Icon name="whatsapp" size={30} color="#25D366" />
          </TouchableOpacity>
        </View>
      </View>
      <Image source={{ uri: imageUrl }} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    width: 400,
    alignSelf: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 80,
  },
});

export default ProviderCard;
