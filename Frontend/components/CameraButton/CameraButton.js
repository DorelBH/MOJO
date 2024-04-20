import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import CameraLogo from '../../assets/images/CameraLogo.png'; // Updated import path
import * as ImagePicker from 'expo-image-picker'; // Updated import to expo-image-picker
import { apiUrl } from "../../api";
import { getToken } from "../../util/authToken"; 

const CameraButton = ({ eventId }) => {
  const fetchPhotoData = async (photoUri) => {
    const token = await getToken();
    try {
      const response = await fetch(`${apiUrl}/api/events/addPhoto/${eventId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', // שימוש ב-JSON
        },
        body: JSON.stringify({ photoUri }), // שליחת ה-URI כאובייקט JSON
      });
  
      const responseJson = await response.json();
      if (!response.ok) {
        throw new Error(responseJson.message || 'Failed to upload photo URI');
      } 
    } catch (error) {
      console.error('Error uploading photo URI:', error);
    }
  };
  


  const handleReplaceImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const photoUri = result.assets[0].uri;
      fetchPhotoData(photoUri); // Push to DB
    } else {
      console.log("Image selection was canceled or no assets available");
    }
  };

  return (
    <TouchableOpacity onPress={handleReplaceImage} style={styles.container}>
      <Image source={CameraLogo} style={styles.cameraLogo} />
    </TouchableOpacity>
  );
};




const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: '4%',
    left: '1%',
  },
  cameraLogo: {
    maxHeight: 250,
    maxWidth: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default CameraButton;
