import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RecommendedSongsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>מסך לדוגמא</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default RecommendedSongsScreen;
