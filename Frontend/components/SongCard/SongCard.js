import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // או Ionicons אם זה מה שאתה מעדיף

const SongCard = ({ song }) => {
  if (!song) {
    return null; // החזר null אם song לא מוגדר
  }

  return (
    <View style={styles.card}>
      <Text style={styles.ArtName} numberOfLines={2}>{song.ArtName || 'לא מוגדר'}</Text>
      <Text style={styles.SongName}>{song.SongName || 'לא מוגדר'}</Text>
      <View style={styles.linksContainer}>
        {song.youtube && (
          <TouchableOpacity onPress={() => Linking.openURL(song.youtube)} style={styles.iconButton}>
            <Icon name="youtube-play" size={30} color="#FF0000" />
          </TouchableOpacity>
        )}
        {song.spotify && (
          <TouchableOpacity onPress={() => Linking.openURL(song.spotify)} style={styles.iconButton}>
            <Icon name="spotify" size={30} color="#1DB954" />
          </TouchableOpacity>
        )}
        {song.appleMusic && (
          <TouchableOpacity onPress={() => Linking.openURL(song.appleMusic)} style={styles.iconButton}>
            <Icon name="apple" size={30} color="#000000" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 190,
    height: 140,
    margin: 5,
    padding: 5,
    backgroundColor: '#c0c0c0',
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ArtName: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    height: 25,
    width: 200,
    marginBottom: 20,
    width: '100%',
  },
  SongName: {
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000000',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'AcademyEngravedLetPlain',
  },
  linksContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    width: '100%',
    justifyContent: 'space-around',
  },
  iconButton: {
    alignItems: 'center',
    marginHorizontal: 15,
  },
});

export default SongCard;
