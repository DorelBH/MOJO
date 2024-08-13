import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import ProviderCard from '../../components/ProviderCard';
import useProviderServerConnect from '../useProviderServerConnect';

const PAGE_SIZE = 10;

const BarProviders = () => {
  const { providers, currentPage, setCurrentPage } = useProviderServerConnect('BarScrape');

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentProviders = providers.slice(startIndex, endIndex);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>ספקי בר</Text>
      <ScrollView contentContainerStyle={styles.container}>
        {currentProviders.map((provider, index) => (
          <ProviderCard
            key={index}
            name={provider.name}
            imageUrl={provider.imageUrl}
            description={provider.description}
            price={provider.price}
            phone={provider.phone}
            whatsapp={provider.whatsapp}
            gallery={provider.gallery} 
          />
        ))}
      </ScrollView>
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          onPress={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          style={styles.paginationButton}
        >
          <Text style={styles.paginationText}>עמוד קודם</Text>
        </TouchableOpacity>
        <Text style={styles.paginationText}>{currentPage}</Text>
        <TouchableOpacity
          onPress={() => setCurrentPage(currentPage + 1)}
          disabled={endIndex >= providers.length}
          style={styles.paginationButton}
        >
          <Text style={styles.paginationText}>עמוד הבא</Text>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  paginationButton: {
    padding: 10,
  },
  paginationText: {
    fontSize: 16,
  },
});

export default BarProviders;
