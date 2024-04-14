// MainScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native'; 
import CoupleLogo from '../../components/CoupleLogo';
import MainSlots from '../../components/MainSlots';
import useAuthCheck from '../../hooks/useAuthCheck';
/* import { useRoute } from "@react-navigation/native";
 */
const MainScreen = ({ navigation }) => {
/*   const route = useRoute();
  const { eventId } = route.params || {}; */

  useAuthCheck();

  const slotsData = [
    { slot: 'מחשבון הוצאות', icon: 'calculator' },
    { slot: 'רשימת מוזמנים', icon: 'users' },
    { slot: 'מחשבון אלכוהול', icon: 'glass', action: 'AlcoholCalculator' },
    { slot: 'אולמות', icon: 'home' },
    { slot: 'ספקים', icon: 'star' },
    { slot: 'צק ליסט', icon: 'check' },
    { slot: 'טיפים', icon: 'lightbulb-o' },
    { slot: 'בחירת שירים', icon: 'music' },
  ];

  const handleSlotPress = (action) => {
    if (action === 'AlcoholCalculator') {
      navigation.navigate('AlcoholCalculator'); // Navigate to AlcoholCalculator screen
    }
  };

  return (
    <View style={Mainstyles.container}>
      <CoupleLogo />
      <MainSlots slotsData={slotsData} handleSlotPress={handleSlotPress} />
    </View>
  );
};

const Mainstyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default MainScreen;
