import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import RecommendedSongsScreen from '../RecommendedSongsScreen';
import DJProviders from '../../Providers/DJProviders';
import CustomButton from '../../components/CustomButton';

const AlcoholMain = () => {
    const [currentScreen, setCurrentScreen] = useState('RecommendedSongs');

    const handlePressDJ = () => setCurrentScreen('RecommendedSongs');
    const handlePressSongs = () => setCurrentScreen('provide');

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>

                <CustomButton 
                    text="בחירת ספק" 
                    onPress={handlePressSongs}
                    type={currentScreen === 'provide' ? 'PROVIDER' : 'PROVIDER_NOTACTIVE'}
                />
                
                <CustomButton
                    text="המלצות לשירים" 
                    onPress={handlePressDJ} 
                    type={currentScreen === 'RecommendedSongs' ? 'PROVIDER' : 'PROVIDER_NOTACTIVE'}
                />
            </View>
            <View style={styles.showComponent}>
                {currentScreen === 'RecommendedSongs' && <RecommendedSongsScreen />}
                {currentScreen === 'provide' && <DJProviders />}
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
