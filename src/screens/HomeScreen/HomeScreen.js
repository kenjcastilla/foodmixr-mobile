import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useForm, useController } from "react-hook-form";
import { View, Text, TextInput, Keyboard, TouchableWithoutFeedback, Alert } from "react-native";
import { db } from "../../firebase/config";
import { getDoc } from "firebase/firestore";
import { Button } from "@rneui/themed";
import { useFonts } from "expo-font";
import { homeStyles } from "../../Style";

const Input = ({ name, control }) => {
   const { field } = useController({
      control,
      defaultValue: "",
      name,
   });
   return (
      <TextInput
         value={field.value}
         onChangeText={field.onChange}
         placeholder="0000"
         keyboardType="number-pad"
         maxLength={4}
         style={homeStyles.homeInput}
      />
   );
};

const HomeScreen = ({ navigation }) => {
   const { control, handleSubmit } = useForm();

   const onSubmit = (data) => {
      const codeInput = data["code"];
      //TODO: handle code input with Firebase
      const arr = ["012", "1234", "234", "456"];
      let redo = true;
      for (let val of arr) {
         if (val === codeInput) {
            Alert.alert("Code entered: " + codeInput, "Onward.", [
               {
                  text: "OK",
                  onPress: () => console.log("'OK' Pressed"),
                  style: "default",
               },
            ]);
            navigation.navigate("Feed",
               { code: codeInput, }
            );
            redo = !redo;
         }
      }
      if (redo) {
         Alert.alert("Code entered: " + codeInput, "um...no", [
            {
               text: "Try Again",
               onPress: () => console.log("'Try Again' Pressed"),
               style: "default",
            },
         ]);
      }
   }

   const [loaded] = useFonts({
      JosefinSansBold: require("../../../assets/fonts/JosefinSans-Bold.ttf"),
      JosefinSans: require("../../../assets/fonts/JosefinSans-Regular.ttf"),
      JosefinSansMedium: require("../../../assets/fonts/JosefinSans-Medium.ttf"),
   });
   if (!loaded) return null;

   return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         <View style={homeStyles.homeView}>
            <View style={homeStyles.homeLogoView}>
               <Text style={homeStyles.homeLogoText}>foodmixr</Text>
            </View>
            <Text style={homeStyles.homeText}>Enter the code below:</Text>
            <StatusBar style="auto" />
            <Input name="code" control={control} />
            <Button title="Submit"
               buttonStyle={{
                  backgroundColor: "black",
                  borderWidth: 10,
                  borderColor: "black",
                  borderRadius: 10
               }}
               containerStyle={{
                  marginVertical: 25
               }}
               titleStyle={{
                  color: "white",
                  fontFamily: "JosefinSansBold",
                  fontSize: 25,
               }}
               onPress={handleSubmit(onSubmit)}
            />
         </View>
      </TouchableWithoutFeedback>
   );
}

export default HomeScreen;