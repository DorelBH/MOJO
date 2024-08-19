import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AlcoholCalculatorScreen from '../AlcoholCalculatorScreen';
import BarProviders from '../../Providers/BarProviders';
import CustomButton from '../../components/CustomButton';

const AlcoholMain = () => {
    const [currentScreen, setCurrentScreen] = useState('AlcoholCalc');

    const handlePressAlcohol = () => setCurrentScreen('AlcoholCalc');
    const handlePressProvide = () => setCurrentScreen('provide');

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>

                <CustomButton 
                    text="בחירת ספק" 
                    onPress={handlePressProvide}
                    type={currentScreen === 'provide' ? 'PROVIDER' : 'PROVIDER_NOTACTIVE'}
                />
                
                <CustomButton
                    text="מחשבון אלכוהול" 
                    onPress={handlePressAlcohol} 
                    type={currentScreen === 'AlcoholCalc' ? 'PROVIDER' : 'PROVIDER_NOTACTIVE'}
                />
            </View>
            <View style={styles.showComponent}>
                {currentScreen === 'AlcoholCalc' && <AlcoholCalculatorScreen />}
                {currentScreen === 'provide' && <BarProviders />}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', // אלין לראש המסך
        alignItems: 'center',
        marginTop:'10%'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%', // תומך ברוחב מלא
        justifyContent: 'center',

    },
    showComponent: {
        flex: 1,
        width: '100%' ,
        alignItems: 'center',
    }
});

export default AlcoholMain;
