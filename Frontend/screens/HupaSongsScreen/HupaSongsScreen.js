import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import CustomButton from '../../components/CustomButton';
import SongsData from '../../components/SongsData';
import SongCard from "../../components/SongCard";

const HupaSongsScreen = ({ route }) => {
    const { eventType } = route.params; // קבלת סוג האירוע
    const [language, setLanguage] = useState('עברית'); // ברירת מחדל היא עברית

    // פונקציות לטיפול בלחיצות
    const handlePressHebrew = () => setLanguage('עברית');
    const handlePressLoazit = () => setLanguage('לועזית');

    // קבלת השירים לפי סוג האירוע והשפה הנבחרת
    const songs = SongsData(eventType, language);

    // טיפול במקרה שבו songs לא מוגדר
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
            <View style={styles.container}>
                <FlatList
                    data={songs}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                    numColumns={2}
                    showsVerticalScrollIndicator={true}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', 
        alignItems: 'center',
        marginTop: '10%',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
    },
    listContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
});

export default HupaSongsScreen;
