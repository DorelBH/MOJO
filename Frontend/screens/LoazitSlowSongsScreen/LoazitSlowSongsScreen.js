import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import SongCard from "../../components/SongCard";

const songs = [
  {
    id: '1',
    ArtName: 'Lana Del Rey',
    SongName: 'Young And Beautiful',
    youtube: 'https://www.youtube.com/watch?v=o_1aF54DO60',
    spotify: 'https://open.spotify.com/track/2nMeu6UenVvwUktBCpLMK9?si=a2400dd465fa4e5d',
    appleMusic: 'https://music.apple.com/il/album/young-and-beautiful/1440856860?i=1440857081',
  },
  {
    id: '2',
    ArtName: 'Mariah Carey',
    SongName: 'Without You',
    youtube: 'https://www.youtube.com/watch?v=Hat1Hc9SNwE',
    spotify: 'https://open.spotify.com/track/0pkIJFV6mviH9dmBYsFwTM?si=94b628b493b14ae5',
    appleMusic: 'https://music.apple.com/il/album/without-you/989430344?i=989430842',
  },
  {
    id: '3',
    ArtName: 'Ed Sheeran',
    SongName: 'Perfect',
    youtube: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g',
    spotify: 'https://open.spotify.com/track/0tgVpDi06FyKpA1z0VMD4v?si=e0e9f97925c74d46',
    appleMusic: 'https://music.apple.com/il/album/perfect/1193700601?i=1193700769',
  },
  {
    id: '4',
    ArtName: 'Haley Reinhart',
    SongName: 'Cant Help Falling in Love',
    youtube: 'https://www.youtube.com/watch?v=VqLU4wPzDVg',
    spotify: 'https://open.spotify.com/track/6LmFlSjRJJNcfJSxZTdcTe?si=8942259b249945ae',
    appleMusic: 'https://music.apple.com/il/album/cant-help-falling-in-love/1266944029?i=1266944583',
  },
  {
    id: '5',
    ArtName: 'Roni Alter',
    SongName: 'I follow Rivers',
    youtube: 'https://www.youtube.com/watch?v=SPGGdijkArc',
    spotify: 'https://open.spotify.com/track/4a2MIdV2CBdA9mUOgi0RWR?si=f12ca6b13bfd4375',
    appleMusic: 'https://music.apple.com/il/album/i-follow-rivers/1247033870?i=1247033871',
  },
  {
    id: '6',
    ArtName: 'Adele',
    SongName: 'One And Only',
    youtube: 'https://www.youtube.com/watch?v=dJg4_rL9h7Q',
    spotify: 'https://open.spotify.com/track/5W63Zcirj6bvnTxhVIKTSK?si=3c77bdff5cf744fa',
    appleMusic: 'https://music.apple.com/il/album/one-and-only/403037872?i=403037911',
  },
  {
    id: '7',
    ArtName: 'Mr. Probz',
    SongName: 'Nothing Really Matters',
    youtube: 'https://www.youtube.com/watch?v=eLaNBbKJPfw',
    spotify: 'https://open.spotify.com/track/4fGbdX3qUTOS8Kpsc8hQT6?si=5466e7dd08434ede',
    appleMusic: 'https://music.apple.com/il/album/nothing-really-matters/1532427339?i=1532427340',
  },
  {
    id: '8',
    ArtName: 'Mickey & Sylvia',
    SongName: 'Love Is Strange',
    youtube: 'https://www.youtube.com/watch?v=5SwMB9v1pQ4',
    spotify: 'https://open.spotify.com/track/66Yxbr2UODJjVBKdZtbnOL?si=464d60d853a245e1',
    appleMusic: 'https://music.apple.com/il/album/love-is-strange/254938499?i=254939332',
  },
  {
    id: '9',
    ArtName: 'John Legend',
    SongName: 'You & I',
    youtube: 'https://www.youtube.com/watch?v=Pi3bc9lS3rg',
    spotify: 'https://open.spotify.com/track/55nlbqqFVnSsArIeYSQlqx?si=c08f9e8083064ece',
    appleMusic: 'https://music.apple.com/il/album/you-i-nobody-in-the-world/952586836?i=952586848',
  },
  {
    id: '10',
    ArtName: 'Bon Jovi',
    SongName: 'Always',
    youtube: 'https://www.youtube.com/watch?v=9BMwcO6_hyA',
    spotify: 'https://open.spotify.com/track/2RChe0r2cMoyOvuKobZy44?si=1e4d1c5eff4a4b25',
    appleMusic: 'https://music.apple.com/il/album/always/1440677662?i=1440677806',
  },
  {
    id: '11',
    ArtName: 'Michael Bolton',
    SongName: 'Said I Loved You',
    youtube: 'https://www.youtube.com/watch?v=bv5vMJKBAbo',
    spotify: 'https://open.spotify.com/track/2nfMrwg3aRhSAv4HX7IzJL?si=3c63452c1d054cec',
    appleMusic: 'https://music.apple.com/il/album/said-i-loved-you-but-i-lied/181557319?i=181557329',
  },
  {
    id: '12',
    ArtName: 'Celine Dion',
    SongName: 'I Surrender',
    youtube: 'https://www.youtube.com/watch?v=hnjGqS1Doto',
    spotify: 'https://open.spotify.com/track/67VjdDhTa5jzQxHGe6f26r?si=7664b5bc9fca4666',
    appleMusic: 'https://music.apple.com/il/album/i-surrender/1481512614?i=1481513141',
  },
  {
    id: '13',
    ArtName: 'Aerosmith',
    SongName: 'I Dont Wanna Miss a Thing',
    youtube: 'https://www.youtube.com/watch?v=JkK8g6FMEXE',
    spotify: 'https://open.spotify.com/track/225xvV8r1yKMHErSWivnow?si=b23b8d5abbed465a',
    appleMusic: 'https://music.apple.com/il/album/i-dont-want-to-miss-a-thing/217271260?i=217271368',
  },
  {
    id: '14',
    ArtName: 'Elton John',
    SongName: 'Your Song',
    youtube: 'https://www.youtube.com/watch?v=FT3D1Cu6g10',
    spotify: 'https://open.spotify.com/track/38zsOOcu31XbbYj9BIPUF1?si=dd4a41890ca64b3b',
    appleMusic: 'https://music.apple.com/il/album/your-song-remastered/1422641912?i=1422641913',
  },
  {
    id: '15',
    ArtName: 'Christina Perri',
    SongName: 'A Thousand Years',
    youtube: 'https://www.youtube.com/watch?v=rtOvBOTyX00',
    spotify: 'https://open.spotify.com/track/6z5Yh7kOKeLjqIsNdokIpU?si=9db44b69f3d2436b',
    appleMusic: 'https://music.apple.com/il/album/a-thousand-years/467980710?i=467980724',
  },
  {
    id: '16',
    ArtName: 'Bon Jovi',
    SongName: 'Thank You For Loving Me',
    youtube: 'https://www.youtube.com/watch?v=nddTokI9hHY',
    spotify: 'https://open.spotify.com/track/577MNC3o3L0lNIzx9abqOk?si=80c609968ffd485e',
    appleMusic: 'https://music.apple.com/il/album/thank-you-for-loving-me/1440813234?i=1440813471',
  },


  // הוסף כאן שירים נוספים
];

const LoazitSlowSongsScreen = () => {
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

export default LoazitSlowSongsScreen;
