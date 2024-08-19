import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import RecommendedSongsScreen from '../RecommendedSongsScreen';
import DJProviders from '../../Providers/DJProviders';
import CustomButton from '../../components/CustomButton';
import useAuthCheck from '../../hooks/useAuthCheck';

const SongsMain = ({ route }) => {
    useAuthCheck();
    const { eventType } = route.params || {};

    const [currentScreen, setCurrentScreen] = useState('RecommendedSongs');
    const [isWedding, setIsWedding] = useState(false);

    useEffect(() => {
        // בדוק אם eventType מוגדר ולפי זה עדכן את מצב isWedding ואת המסך הנוכחי
        if (eventType) {
            setIsWedding(eventType === 'חתונה');
            setCurrentScreen(eventType === 'חתונה' ? 'RecommendedSongs' : 'provide');
        }
    }, [eventType]);

    const handlePressDJ = () => setCurrentScreen('RecommendedSongs');
    const handlePressSongs = () => setCurrentScreen('provide');

    if (!isWedding && currentScreen === 'provide') {
        return <DJProviders />;
    }

    return (
        <View style={styles.container}>
            {isWedding && (
                <CustomButton
                    text="המלצות לשירים" 
                    onPress={handlePressDJ} 
                    type={currentScreen === 'RecommendedSongs' ? 'PROVIDER' : 'PROVIDER_NOTACTIVE'}
                />
            )}
            <CustomButton 
                text="בחירת ספק" 
                onPress={handlePressSongs}
                type={currentScreen === 'provide' ? 'PROVIDER' : 'PROVIDER_NOTACTIVE'}
            />
            <View style={styles.showComponent}>
                {currentScreen === 'RecommendedSongs' && <RecommendedSongsScreen />}
                {currentScreen === 'provide' && !isWedding && <DJProviders />}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', // אלין לראש המסך
        alignItems: 'center',
        marginTop: '10%'
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

export default SongsMain;
