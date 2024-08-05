import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import SongCard from "../../components/SongCard";

const songs = [
  {
    id: '1',
    ArtName: 'Ofra Haza',
    SongName: 'You',
    youtube: 'https://www.youtube.com/watch?v=GPq6eGCXXP8',
    spotify: 'https://open.spotify.com/track/25jZPtiD0hUXTklFV8dvDR?si=f3622d0ea3384343',
    appleMusic: 'https://music.apple.com/il/album/you/270582169?i=270582184',
  },
  {
    id: '2',
    ArtName: 'Calum Scott, Leona Lewis',
    SongName: 'You Are The Reason (Duet Version)',
    youtube: 'https://www.youtube.com/watch?v=ByfFurjQDb0&t=21s',
    spotify: 'https://open.spotify.com/track/1x3W8RZxW94lrVGhP95qA6?si=d7302d4eed974a4d',
    appleMusic: 'https://music.apple.com/il/album/you-are-the-reason-duet-version/1444614560?i=1444614568',
  },
  {
    id: '3',
    ArtName: 'Bruno Mars',
    SongName: 'Marry You',
    youtube: 'https://www.youtube.com/watch?v=dElRVQFqj-k',
    spotify: 'https://open.spotify.com/track/6SKwQghsR8AISlxhcwyA9R?si=fb81789e53d74a90',
    appleMusic: 'https://music.apple.com/il/album/marry-you/578054234?i=578054248',
  },
  {
    id: '4',
    ArtName: 'MAGIC!',
    SongName: 'Cant Help Falling In love',
    youtube: 'https://www.youtube.com/watch?v=pscx5JQb_I0&t=70s',
  },
  {
    id: '5',
    ArtName: 'Ed Sheeran',
    SongName: 'One Life',
    youtube: 'https://www.youtube.com/watch?v=9G5W_Pl7Ydk&t=69s',
    spotify: 'https://open.spotify.com/track/5DXKvETa1xppOmd4CDxs9S?si=1bfeba00a839422b',
    appleMusic: 'https://music.apple.com/il/album/one-life/1625197538?i=1625198692',
  },
  {
    id: '6',
    ArtName: 'Shane Filan',
    SongName: 'Beautiful In White',
    youtube: 'https://www.youtube.com/watch?v=06-XXOTP3Gc&t=31s',
    spotify: 'https://open.spotify.com/track/0lUdYoSr8Hm3GL0HZld4ac?si=858f7eb1a03f45c6',
    appleMusic: 'https://music.apple.com/il/album/beautiful-in-white/1253910517?i=1253911053',
  },
  {
    id: '7',
    ArtName: 'Hannah Grace',
    SongName: 'Praise You',
    youtube: 'https://www.youtube.com/watch?v=zlOWczjQKGs&t=30s',
    spotify: 'https://open.spotify.com/track/2AIjgEtKg9C4hq2OwRC3pw?si=78d8dcefa51442c7',
    appleMusic: 'https://music.apple.com/il/album/praise-you/1454803567?i=1454803568',
  },
  {
    id: '8',
    ArtName: 'Lady Gaga, Bradley Cooper',
    SongName: 'Shallow',
    youtube: 'https://www.youtube.com/watch?v=bo_efYhYU2A&t=69s',
    spotify: 'https://open.spotify.com/track/2VxeLyX666F8uXCJ0dZF8B?si=cdbd6759ebe049af',
    appleMusic: 'https://music.apple.com/il/album/shallow/1434371867?i=1434371887',
  },
  {
    id: '9',
    ArtName: 'Pentatonix',
    SongName: 'Hallelujah',
    youtube: 'https://www.youtube.com/watch?v=LRP8d7hhpoQ&t=35s',
    spotify: 'https://open.spotify.com/track/550rQQCGkrTzvp4SfpOPzx?si=86e7c7287502418e',
    appleMusic: 'https://music.apple.com/il/album/hallelujah/1189243030?i=1189243276',
  },
  {
    id: '10',
    ArtName: 'The Rembrandts',
    SongName: 'Ill be there for you',
    youtube: 'https://www.youtube.com/watch?v=q-9kPks0IfE&t=30s',
    spotify: 'https://open.spotify.com/track/15tHagkk8z306XkyOHqiip?si=c5939b32807f4dcf',
    appleMusic: 'https://music.apple.com/il/album/ill-be-there-for-you-long-version/318037497?i=318037530',
  },
  {
    id: '11',
    ArtName: 'James Arthur',
    SongName: 'Falling Like The Stars',
    youtube: 'https://www.youtube.com/watch?v=IQ7N7xRsRPo&t=53s',
    spotify: 'https://open.spotify.com/track/395KzBy0bkb57dEvg6cfzJ?si=3a8f55831fe14029',
    appleMusic: 'https://music.apple.com/il/album/falling-like-the-stars/1460836368?i=1460836371',
  },
  {
    id: '12',
    ArtName: 'Florence + The Machine',
    SongName: 'Stand By Me',
    youtube: 'https://www.youtube.com/watch?v=vv2DSmy3Tro&t=41s',
    spotify: 'https://open.spotify.com/track/5XSU59wtE5CRCAEyHmmGy4?si=385ac3ec11754234',
    appleMusic: 'https://music.apple.com/il/album/stand-by-me/1440893411?i=1440893681',
  },
  {
    id: '13',
    ArtName: 'Miley Cyrus',
    SongName: 'When I Look At You',
    youtube: 'https://www.youtube.com/watch?v=8wxOVn99FTE',
    spotify: 'https://open.spotify.com/track/6ZfXA2xakAvphXOSOJ3u1W?si=291e0360e1c244d4',
    appleMusic: 'https://music.apple.com/il/album/when-i-look-at-you/1446859733?i=1446859736',
  },
  {
    id: '14',
    ArtName: 'Bryan Adams',
    SongName: 'Heaven',
    youtube: 'https://www.youtube.com/watch?v=vf3zFvcKQkw',
    spotify: 'https://open.spotify.com/track/7Ewz6bJ97vUqk5HdkvguFQ?si=15b69c6541cb4bb6',
    appleMusic: 'https://music.apple.com/il/album/heaven/1445750543?i=1445750985',
  },
  {
    id: '15',
    ArtName: 'Edward Sharpe & The Magnetic Zeros',
    SongName: 'Home',
    youtube: 'https://www.youtube.com/watch?v=DHEOF_rcND8',
    spotify: 'https://open.spotify.com/track/0cBPuDA3xUjR4Vh9o7CKy8?si=b030fdc3c9ff4b4f',
    appleMusic: 'https://music.apple.com/il/album/home/318796537?i=318796550',
  },
  {
    id: '16',
    ArtName: 'Florida Georgia Line',
    SongName: 'God, Your Mama, And Me',
    youtube: 'https://www.youtube.com/watch?v=QMhkdatUUPA&t=54s',
    spotify: 'https://open.spotify.com/track/4VFE6ZNqa8jHAmbYICoAFg?si=8cfa2a5fde6e4a70',
    appleMusic: 'https://music.apple.com/il/album/god-your-mama-and-me-feat-backstreet-boys/1440934919?i=1440935578',
  },


  // הוסף כאן שירים נוספים
];

const LoazitHupaSongsScreen = () => {
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

export default LoazitHupaSongsScreen;
