import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const CostList = ({ eventCosts, eventType, onUpdateCost }) => {
  const weddingItems = ['bridalDress', 'groomSuit', 'weddingRings', 'bridalBouquet'];
  const labels = {
    venue: 'אולם/גן אירועים',
    photographer: 'צלם',
    dj: 'דיג\'יי',
    acam: 'אקו"ם',
    lightingAndSound: 'תאורה והגברה',
    hallDesign: 'עיצוב אולם',
    bridalDress: 'שמלת כלה',
    bridalMakeup: 'איפור כלה',
    bridalHairDesign: 'עיצוב שיער',
    groomSuit: 'חליפת חתן',
    weddingRings: 'טבעות נישואים',
    rabbinate: 'רבנות',
    weddingRabbi: 'רב לחופה',
    magnetPhotographer: 'צלם מגנטים',
    bridalBouquet: 'זר כלה',
    carDecoration: 'קישוט לרכב',
    invitations: 'הזמנות',
    hotel: 'מלון',
  };

  return (
    <ScrollView style={styles.listContainer}>
      {Object.entries(eventCosts).map(([key, value]) => {
        if (eventType !== 'חתונה' && weddingItems.includes(key)) {
          return null;
        }
        return (
          <TouchableOpacity key={key} style={styles.card} activeOpacity={1}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => onUpdateCost(key, text)}
              value={value.toString()}
              keyboardType="numeric"
              placeholder="הכנס סכום"
            />
            <Text style={styles.cardTitle}>{labels[key]}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
  },
  card: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderColor: '#000',
    // Make sure the entire card is clickable without changing appearance
    backgroundColor: 'transparent',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right'
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 10,
    width: 80,
    marginLeft: 10,
    textAlign: 'right',
  }
});

export default CostList;
