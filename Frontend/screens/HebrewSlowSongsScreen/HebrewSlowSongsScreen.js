import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import SongCard from "../../components/SongCard";

const songs = [
  {
    id: '1',
    ArtName: 'ליאור מיארה',
    SongName: 'שפוי בעולם',
    youtube: 'https://www.youtube.com/watch?v=4Vt88DN2wCc',
  },
  {
    id: '2',
    ArtName: 'תמר יהלומי ויונתן קלימי',
    SongName: 'מזל',
    youtube: 'https://www.youtube.com/watch?v=tFW2alq3FMU',
    spotify: 'https://open.spotify.com/track/7tOOvvqrMxaSAP905RXKyc?si=763103de14c74302',
    appleMusic: 'https://music.apple.com/il/album/%D7%9E%D7%96%D7%9C/1615972332?i=1615972333',
  },
  {
    id: '3',
    ArtName: 'יובל דיין ובר צברי',
    SongName: 'מיליון עננים',
    youtube: 'https://www.youtube.com/watch?v=7fpgxSJQSio',
    spotify: 'https://open.spotify.com/track/0EaBbv2U2r7GUxO6YCvTjW?si=f5249a4a82ee4163',
    appleMusic: 'https://music.apple.com/il/album/%D7%9E%D7%99%D7%9C%D7%99%D7%95%D7%9F-%D7%A2%D7%A0%D7%A0%D7%99%D7%9D/1607077974?i=1607077975',
  },
  {
    id: '4',
    ArtName: 'רמי קפלן',
    SongName: 'היא האחת',
    youtube: 'https://www.youtube.com/watch?v=SeBr8Rw_g6Y',
    spotify: 'https://open.spotify.com/track/4RlsbMz0gaIwt1mQsW7dnG?si=8874649777c34b39',
    appleMusic: 'https://music.apple.com/il/album/%D7%94%D7%99%D7%90-%D7%94%D7%90%D7%97%D7%AA/1332647409?i=1332647937',
  },
  {
    id: '5',
    ArtName: 'שרית חדד',
    SongName: 'חלק ממני',
    youtube: 'https://www.youtube.com/watch?v=D4qdqHTcU6c',
    spotify: 'https://www.youtube.com/watch?v=D4qdqHTcU6c',
    appleMusic: 'https://music.apple.com/il/album/%D7%97%D7%9C%D7%A7-%D7%9E%D7%9E%D7%A0%D7%99/1300096068?i=1300096070',
  },
  {
    id: '6',
    ArtName: 'עומר אדם',
    SongName: 'תמיד שלך',
    youtube: 'https://www.youtube.com/watch?v=PburljbL-fo',
    spotify: 'https://open.spotify.com/track/6i2SQujw0VIv4LPkF5oFqB?si=00905e3cd94c431e',
    appleMusic: 'https://music.apple.com/il/album/%D7%AA%D7%9E%D7%99%D7%93-%D7%A9%D7%9C%D7%9A/1630772054?i=1630772055',
  },
  {
    id: '7',
    ArtName: 'עידן חביב',
    SongName: 'שלמים',
    youtube: 'https://www.youtube.com/watch?v=5ejT8FqglLM',
    spotify: 'https://open.spotify.com/track/72W6xVQGdKHQl348KYgwg2?si=b9bddc0c44c24a7b',
    appleMusic: 'https://music.apple.com/il/album/%D7%A9%D7%9C%D7%9E%D7%99%D7%9D/1524805947?i=1524805948',
  },
  {
    id: '8',
    ArtName: 'רועי סנדלר',
    SongName: 'אהובתי',
    youtube: 'https://www.youtube.com/watch?v=wBCmVjAVKbw',
    spotify: 'https://open.spotify.com/track/12Ne2tzWdhtApstJ9esuma?si=8ea970a98d9f464e',
    appleMusic: 'https://music.apple.com/il/album/%D7%90%D7%94%D7%95%D7%91%D7%AA%D7%99/1708386659?i=1708386661',
  },
  {
    id: '9',
    ArtName: 'אברהם אביב אלוש',
    SongName: 'מקום מולך',
    youtube: 'https://www.youtube.com/watch?v=_rlK4GEfIq4',
    spotify: 'https://open.spotify.com/track/2nxqi7xW8f1H4zRa0t50Z6?si=ce87f61730304a73',
    appleMusic: 'https://music.apple.com/il/album/%D7%9E%D7%A7%D7%95%D7%9D-%D7%9E%D7%95%D7%9C%D7%9A/1520353668?i=1520353669',
  },
  {
    id: '10',
    ArtName: 'חנן בן ארי',
    SongName: 'בסוף זה הלחן',
    youtube: 'https://www.youtube.com/watch?v=N8uKgplyrh0',
    spotify: 'https://open.spotify.com/track/2oqBdUxaTXaJQVJZ5QVteY?si=db4d0ea8fc264c12',
    appleMusic: 'https://music.apple.com/il/album/%D7%91%D7%A1%D7%95%D7%A3-%D7%96%D7%94-%D7%94%D7%9C%D7%97%D7%9F/1616450317?i=1616450318',
  },
  {
    id: '11',
    ArtName: 'נתן גושן',
    SongName: 'שני ילדים בעולם',
    youtube: 'https://www.youtube.com/watch?v=C-_aF54KFs0',
    spotify: 'https://open.spotify.com/track/3qWDOGP2SBMLQ3nzMIkNbz?si=da8b1700b052412c',
    appleMusic: 'https://music.apple.com/il/album/%D7%A9%D7%A0%D7%99-%D7%99%D7%9C%D7%93%D7%99%D7%9D-%D7%91%D7%A2%D7%95%D7%9C%D7%9D/1557227594?i=1557227595',
  },
  {
    id: '12',
    ArtName: 'מאור אדיר',
    SongName: 'אשתי',
    youtube: 'https://www.youtube.com/watch?v=fYHQ-vJXh7o',
  },
  {
    id: '13',
    ArtName: 'ליאור מיארה',
    SongName: 'מחכה',
    youtube: 'https://www.youtube.com/watch?v=3QK-wYaIyRc',
    spotify: 'https://open.spotify.com/track/3Yh4raTHVTLkgh2lDVU2N9?si=8bffc4d6b4684541',
    appleMusic: 'https://music.apple.com/il/album/%D7%9E%D7%97%D7%9B%D7%94/1557441534?i=1557441537',
  },
  {
    id: '14',
    ArtName: 'איתי לוי',
    SongName: 'תודה לך',
    youtube: 'https://www.youtube.com/watch?v=Wv1Fj3WJh2A',
    spotify: 'https://open.spotify.com/track/4lRCsd4xIjM6hl47csQ22g?si=82d44e9801934837',
    appleMusic: 'https://music.apple.com/il/album/%D7%AA%D7%95%D7%93%D7%94-%D7%9C%D7%9A/1487613400?i=1487613416',
  },
  {
    id: '15',
    ArtName: 'קובי פרץ',
    SongName: 'שלמים (קאבר)',
    youtube: 'https://www.youtube.com/watch?v=oIEjo5eh5FY',
    spotify: 'https://open.spotify.com/track/2va75a5fLlRhKUKg29ksrN?si=6e71deb319d447fe',
    appleMusic: 'https://music.apple.com/il/album/%D7%A9%D7%9C%D7%9E%D7%99%D7%9D/1547014769?i=1547015106',
  },
  {
    id: '16',
    ArtName: 'ליאור נרקיס',
    SongName: 'חלקת אלוהים',
    youtube: 'https://www.youtube.com/watch?v=HGs5UJjxNXc',
    spotify: 'https://open.spotify.com/track/3gri1yv6Nk9WzRcKGaSGtq?si=8224f3d867cd4896',
    appleMusic: 'https://music.apple.com/il/album/%D7%97%D7%9C%D7%A7%D7%AA-%D7%90%D7%9C%D7%95%D7%94%D7%99%D7%9D-live/1711116661?i=1711117042',
  },


  // הוסף כאן שירים נוספים
];

const HebrewSlowSongsScreen = () => {
  const renderItem = ({ item }) => <SongCard song={item} />;

  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default HebrewSlowSongsScreen;
