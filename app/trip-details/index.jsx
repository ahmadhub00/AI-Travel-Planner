/* import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TripDetails() {
  const router = useRouter();
  const { trip } = useLocalSearchParams(); // Get the trip data from URL params
  //const LatestTrip = JSON.parse(trip); // ✅ Convert the string into an object
  const [tripDetails,setTripDetails]=useState([]);
  let LatestTrip = {};
  let ParsedTripData = {};

  if (typeof trip === "string") {
    LatestTrip = JSON.parse(trip); // Convert string to object
  } else {
    LatestTrip = trip; // Use as is
  }

  ParsedTripData = JSON.parse(LatestTrip.tripData);
  return (
    <View style={{ marginTop: 20, padding: 15 }}>
      <TouchableOpacity onPress={() => router.back()} style={{ padding: 10 }}>
        <Ionicons name="arrow-back" size={28} color="black" />
      </TouchableOpacity>

        <Image
          source={{
            uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='
              + ParsedTripData.locationInfo?.photoRef
              + '&key=' + process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY
          }}
          style={{
            width: '100%',
            height: 300,
            borderRadius: 15
          }}
        />
      <View>
        <Text>{ParsedTripData?.tripDetails.location}</Text>
      </View>
    </View>
  );
}

 */import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TripDetails() {
  const router = useRouter();
  const { trip } = useLocalSearchParams(); // Get the trip data from URL params

  console.log("Received trip data:", trip); // Debugging ✅

  let LatestTrip = {};
  let ParsedTripData = {};

  if (trip) {
    try {
      LatestTrip = typeof trip === "string" ? JSON.parse(trip) : trip;
      console.log("Parsed Trip Object:", LatestTrip); // Debugging ✅
      if (LatestTrip.tripData) {
        ParsedTripData = JSON.parse(LatestTrip.tripData);
        console.log("Parsed TripData:", ParsedTripData); // Debugging ✅
      }
    } catch (error) {
      console.error("Error parsing trip data:", error);
    }
  } else {
    console.warn("Trip data is missing!");
  }
 const TripData = LatestTrip;
  console.log("Trip Plan:", ParsedTripData.tripPlan);
console.log("Trip Details:", ParsedTripData.tripPlan?.tripDetails);
console.log("Location:", ParsedTripData.tripPlan?.tripDetails?.location);console.log("Full ParsedTripData:", JSON.stringify(ParsedTripData, null, 2));
  return (
   <View>
     <View style={{ position: 'relative' }}>
    
    <View >
      {ParsedTripData?.locationInfo?.photoRef ? (
        <Image
          source={{
            uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='
              + ParsedTripData.locationInfo.photoRef
              + '&key=' + process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY
          }}
          style={{
            width: '100%',
            height: 300
          }}
        />
      ) : (
        <Text>No Image Available</Text>
      )}</View>
      <View style={{
        borderRadius: 50,
         position: 'absolute',
         top:35,
         left:2
         }}>
              <TouchableOpacity onPress={() => router.back()} style={{ padding: 10 }} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
        <Ionicons name="arrow-back" size={30} color="white" />
      </TouchableOpacity></View>
</View>

      <View style={{
        pading:15,
        backgroundColor:'white',
        height:'100%',
        marginTop:-30,
        borderTopLeftRadius:30,
        borderTopRightRadius:30
      }}>
        <Text style={{padding:10}}>{LatestTrip?.tripPlan?.tripDetails?.location || "Location Not Available"}</Text>
      </View>
      
    </View>
  );
}
