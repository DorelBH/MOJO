import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomButton from '../../components/CustomButton';
import HebrewSlowSongsScreen from '../HebrewSlowSongsScreen/HebrewSlowSongsScreen';
import LoazitSlowSongsScreen from '../LoazitSlowSongsScreen/LoazitSlowSongsScreen';

const SlowSongsScreen = () => {
    const [currentScreen, setCurrentScreen] = useState('HebrewSlowSongs');

    const handlePressHebrew = () => setCurrentScreen('HebrewSlowSongs');
    const handlePressLoazit = () => setCurrentScreen('LoazitSlowSongs');

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>

                <CustomButton 
                    text="לועזית" 
                    onPress={handlePressLoazit}
                    type={currentScreen === 'LoazitSlowSongs' ? 'PROVIDER' : 'PROVIDER_NOTACTIVE'}
                />
                
                <CustomButton
                    text="עברית" 
                    onPress={handlePressHebrew} 
                    type={currentScreen === 'HebrewSlowSongs' ? 'PROVIDER' : 'PROVIDER_NOTACTIVE'}
                />
            </View>
            <View style={styles.showComponent}>
                {currentScreen === 'HebrewSlowSongs' && <HebrewSlowSongsScreen />}
                {currentScreen === 'LoazitSlowSongs' && <LoazitSlowSongsScreen />}
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

export default SlowSongsScreen;
