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
}*/

 /* import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import moment from 'moment'
import FlightInfo from '../../components/TripDetails/FlightInfo';

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
  console.log("Start Date :", ParsedTripData?.startDate);
  console.log("End Date :", ParsedTripData?.endDate);
  console.log("Flight Details:", LatestTrip?.tripPlan?.flightDetails);

  return (
   <ScrollView>
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
            height: 300,
            borderTopLeftRadius:20,
            borderTopRightRadius:20
          }}
        />
      ) : (
        <Text>No Image Available</Text>
      )}</View>
      <View style={{
        borderRadius: 50,
         position: 'absolute',
         top:35,
         left:2}}>
      <TouchableOpacity onPress={() => router.back()} style={{ padding: 10 }} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
        <Ionicons name="arrow-back" size={30} color="white" />
      </TouchableOpacity></View>
    </View>

      <View style={{
        padding:2,
        backgroundColor:'white',
        height:'200%',
        marginTop:-30,
        borderTopLeftRadius:20,
        borderTopRightRadius:20  }}>
        <Text style={{
          padding:10,
          fontSize:25,
          fontFamily:'outfit-bold'}}>
         {LatestTrip?.tripPlan?.tripDetails?.location || "Location Not Available"}</Text>
        
        <View style={{
          marginLeft:15,
          display:'flex',
          flexDirection:'row',
          gap:10,
          marginTop:-5
        }}>
        <Text style={{
          fontFamily:'outfit',
          fontSize:16,
          color:'grey'}}>
         <Text>{moment(ParsedTripData?.startDate).format('DD MMM yyyy')} - </Text>
         <Text>{moment(ParsedTripData?.endDate).format('DD MMM yyyy')}</Text>
        </Text>
        </View> 
         <Text style={{
            fontFamily:'outfit',
            fontSize:17,
            color:'grey',
            marginLeft:14}}>
          🚌 {LatestTrip?.tripPlan?.tripDetails?.travelers || "Unknown Traveler"}</Text>
      
      {/* Flight Info */
     /*  <FlightInfo flightData={LatestTrip?.tripPlan?.flightDetails?.flights}/>
      </View>
      </ScrollView>
  );
}
 */ 
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import moment from 'moment';
import FlightInfo from '../../components/TripDetails/FlightInfo';
import HotelList from '../../components/TripDetails/HotelList';

export default function TripDetails() {
  const router = useRouter();
  const { trip } = useLocalSearchParams();
  console.log("Received trip data:", trip); 

  const [latestTrip, setLatestTrip] = useState(null);
  const [parsedTripData, setParsedTripData] = useState(null); // Initialize state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (trip) {
      console.log("Raw Trip Data:", trip);
  
      try {
        const tripObject = typeof trip === "string" ? JSON.parse(trip) : trip;
        console.log("Parsed Trip Object:", tripObject);
  
        setLatestTrip(tripObject);  // <-- Set state before using it
      } catch (error) {
        console.error("Error parsing trip data:", error);
      }
    }
  }, [trip]);

  console.log("Trip Object Before Usage:", latestTrip); // Use latestTrip instead of undefined tripObject
  console.log("Latest Trip" ,latestTrip)
  return (
    <ScrollView>
      {/* Image Section */}
      <View style={{ position: 'relative' }}>
        {latestTrip?.locationInfo?.photoRef ? (
          <Image
            source={{
              uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${latestTrip.locationInfo.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
            }}
            style={{
              width: '100%',
              height: 300,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />
        ) : (
          <Text style={{ textAlign: 'center', padding: 20 }}>No Image Available</Text>
        )}

        {/* Back Button */}
        <View style={{ position: 'absolute', top: 40, left: 10 }}>
          <TouchableOpacity onPress={() => router.back()} style={{ padding: 10 }} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Trip Details */}
      <View style={{
        padding: 15,
        backgroundColor: 'white',
        minHeight: '100%',
        marginTop: -30,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
      }}>
        {/* Location */}
        <Text style={{
          fontSize: 25,
          fontFamily: 'outfit-bold'
        }}>
          {latestTrip?.locationInfo?.name || "Location Not Available"}
        </Text>

        {/* Dates */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 5
        }}>
          <Text style={{
            fontFamily: 'outfit',
            fontSize: 16,
            color: 'grey'
          }}>
            {moment(latestTrip?.startDate).format('DD MMM yyyy')} - {moment(latestTrip?.endDate).format('DD MMM yyyy')}
          </Text>
        </View>

        {/* Traveler Info */}
        <Text style={{
          fontFamily: 'outfit',
          fontSize: 17,
          color: 'grey',
          marginTop: 5
        }}>
          {latestTrip?.traveler?.icon} {latestTrip?.traveler?.title || "Unknown Traveler"}
        </Text>

        {/* Flight Info (if available) */}
        
        {latestTrip?.tripPlan?.flightDetails?.flights ? (
          <FlightInfo flightData={latestTrip.tripPlan.flightDetails.flights} />
        ) : (
          <Text style={{ fontSize: 16, color: 'grey', marginTop: 10 }}>
            ✈️ No flight details available
          </Text>
        )}
       {/*  Hotel Info */}
       <HotelList hotelList={latestTrip?.tripPlan?.hotelOptions}/>

      </View>
    </ScrollView>
  );
}
