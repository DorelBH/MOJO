import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableWithoutFeedback } from 'react-native';
import CustomButton from '../../components/CustomButton';
import SongsData from '../../components/SongsData';
import SongCard from "../../components/SongCard";

const HupaSongsScreen = ({ route }) => {
    const { eventType } = route.params;
    const [language, setLanguage] = useState('עברית');

    const handlePressHebrew = () => setLanguage('עברית');
    const handlePressLoazit = () => setLanguage('לועזית');

    const songs = SongsData(eventType, language);

    if (!songs || songs.length === 0) {
        return <View style={styles.container}><Text>אין שירים להציג</Text></View>;
    }

    const renderItem = ({ item }) => (
        item ? (
            <SongCard
                song={item}
            />
        ) : null
    );

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <CustomButton
                    text="לועזית" 
                    onPress={handlePressLoazit} 
                    type={language === 'לועזית' ? 'PROVIDER' : 'PROVIDER_NOTACTIVE'}
                />
                
                <CustomButton 
                    text="עברית" 
                    onPress={handlePressHebrew}
                    type={language === 'עברית' ? 'PROVIDER' : 'PROVIDER_NOTACTIVE'}
                />
            </View>
            <FlatList
                data={songs}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                scrollEnabled={true} 
                showsHorizontalScrollIndicator={false}  
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', 
        alignItems: 'center',
        marginTop: '10%',
        width: '100%',  
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
    },
    listContainer: {
        alignItems: 'center',  // מרכז את הפריטים ברשימה
        justifyContent: 'center',
        paddingVertical: 5,
        width: '100%',  // מונע גלילה אופקית
    },
});

export default HupaSongsScreen;