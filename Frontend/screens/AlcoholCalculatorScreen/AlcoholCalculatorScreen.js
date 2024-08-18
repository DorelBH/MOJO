import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import useAuthCheck from '../../hooks/useAuthCheck';
import { useRoute } from "@react-navigation/native";

const AlcoholCalculatorScreen = () => {
    useAuthCheck();

    const route = useRoute();
    const { amountInvited } = route.params; // מהמסך הקודם MAIN

    const [drinkNum, setDrinkNum] = React.useState('');
    const [result, setResult] = React.useState(null); // State to hold the result

    const onCalcPress = () => {
        const totalAlcohol = amountInvited * (drinkNum / 100) * 0.15;
        setResult(totalAlcohol); 
    }

    return (
        <View style={AlcoholCalculatorStyles.container}>
            <Text style={AlcoholCalculatorStyles.title}>מחשבון אלכוהול</Text>


            <View style={AlcoholCalculatorStyles.slotButton}>

            <Text style={AlcoholCalculatorStyles.guestNumberText}>
               כמות האורחים - {amountInvited}
            </Text>
            
                <CustomInput
                    iconName="glass-cocktail"
                    placeholder="אחוז השותים באירוע"
                    value={drinkNum}
                    setValue={setDrinkNum}
                    validators={[{ type: 'MIN', val: 1 }, {type: 'MAX', val: 100},{type: 'ONLY_DIGITS'},{ type: 'REQUIRE' }]}
                    errorMessage="הכנס מספר בטווח 1-100%"
                    keyboardType="numeric"
                />

                <CustomButton
                    text="חשב"
                    type="CALCULATE"
                    onPress={onCalcPress} 
                />

                 {result !== null && (
                    <Text style={AlcoholCalculatorStyles.resultText}>
                        כמות האלכוהול הנדרשת היא - {result.toFixed(2)} ליטר
                    </Text>
                )}
            </View>

            <View style={AlcoholCalculatorStyles.slotButton}>
                <Text style={AlcoholCalculatorStyles.slotButtonText}>אדם ממוצע שותה 0.15 ליטר אלכוהול באירוע.</Text>
                <Text style={AlcoholCalculatorStyles.slotButtonText}>אתם רק צריכים להעריך את אחוז האורחים ששותים באירוע.</Text>
            </View>
        </View>
    );
};

const AlcoholCalculatorStyles = StyleSheet.create({
    guestNumberText: {
        color: '#2f2f2f',
        fontSize: 18,
        marginTop: 10,
        textAlign: 'center',
    },
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
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
      },
      resultText: {
        color: 'green',
        fontSize: 15,
        marginTop: 20, // Adjust as necessary
        textAlign: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 0,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default AlcoholCalculatorScreen;
