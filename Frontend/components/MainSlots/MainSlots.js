import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import ChatBotImage from '../../assets/images/chatbot.webp';

const MainSlots = ({ slotsData, handleSlotPress, showBackButton, handleBackPress }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={SlotStyles.scrollViewContent}>
      {showBackButton && (
        <TouchableOpacity onPress={handleBackPress} style={SlotStyles.backButton}>
          <Text style={SlotStyles.backButtonText}>חזרה</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity activeOpacity={1} style={SlotStyles.slotContainer}>
        {slotsData.map((item, index) => (
          <View key={index} style={SlotStyles.slotRow}>
            <Text style={[SlotStyles.slotTitle, showBackButton && SlotStyles.barTitle]}>{item.title}</Text>
            {item.title === 'רשימת מוזמנים' ? (
              <View>
                <Text style={[SlotStyles.slotDescription, { marginRight: 15 }]}>{item.description}</Text>
                <View style={SlotStyles.slotInviteButton}>
                  <TouchableOpacity onPress={() => handleSlotPress('GuestCheck')}>
                    <Image source={item.image} style={SlotStyles.ButtonInvite}/>
                    <Text style={SlotStyles.textInvite}> לרשימה המלאה</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleSlotPress(item.action)}>
                    <Image source={item.image2} style={SlotStyles.ButtonInvite}/>
                    <Text style={SlotStyles.textInvite}> הוסף מוזמנים</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={SlotStyles.slotContent}>
                <View style={SlotStyles.slotButtonContainer}>
                  <View style={[SlotStyles.slotButton, { borderRadius: 15 }]}>
                    <Image source={item.image} style={SlotStyles.slotButtonImage}/>
                  </View>
                </View>
                <View style={SlotStyles.slotDescriptionContainer}>
                  <Text style={SlotStyles.slotDescription}>{item.description}</Text>
                  <TouchableOpacity style={SlotStyles.actionButton} onPress={() => handleSlotPress(item.action)}>
                    <Text style={SlotStyles.actionButtonText}>{item.buttonText}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ))}
      </TouchableOpacity>

      <Text style={SlotStyles.slotTitle}>MOJO BOT</Text>
      <View style={SlotStyles.adContainer}>
        <TouchableOpacity style={SlotStyles.avatarButton} onPress={() => handleSlotPress('ChatBot')}>
          <Image source={ChatBotImage} style={SlotStyles.avatarImage} />
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
    marginTop: '10%',
    marginBottom: '2%',
  },
  barTitle: {
    marginTop: 5, // מרווח קטן יותר מעל הכותרת שירותי בר
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
    width: 130,
    height: 130,
    borderColor: 'gray',
    borderWidth: 0,
    position: 'relative',
    overflow: 'hidden',
    marginLeft: '8%',
  },
  slotButtonImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  slotDescriptionContainer: {
    flex: 1,
  },
  slotDescription: {
    textAlign: 'right',
    color: 'gray',
    marginRight: '9%',
  },
  adContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  avatarButton: {
    width: 100,
    height: 100,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  actionButton: {
    marginTop: 7,
    padding: 6,
    backgroundColor: '#7B481C',
    borderRadius: 15,
    width: 150,
    height: 30,
    alignSelf: 'flex-end',
    marginRight: '9%',
    borderWidth: 1,
  },
  actionButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'AcademyEngravedLetPlain',
  },
  slotInviteButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  ButtonInvite: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginHorizontal: 20,
  },
  textInvite: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 16,
    color: 'black',
  },
  backButton: {
    top: 10,
    left: 10,
    padding: 8,
    borderWidth: 1,
    backgroundColor: '#7B481C',
    borderRadius: 30,
    marginBottom:20

  },
  backButtonText: {
    color: 'white',
    fontSize: 15,
  },
});

export default MainSlots;
