import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import CameraLogo from '../../assets/images/CameraLogo.png'; // Updated import path
import * as ImagePicker from 'expo-image-picker'; // Updated import to expo-image-picker

const CameraButton = ({ onPress }) => {
  const handleReplaceImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Permission to access camera roll is required!');
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        onPress(result.assets[0].uri); 
      } else {
        console.log("Image selection was canceled or no assets available"); 
      }
    } catch (error) {
      console.error('Error selecting image:', error);
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
