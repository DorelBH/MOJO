import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import SongCard from "../../components/SongCard";

const songs = [
  {
    id: '1',
    ArtName: 'עקיבא',
    SongName: 'צעדים',
    youtube: 'https://www.youtube.com/watch?v=XzeyFpGtCUE',
    spotify: 'https://open.spotify.com/track/1FyfEuRtAFpuItWcuouxkV?si=7c9a686416684824',
    appleMusic: 'https://music.apple.com/il/album/%D7%A6%D7%A2%D7%93%D7%99%D7%9D/1678133542?i=1678133550',
  },
  {
    id: '2',
    ArtName: ' מוש בן ארי ואביב כנר',
    SongName: 'פועם בי מחדש',
    youtube: 'https://www.youtube.com/watch?v=owhVcHU6bmY',
    spotify: 'https://open.spotify.com/track/2lz6MQJlKKs8QQYkEcF104?si=6f5611b1a3994ee1',
    appleMusic: 'https://music.apple.com/il/album/%D7%A4%D7%95%D7%A2%D7%9D-%D7%91%D7%99-%D7%9E%D7%97%D7%93%D7%A9/1676242861?i=1676242863',
  },
  {
    id: '3',
    ArtName: 'גבריאל שרם',
    SongName: 'שלווה בארמונותייך (קאבר)',
    youtube: 'https://www.youtube.com/watch?v=UUk-ISz_IIU',
  },
  {
    id: '4',
    ArtName: 'עקיבא',
    SongName: 'ניגון ברדיצב',
    youtube: 'https://www.youtube.com/watch?v=fzTwJYvalaA',
    spotify: 'https://open.spotify.com/track/3Xtf85oQUo8Fe8c9aG3cHr?si=041f91d44ecd4381',
    appleMusic: 'https://music.apple.com/il/album/%D7%A0%D7%99%D7%92%D7%95%D7%9F-%D7%91%D7%A8%D7%93%D7%99%D7%A6%D7%91-%D7%94%D7%AA%D7%91%D7%95%D7%93%D7%93%D7%95%D7%AA/1584236625?i=1584237883',
  },
  {
    id: '5',
    ArtName: 'דניאל בן חיים',
    SongName: 'עד יום מותי (קאבר)',
    youtube: 'https://www.youtube.com/watch?v=dXxyMc_OCQY',
  },
  {
    id: '6',
    ArtName: 'עומר אדם',
    SongName: 'ואיך שלא',
    youtube: 'https://www.youtube.com/watch?v=Uo3krwRz-L4',
    spotify: 'https://open.spotify.com/track/0SMDtYt5HghaTMFc61nCnP?si=d3df8641cc344c57',
    appleMusic: 'https://music.apple.com/il/album/%D7%95%D7%90%D7%99%D7%9A-%D7%A9%D7%9C%D7%90/1720691877?i=1720691879',
  },
  {
    id: '7',
    ArtName: 'עדן חסון',
    SongName: 'גיטרה וכינור (קאבר)',
    youtube: 'https://www.youtube.com/watch?v=aHrCHA_nT4I',
  },
  {
    id: '8',
    ArtName: 'עומר אדם',
    SongName: 'חוזה בנשמה',
    youtube: 'https://www.youtube.com/watch?v=GavjZRT1o4g',
    spotify: 'https://open.spotify.com/track/48lkLcxq7wFjwy6PtytEMe?si=b258d6d81632431e',
    appleMusic: 'https://music.apple.com/il/album/%D7%97%D7%95%D7%96%D7%94-%D7%91%D7%A0%D7%A9%D7%9E%D7%94/1447046240?i=1447046295',
  },
  {
    id: '9',
    ArtName: 'ספיר מסיקה',
    SongName: 'אהבתיה (קאבר)',
    youtube: 'https://www.youtube.com/watch?v=kCmYEQrJ0UM',
  },
  {
    id: '10',
    ArtName: 'עומר אדם',
    SongName: 'תמיד שלך',
    youtube: 'https://www.youtube.com/watch?v=PburljbL-fo',
    spotify: 'https://open.spotify.com/track/6i2SQujw0VIv4LPkF5oFqB?si=00905e3cd94c431e',
    appleMusic: 'https://music.apple.com/il/album/%D7%AA%D7%9E%D7%99%D7%93-%D7%A9%D7%9C%D7%9A/1630772054?i=1630772055',
  },
  {
    id: '11',
    ArtName: 'רביד פלוטניק',
    SongName: 'שלווה בארמונותייך',
    youtube: 'https://www.youtube.com/watch?v=4sSYkwkDGnk',
    spotify: 'https://open.spotify.com/track/0PfvEnfj3hHl7zlc0WcfGY?si=dffebb809d864739',
    appleMusic: 'https://music.apple.com/il/album/%D7%A9%D7%9C%D7%95%D7%95%D7%94-%D7%91%D7%90%D7%A8%D7%9E%D7%95%D7%A0%D7%95%D7%AA%D7%99%D7%99%D7%9A/1583883107?i=1583883714',
  },
  {
    id: '12',
    ArtName: 'הראל מויאל',
    SongName: 'ואז תבואי',
    youtube: 'https://www.youtube.com/watch?v=32oVRcayvSU',
    spotify: 'https://open.spotify.com/track/2s3eyOn5GpLcPNc9a35UIx?si=6913b2fc95d64b8b',
    appleMusic: 'https://music.apple.com/il/album/%D7%95%D7%90%D7%96-%D7%AA%D7%91%D7%95%D7%90%D7%99/1603905793?i=1603906299',
  },
  {
    id: '13',
    ArtName: 'מאי ספדיה',
    SongName: 'שמש בלילה',
    youtube: 'https://www.youtube.com/watch?v=fUec3fjc07U',
    spotify: 'https://open.spotify.com/track/2htXh4b5BL47SxpYOMBq7v?si=f9a7ac44458d48ec',
    appleMusic: 'https://music.apple.com/il/album/%D7%A9%D7%9E%D7%A9-%D7%91%D7%9C%D7%99%D7%9C%D7%94/1635171109?i=1635171128',
  },
  {
    id: '14',
    ArtName: 'תמר יהלומי',
    SongName: 'תפילות',
    youtube: 'https://www.youtube.com/watch?v=jCPTkvcuGSI',
    spotify: 'https://open.spotify.com/track/0jqevLOcDRdTp1Y6ht0lYH?si=b9be6a0886f84aa6',
    appleMusic: 'https://music.apple.com/il/album/%D7%AA%D7%A4%D7%99%D7%9C%D7%95%D7%AA/1687263539?i=1687263540',
  },
  {
    id: '15',
    ArtName: 'שרית חדד',
    SongName: 'מכל האהבות',
    youtube: 'https://www.youtube.com/watch?v=SO0HbjEXAuU',
    spotify: 'https://open.spotify.com/track/50jUErjdFJobwhgKluEnvR?si=9b742cbae7ec482d',
    appleMusic: 'https://music.apple.com/il/album/%D7%9E%D7%9B%D7%9C-%D7%94%D7%90%D7%94%D7%91%D7%95%D7%AA/1670092186?i=1670092187',
  },
  {
    id: '16',
    ArtName: 'עידן רייכל',
    SongName: 'אין לך דאגות',
    youtube: 'https://www.youtube.com/watch?v=_qCtDKOAIvY',
    spotify: 'https://open.spotify.com/track/7oLD7tckKSDBhTJh7NCMiS?si=a21c2f4328a3490c',
    appleMusic: 'https://music.apple.com/il/album/ein-lach-deagot/1667295291?i=1667295293',
  },
  // הוסף כאן שירים נוספים
];

const HebrewHupaSongsScreen = () => {
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

export default HebrewHupaSongsScreen;
