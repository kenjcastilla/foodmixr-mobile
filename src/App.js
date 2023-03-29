import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './screens';
import { SongDisplayScreen } from './screens';
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    JosefinSansBold: require('../assets/fonts/JosefinSans-Bold.ttf'),
    JosefinSans: require('../assets/fonts/JosefinSans-Regular.ttf'),
    JosefinSansMedium: require('../assets/fonts/JosefinSans-Medium.ttf'),
  });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "lightyellow",
          }
        }}>
        <Stack.Screen name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Feed" component={SongDisplayScreen}
          options={{
            headerBackTitleStyle: { fontFamily: "JosefinSansBold" },
            headerShadowVisible: false,
            headerTitle: " "
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );

}
