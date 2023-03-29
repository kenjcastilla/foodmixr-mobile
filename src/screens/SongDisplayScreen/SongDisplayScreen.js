import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image, Text, Keyboard, TouchableWithoutFeedback, RefreshControl, SafeAreaView, ScrollView } from 'react-native';
import { db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useFonts } from 'expo-font';
import { styles } from '../../Style';


const SongDisplayScreen = ({ route, navigation }) => {
   const { code } = route.params;
   // const code = '1234';
   console.log(code);
   const [loaded] = useFonts({
      JosefinSansBold: require("../../../assets/fonts/JosefinSans-Bold.ttf"),
      JosefinSans: require("../../../assets/fonts/JosefinSans-Regular.ttf"),
      JosefinSansMedium: require("../../../assets/fonts/JosefinSans-Medium.ttf"),
   });
   const [album, setAlbum] = useState("");
   const [artists, setArtists] = useState("");
   const [image, setImage] = useState("");
   const [timeLeft, setTimeLeft] = useState(5000);
   const [title, setTitle] = useState("");
   const [trackLink, setTrackLink] = useState("");
   const [uid, setUid] = useState("");
   const [loading, setLoading] = useState(null);
   const [refreshing, setRefreshing] = useState(false);

   const setTrackInfoFromFirestore = async (uid) => {
      console.log('CALLING SETTRACKINFOFROMFIRESTORE().')
      const trackRef = doc(db, "current-track", uid);
      const snapshot = await getDoc(trackRef)
         .then((snapshot) => {
            const data = snapshot.data();
            const track = JSON.parse(JSON.stringify(data));
            console.log(track);
            setAlbum(track.album);
            const arts = track.artists.join(", ");
            setArtists(arts);
            setImage(track.image);
            setTimeLeft(track.time_left);
            setTitle(track.name);
            setTrackLink(track.link);
            setLoading(true);
         })
         .catch((error) => { console.log(error) });
      // setLoading(false);
   };

   const userRef = doc(db, "users", code);
   const helpSetUid = async () => {
      const snapshot = await getDoc(userRef)
         .then((snapshot) => {
            const data = snapshot.data();
            const content = JSON.parse(JSON.stringify(data));
            console.log(content);
            setUid(content.user_id);
            setTrackInfoFromFirestore(content.user_id);
         })
         .catch((error) => { console.log(error) });
   };

   if (!uid) {
      console.log('UID NOT SET. CALLING HELPSETUID()...')
      helpSetUid();
   }
   else {
      console.log(`UID: ${uid}`);
   }

   // const onRefresh = React.useCallback(() => {
   //    console.log(`Current track: ${title} by ${artists} from ${album}`);
   //    setRefreshing(true);
   //    setTrackInfoFromFirestore();
   //    setTimeout(() => {
   //       setRefreshing(false);
   //    }, 3000);
   //    console.log(`Current track: ${title} by ${artists} from ${album}`)
   // }, []);

   useEffect(() => {
      setTrackInfoFromFirestore();
      // console.log(timeLeft);
      // setInterval(() => {
      //    setTrackInfoFromFirestore();
      // }, 70000);

   }, []);

   return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         {/* <SafeAreaView style={styles.songView}>
         <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
               <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }> */}
         <View style={styles.songView}>
            <View style={styles.songLogoView}>
               <Text style={styles.songLogoText}>foodmixr</Text>
               <View style={styles.songImageFrame}>
                  <Image style={styles.songImage} source={{ uri: image }} />
               </View>
               <View style={styles.songInfoView}>
                  <Text style={styles.songTitleText}>{title}</Text>
                  <Text style={styles.albumText}>{album}</Text>
                  <Text style={styles.songArtistsText}>{artists}</Text>
               </View>
            </View>
            <StatusBar style="auto" />
         </View>
         {/* </ScrollView>
      </SafeAreaView> */}
      </TouchableWithoutFeedback>
   );
}

export default SongDisplayScreen;