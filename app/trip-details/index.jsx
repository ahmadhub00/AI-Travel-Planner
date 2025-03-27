import { View, Text, TouchableOpacity } from 'react-native'
import React , { useEffect, useContext, useState } from 'react'
import { useRouter, useNavigation, useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'react-native';

export default function TripDetails() {
  const router = useRouter();
  const{trip}=useLocalSearchParams();
 const [tripDetails,setTripDetails]=useState([]);
 /* const formatData=(data)=>{
  return JSON.parse(data);
 } ;  */
  const formatData = (data) => {
  if (typeof data === "object") {
    return data; // Already an object
  }
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Error parsing tripData:", error);
      return {}; // Fallback empty object
    }
  }
  // Fallback
}; 
 //const LatestTrip=JSON.parse(userTrips[0].tripData)
   
  
  return (
    <View style={{ 
      padding: 25, 
      paddingTop: 75,
       backgroundColor: "white",
        height: '100%' }}>
          
        <TouchableOpacity onPress={() => router.back()} 
        style={{ padding: 10 }}>
            <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
<View style={{marginTop:20}}>
        
                <Image source={{uri:'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='
                    +formatData(tripDetails?.tripData).locationInfo?.photoRef
                    +'&key='+process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}}
                    style={{
                        width:'100%',
                        height:100,
          
                        borderRadius:15 }}/>
                 
                </View>
            
    </View>
  )}
