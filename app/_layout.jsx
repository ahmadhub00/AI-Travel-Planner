import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import {CreateTripContext }from './../constants/context/CreateTripContext';
import { useState } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '../constants/context/ThemeContext';
import { UserLocationContext } from '../constants/context/UserLocationContext'; // 👈 import this

export default function RootLayout() {
 
  useFonts({
    'outfit' : require ('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium' : require ('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold' : require ('./../assets/fonts/Outfit-Bold.ttf'),
  })

  const[tripData,setTripData]=useState({});
  const [userLocation, setUserLocation] = useState(null);
  
  return (
    <ThemeProvider>
   <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
    <CreateTripContext.Provider value={{tripData,setTripData}}>
  <Stack screenOptions={{
    headerShown:false}}>
    {/*<Stack.Screen name="index" options={{
      headerShown:false
    }}/>*/}
    <Stack.Screen name="(tabs)"/>
    </Stack>
    </CreateTripContext.Provider>
    </UserLocationContext.Provider>
       </ThemeProvider>
  );
}
