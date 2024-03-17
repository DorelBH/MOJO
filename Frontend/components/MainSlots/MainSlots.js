// MainSlots.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const MainSlots = ({ slotsData, handleSlotPress }) => {
  const slotWidth = (Dimensions.get('window').width - 60) / 2;

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={SlotStyles.scrollViewContent}>
      <View style={SlotStyles.slotContainer}>
        {slotsData.map((item, index) => (
          <TouchableOpacity key={index} style={[SlotStyles.slotButton, { width: slotWidth }]} onPress={() => handleSlotPress(item.action)}>
            <FontAwesome name={item.icon} size={40} color="black" />
            <Text style={SlotStyles.slotButtonText}>{item.slot}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const SlotStyles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  slotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  slotButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 15,
    margin: 10,
    borderWidth: 2,
    borderColor: '#2f2f2f',
    alignItems: 'center',
  },
  slotButtonText: {
    color: '#2f2f2f',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default MainSlots;
