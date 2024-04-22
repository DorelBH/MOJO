import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
 
const Provider = () => { // להציג כרטיסיות 
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>מסך דוגמא </Text>
      <Text style={styles.Text2}>הצגת ספקי ברמנים</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems:'center'
  },
  Text: {
    fontSize: 40,
    color: '#000',
    marginBottom: 10,
},
Text2: {
  fontSize: 25,
  color: '#000',
  marginBottom: 10,
},
});

export default Provider;
