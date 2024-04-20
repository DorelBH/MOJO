import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Wedding_Couple from '../../assets/CoupleImage.png';

const CoupleLogo = () => {
  return (
    <View style={CoupleLogoStyles.container}>
      <Image source={Wedding_Couple} style={CoupleLogoStyles.image} />
    </View>
  );
};

const CoupleLogoStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    maxHeight: 250,
    maxWidth: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 70,
  },
});

export default CoupleLogo;
