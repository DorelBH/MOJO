import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Idea from '../../assets/images/Idea.png';
import CoupleImage from '../../assets/images/CoupleImage.png';

const MainSlots = ({ slotsData, handleSlotPress }) => {
  const slotWidth = (Dimensions.get('window').width - 60) / 2;

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={SlotStyles.scrollViewContent}>
      <View style={SlotStyles.slotContainer}>
        {slotsData.map((item, index) => (
          <View key={index} style={SlotStyles.slotRow}>
            <Text style={SlotStyles.slotTitle}>{item.title}</Text>
            <View style={SlotStyles.slotContent}>
              <View style={SlotStyles.slotButtonContainer}>
                <TouchableOpacity onPress={() => handleSlotPress(item.action)}>
                  <View style={[SlotStyles.slotButton, { borderRadius: 15 }]}>
                    <Image source={item.image} style={SlotStyles.slotButtonImage}/>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={SlotStyles.slotDescriptionContainer}>
                <Text style={SlotStyles.slotDescription}>{item.description}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
      <Text style={SlotStyles.slotTitle}>יש לנו טיפי זהב בשבילכם</Text>
      <View style={SlotStyles.adContainer}>
        <TouchableOpacity style={SlotStyles.tipButton} onPress={() => {/* First wedding tip function */}}>
          <Text style={SlotStyles.tipText}>לקחת הזמנות נכונות</Text>
        </TouchableOpacity>
        <TouchableOpacity style={SlotStyles.tipButton} onPress={() => {/* Second wedding tip function */}}>
          <Text style={SlotStyles.tipText}>תיאום פרטים מראש</Text>
        </TouchableOpacity>
        <TouchableOpacity style={SlotStyles.tipButton} onPress={() => {/* Third wedding tip function */}}>
          <Text style={SlotStyles.tipText}>להנות מכל רגע</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const SlotStyles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slotContainer: {
    alignItems: 'center',
  },
  slotRow: {
    alignItems: 'center',
  },
  slotTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'AcademyEngravedLetPlain',
    marginTop: '13%',
  },
  slotContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slotButtonContainer: {
    alignItems: 'center',
    marginRight: 20,
  },
  slotButton: {
    width: 100,
    height: 100,
    borderColor: 'gray',
    borderWidth: 2,
    position: 'relative',
    overflow: 'hidden', // Ensure image respects border-radius
    marginLeft: '7%',
  },
  slotButtonImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  slotButtonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slotButtonText: {
    color: '#2f2f2f',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  slotDescriptionContainer: {
    flex: 1,
  },
  slotDescription: {
    textAlign: 'right',
    color: 'gray',
    marginRight: '6%',
  },
  adContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  tipButton: {
    width: 100,
    height: 100,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  tipText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#cd853f',
    textAlign: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    fontFamily: 'AcademyEngravedLetPlain',
  },
});

export default MainSlots;
