import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import ProviderCard from '../../components/ProviderCard';
import useProviderServerConnect from '../useProviderServerConnect';

const PAGE_SIZE = 10;

const RavProviders = () => {
  const { providers, currentPage, setCurrentPage } = useProviderServerConnect('RavScrape');


  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentProviders = providers.slice(startIndex, endIndex);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>רבנים לאירוע</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          {currentProviders.map((provider, index) => (
            <ProviderCard
              key={index}
              name={provider.name}
              imageUrl={provider.imageUrl}
              description={provider.description}
              price={provider.price}
              phone={provider.phone}
              whatsapp={provider.whatsapp}
              gallery={provider.gallery} // Ensure gallery is passed
            />
          ))}
        </View>
      </ScrollView>
      <View style={styles.paginationContainer}>

      <TouchableOpacity
          onPress={() => setCurrentPage(currentPage + 1)}
          disabled={endIndex >= providers.length}
          style={styles.paginationButton}
        >
          <Text style={styles.paginationText}>עמוד הבא</Text>
        </TouchableOpacity>

        
        <Text style={styles.paginationText}>{currentPage}</Text>
        
        <TouchableOpacity
          onPress={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          style={styles.paginationButton}
        >
          <Text style={styles.paginationText}>עמוד קודם</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 70,
    textAlign: 'center',
    top: 0,
    width: '100%',
    zIndex: 1,
    padding: 10,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    borderTopWidth: 3,
    borderTopColor: '#7B481C',
  },
  paginationButton: {
    padding: 10,
  },
  paginationText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  scrollViewContainer: {
    paddingTop: 20, // Ensure content doesn't overlap with the fixed header
  },
});

export default RavProviders;
