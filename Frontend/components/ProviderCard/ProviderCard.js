import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const ProviderCard = ({ name, imageUrl, description, price, phone, whatsapp, gallery }) => {
  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate('ProviderDetails', {
      name,
      imageUrl,
      description,
      price,
      phone,
      whatsapp,
      gallery, // Ensure gallery is passed to ProviderDetails
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleCardPress}>
      <View style={styles.content}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => Linking.openURL(`tel:${phone}`)}>
            <Icon name="phone" size={30} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(`https://wa.me/${whatsapp}`)}>
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
    width: 330,
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
