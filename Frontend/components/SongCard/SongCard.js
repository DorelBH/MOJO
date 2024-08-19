import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SongCard = ({ song }) => {
  if (!song) {
    return null;
  }

  return (
    <TouchableWithoutFeedback>
      <View style={styles.card}>
        <Text style={styles.ArtName} numberOfLines={2}>{song.ArtName || 'לא מוגדר'}</Text>
        <Text style={styles.SongName}>{song.SongName || 'לא מוגדר'}</Text>
        <View style={styles.linksContainer}>
          {song.youtube && (
            <TouchableWithoutFeedback onPress={() => Linking.openURL(song.youtube)}>
              <View style={styles.iconButton}>
                <Icon name="youtube-play" size={30} color="#FF0000" />
              </View>
            </TouchableWithoutFeedback>
          )}
          {song.spotify && (
            <TouchableWithoutFeedback onPress={() => Linking.openURL(song.spotify)}>
              <View style={styles.iconButton}>
                <Icon name="spotify" size={30} color="#1DB954" />
              </View>
            </TouchableWithoutFeedback>
          )}
          {song.appleMusic && (
            <TouchableWithoutFeedback onPress={() => Linking.openURL(song.appleMusic)}>
              <View style={styles.iconButton}>
                <Icon name="apple" size={30} color="#000000" />
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 180,
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
    
  },
});

export default SongCard;