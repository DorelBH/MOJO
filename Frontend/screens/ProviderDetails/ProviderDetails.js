import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Modal, Linking, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProviderDetails = ({ route }) => {
  const { name, imageUrl, description, price, phone, whatsapp, gallery, address } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAllImages, setShowAllImages] = useState(false);

  const handleImagePress = (img) => {
    setSelectedImage(img);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  const handleCallPress = () => {
    const url = `tel:${phone}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          console.log(`Don't know how to open URL: ${url}`);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  const handleWhatsAppPress = () => {
    const url = `https://wa.me/${whatsapp}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          console.log(`Don't know how to open URL: ${url}`);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  const handleToggleImages = () => {
    setShowAllImages(!showAllImages);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.mainImage} />
      <TouchableOpacity activeOpacity={1}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </TouchableOpacity>
      <Text style={styles.price}>מחיר ממוצע: <Text style={styles.boldText}>{price}</Text></Text>
      {address && <Text style={styles.address}><Text style={styles.boldText}>כתובת: </Text>{address}</Text>}
      <View style={styles.icons}>
        <TouchableOpacity onPress={handleCallPress}>
          <Icon name="phone" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleWhatsAppPress}>
          <Icon name="whatsapp" size={30} color="#25D366" />
        </TouchableOpacity>
      </View>
      {gallery && gallery.length > 0 && (
        <View style={styles.galleryContainer}>
          <Text style={styles.galleryTitle}>גלריה</Text>
          <View style={styles.galleryGrid}>
            {(showAllImages ? gallery : gallery.slice(0, 6)).map((img, index) => (
              <TouchableOpacity key={index} onPress={() => handleImagePress(img)}>
                <Image source={{ uri: img }} style={styles.galleryImage} />
              </TouchableOpacity>
            ))}
          </View>
          {gallery.length > 6 && (
            <TouchableOpacity onPress={handleToggleImages} style={styles.toggleButton}>
              <Icon name={showAllImages ? "chevron-up" : "chevron-down"} size={30} color="#000" />
            </TouchableOpacity>
          )}
        </View>
      )}
      <Modal visible={modalVisible} transparent={true}>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={styles.modalBackground}>
            <Image source={{ uri: selectedImage }} style={styles.modalImage} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  mainImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center', // Ensure the text is centered
  },
  address: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'right', // Ensure the text is aligned to the right
    width: '100%',
  },
  boldText: {
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
    marginBottom: 20,
  },
  galleryContainer: {
    marginTop: 20,
    width: '100%',
  },
  galleryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  galleryImage: {
    width: 100,
    height: 100,
    margin: 5,
  },
  toggleButton: {
    alignItems: 'center',
    marginVertical: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '90%',
    height: '70%',
  },
});

export default ProviderDetails;
