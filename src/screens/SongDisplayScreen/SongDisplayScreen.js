import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image, Text, Keyboard, TouchableWithoutFeedback, Linking, RefreshControl, ScrollView } from 'react-native';
import { db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useFonts } from 'expo-font';
import { songDisplayStyles } from '../../Style';

const SongDisplayScreen = ({ route, navigation }) => {
   const { code } = route.params;
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
   const [refreshing, setRefreshing] = useState(false);

   const wait = (timeout) => {
      return new Promise(resolve => setTimeout(resolve, timeout));
   }

   const onRefresh = useCallback(() => {
      setRefreshing(true);
      setTrackInfoFromFirestore(uid);
      wait(2000).then(() => { setRefreshing(false) })
   });

   const setTrackInfoFromFirestore = async (uid) => {
      const trackRef = doc(db, "current-track", uid);
      const snapshot = await getDoc(trackRef)
         .then((snapshot) => {
            const data = snapshot.data();
            const track = JSON.parse(JSON.stringify(data));
            console.log(track);
            setAlbum(track.album);
            const arts = track.artists.join(", ");
            if (arts.length <= 205)
               setArtists(arts);
            else
               setArtists(arts.substring(0, 201) + '...');
            setImage(track.image);
            setTimeLeft(track.time_left);
            if (track.name.length <= 56)
               setTitle(track.name);
            else
               setTitle(track.name.substring(0, 52) + '...');
            setTrackLink(track.link);
         })
         .catch((error) => { console.log(error) });
   };

   const userRef = doc(db, "users", code);
   const helpSetUid = async () => {
      const snapshot = await getDoc(userRef)
         .then((snapshot) => {
            const data = snapshot.data();
            const content = JSON.parse(JSON.stringify(data));
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

   useEffect(() => {
      setTrackInfoFromFirestore();
   }, []);

   return (
      <View style={songDisplayStyles.overallView}>

         <ScrollView contentContainerStyle={songDisplayStyles.scrollView} refreshControl={
            <RefreshControl
               refreshing={refreshing}
               onRefresh={onRefresh}
               title='calm down im gettin ur music'
               progressBackgroundColor={'lightyellow'} />
         }
         >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
               <View style={songDisplayStyles.songView}>
                  <View style={songDisplayStyles.songLogoView}>
                     <Text style={songDisplayStyles.songLogoText}>foodmixr</Text>
                     <View style={songDisplayStyles.songImageFrame}>
                        <Image style={songDisplayStyles.songImage} source={{ uri: image }} />
                     </View>
                     <View style={songDisplayStyles.songInfoView}>
                        <Text style={songDisplayStyles.songTitleText}
                           onPress={() => { Linking.openURL(trackLink) }}>
                           {title}
                        </Text>
                        <Text style={songDisplayStyles.albumText}>{album}</Text>
                        <Text style={songDisplayStyles.songArtistsText}>{artists}</Text>
                     </View>
                  </View>
                  <StatusBar style="auto" />
               </View>
            </TouchableWithoutFeedback>
         </ScrollView>

      </View>
   );
}

export default SongDisplayScreen;