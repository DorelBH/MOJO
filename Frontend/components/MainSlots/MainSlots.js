import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';


const MainSlots = ({ slotsData, handleSlotPress }) => {

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={SlotStyles.scrollViewContent}>
      <TouchableOpacity activeOpacity={1} style={SlotStyles.slotContainer}>
        {slotsData.map((item, index) => (
          <View key={index} style={SlotStyles.slotRow}>
            <Text style={SlotStyles.slotTitle}>{item.title}</Text>
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
    marginTop: '10%',
    marginBottom:'2%'
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
    overflow: 'hidden', // Ensure image respects border-radius
    marginLeft: '8%',
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
    marginRight: '9%',
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
  actionButton: {
    marginTop:7,
    padding: 6,
    backgroundColor: '#7B481C',
    borderRadius: 15,
    width: 150, 
    height:30,
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
  }
});

export default MainSlots;
