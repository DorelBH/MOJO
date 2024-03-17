import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

const AlcoholCalculatorScreen = () => {
    const [guestnum, setGuestNum] = useState('');
    const [drinkNum, setDrinkNum] = useState('');

    return (
        <View style={AlcoholCalculatorStyles.container}>
            <Text style={AlcoholCalculatorStyles.title}>מחשבון אלכוהול</Text>
            
            <View style={AlcoholCalculatorStyles.slotButton}>
                <CustomInput
                    iconName="account-group"
                    placeholder="כמות אורחים"
                    value={guestnum}
                    setValue={setGuestNum}
                    validators={[{ type: 'MINLENGTH', val: 1 }, { type: 'REQUIRE' }]}
                    errorMessage="Must be guests Number"
                />

                <CustomInput
                    iconName="glass-cocktail"
                    placeholder="אחוז השותים באירוע"
                    value={drinkNum}
                    setValue={setDrinkNum}
                    validators={[{ type: 'MINLENGTH', val: 1 }, { type: 'REQUIRE' }]}
                    errorMessage="Must"
                />

                <CustomButton
                    text="חשב"
                    type="CALCULATE"
                    
                />
            </View>

            <View style={AlcoholCalculatorStyles.slotButton}>
                <Text style={AlcoholCalculatorStyles.slotButtonText}>אדם ממוצע שותה 0.15 ליטר אלכוהול באירוע.</Text>
                <Text style={AlcoholCalculatorStyles.slotButtonText}>אתם רק צריכים להעריך את אחוז האורחים ששותים באירוע.</Text>
            </View>

            
        </View>
    );
};

const AlcoholCalculatorStyles = StyleSheet.create({
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
        paddingVertical: 50,
        paddingHorizontal: 30,
        borderRadius: 15,
        margin: 10,
        borderWidth: 2,
        borderColor: '#2f2f2f',
        alignItems: 'center',
      },
      slotButtonText: {
        color: '#2f2f2f',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
      },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default AlcoholCalculatorScreen;
