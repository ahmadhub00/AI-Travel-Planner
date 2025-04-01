import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import moment from 'moment';
import FlightInfo from '../../components/TripDetails/FlightInfo';
import HotelList from '../../components/TripDetails/HotelList';
import PlannedTrip from '../../components/TripDetails/PlannedTrip';

export default function TripDetails() {
  const router = useRouter();
  const { trip } = useLocalSearchParams();
  //console.log("Received trip data:", trip); 

  const [latestTrip, setLatestTrip] = useState(null);
  const [parsedTripData, setParsedTripData] = useState(null); // Initialize state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (trip) {
     // console.log("Raw Trip Data:", trip);
       try {
          const tripObject = typeof trip === "string" ? JSON.parse(trip) : trip;
          //console.log("Parsed Trip Object:", tripObject);
           setLatestTrip(tripObject);  // <-- Set state before using it
       } catch (error) {
          //console.error("Error parsing trip data:", error);
        }}}, [trip]);

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
          {latestTrip?.traveler?.icon} {latestTrip?.tripPlan?.tripDetails?.travelers || "Unknown Traveler"}
        </Text>
     
        {/* Flight Info */}
        {latestTrip?.tripPlan?.flightDetails && (
        <FlightInfo flightData={latestTrip.tripPlan.flightDetails} />
        )}
        {latestTrip?.tripPlan?.flightOptions?.flights && (
        <FlightInfo flightData={latestTrip.tripPlan.flightOptions.flights} />
        )}
        {latestTrip?.tripPlan?.flightOptions && (
        <FlightInfo flightData={latestTrip.tripPlan.flightOptions} />
        )}

        {/*  Hotel Info */}
        {latestTrip?.tripPlan?.hotelOptions?.hotels && (
        <HotelList hotelList={latestTrip?.tripPlan?.hotelOptions.hotels}/>
        )}
        {latestTrip?.tripPlan?.hotelOptions && (
        <HotelList hotelList={latestTrip?.tripPlan?.hotelOptions}/>
        )}
       
        {/*  ) : (
        <Text style={{ fontSize: 16, color: 'grey', marginTop: 10 }}>
          🏨 No Hotel details available
        </Text>
      ) */}

       {/* Trip Day Planner Info */}
       <PlannedTrip details={latestTrip?.tripPlan?.dailyItinerary}/>

      </View>
    </ScrollView>
  );
}
