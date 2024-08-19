import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image, TouchableOpacity } from 'react-native';
import mojoLogo from '../../assets/images/mojo_logo.png';
import { useRoute, useNavigation } from '@react-navigation/native';

const RecommendedSongsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const eventId = route.params?.eventId;

  const fadeAnim1 = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim1, { toValue: 1, duration: 350, useNativeDriver: true }),
      Animated.timing(fadeAnim2, { toValue: 1, duration: 350, useNativeDriver: true }),
    ]).start();
  }, [fadeAnim1, fadeAnim2]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Animated.View style={{ opacity: fadeAnim1 }}>
          <TouchableOpacity
            style={{ ...styles.box, ...styles.chupaBox }}
            onPress={() => navigation.navigate('HupaSongs', { eventType: 'חופה', eventId })}
          >
            <Image source={mojoLogo} style={styles.logo} />
            <Text style={styles.boxText}>חופה</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <View style={styles.row}>
        <Animated.View style={{ opacity: fadeAnim2 }}>
          <TouchableOpacity
            style={{ ...styles.box, ...styles.slowBox }}
            onPress={() => navigation.navigate('HupaSongs', { eventType: 'סלואו', eventId })}
          >
            <Image source={mojoLogo} style={styles.logo} />
            <Text style={styles.boxText}>סלואו</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  box: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  chupaBox: {
    backgroundColor: '#a9a9a9',
  },
  slowBox: {
    backgroundColor: '#a9a9a9',
  },
  boxText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'AcademyEngravedLetPlain',
  },
  logo: {
    width: 90,
    height: 28,
    position: 'absolute',
    top: 10,
  },
});

export default RecommendedSongsScreen;
