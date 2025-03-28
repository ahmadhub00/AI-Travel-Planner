/* import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import moment from 'moment'
import UserTripCard from './UserTripCard'
import {useRouter} from 'expo-router';

export default function UserTripList({userTrips}) {
    const LatestTrip=JSON.parse(userTrips[0].tripData)
    const router=useRouter();

  return userTrips&&(
    <View>
      <View style={{marginTop:20}}>
        {LatestTrip?.locationInfo?.photoRef?
        <Image source={{uri:'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='
            +LatestTrip.locationInfo?.photoRef
            +'&key='+process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}}
            style={{
                width:'100%',
                height:240,
                objectFit:'cover',
                borderRadius:15 }}/>
        :
        <Image source={require('../../assets/images/login.jpeg')}
        style={{
            width:'100%',
            height:240,
            objectFit:'cover',
            borderRadius:15 }}/>}

        <View style={{marginTop:10}}> */
             {/*Showing Location*/}
         {/* <Text style={{
                fontFamily:'outfit-medium',
                fontSize:20}}>
             {userTrips[0]?.tripPlan?.tripDetails.location || "No Location Found"}  </Text>
        
        <View style={{
                flexDirection:'row',
                justifyContent:'space-between',
               marginTop:5}}> */}
             {/*Showing date of travel*/}
       /*  <Text style={{
                fontFamily:'outfit',
                fontSize:17}}>
             {moment(LatestTrip.startDate).format('DD MMM yyyy')}</Text>
              */{/*Showing traveler title*/}
       /*  <Text style={{
                fontFamily:'outfit',
                fontSize:17,
                color:'grey'}}>
            🚌 {LatestTrip?.traveler?.title || "Unknown Traveler"}</Text>
         </View>
         <TouchableOpacity 
         onPress={() => router.push({pathname:'/trip-details',params:{
          trip:JSON.stringify(userTrips[0])
         }})}
         style={{
                borderRadius:15,
                marginTop:10,
                backgroundColor:'black',
                padding:15}}>
         <Text style={{
                fontFamily:'outfit-medium',
                fontSize:15,
                textAlign:'center',
                color:'white'}}>
                    See your plan
                </Text></TouchableOpacity>
        </View>
 */
{/*This code iterates over an array called userTrips and creates a list of UserTripCard components, passing each trip's data as a prop.*/}
        /* {userTrips.map((trip,index)=>(
            <UserTripCard trip={trip} key={index}/>
        ))}
        </View>
      </View>
    
  )
} */
  import { View, Text, Image, TouchableOpacity } from 'react-native';
  import React, { useState } from 'react';
  import moment from 'moment';
  import UserTripCard from './UserTripCard';
  import { useRouter } from 'expo-router';
  
  export default function UserTripList({ userTrips }) {
      const router = useRouter();
     //const [selectedTrip, setSelectedTrip] = useState(JSON.parse(userTrips[0].tripData)); // Default to the first trip
      const [selectedTrip, setSelectedTrip] = useState(() => {
        const parsedTripData = JSON.parse(userTrips[0].tripData); // Parse tripData (string)
        return { ...parsedTripData, tripDetails: userTrips[0].tripDetails }; // Merge tripDetails
    });
      console.log("Selected Trip Data:", selectedTrip);
      return userTrips && (
          <View>
              <View style={{ marginTop: 20 }}>
                  {/* Display Main Trip Image */}
                  {selectedTrip?.locationInfo?.photoRef ?
                      <Image source={{
                          uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='
                              + selectedTrip.locationInfo?.photoRef
                              + '&key=' + process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY
                      }}
                          style={{
                              width: '100%',
                              height: 240,
                              objectFit: 'cover',
                              borderRadius: 15
                          }} />
                      :
                      <Image source={require('../../assets/images/login.jpeg')}
                          style={{
                              width: '100%',
                              height: 240,
                              objectFit: 'cover',
                              borderRadius: 15
                          }} />
                  }
  
                  {/* Display Selected Trip Details */}
                  <View style={{ marginTop: 10 }}>
                      <Text style={{
                          fontFamily: 'outfit-medium',
                          fontSize: 20
                      }}>
                          {selectedTrip?.tripPlan?.tripDetails?.location || "No Location Found"}
                      </Text>
  
                      <View style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 5
                      }}>
                          <Text style={{
                              fontFamily: 'outfit',
                              fontSize: 17
                          }}>
                              {moment(selectedTrip.startDate).format('DD MMM yyyy')}
                          </Text>
                          <Text style={{
                              fontFamily: 'outfit',
                              fontSize: 17,
                              color: 'grey'
                          }}>
                              🚌 {selectedTrip?.tripPlan?.tripDetails?.travelers || "Unknown Traveler"}
                          </Text>
                      </View>
  
                      {/* Navigate to Trip Details */}
                      <TouchableOpacity
                          onPress={() => router.push({
                              pathname: '/trip-details',
                              params: { trip: JSON.stringify(selectedTrip) }
                          })}
                          style={{
                              borderRadius: 15,
                              marginTop: 10,
                              backgroundColor: 'black',
                              padding: 15
                          }}>
                          <Text style={{
                              fontFamily: 'outfit-medium',
                              fontSize: 15,
                              textAlign: 'center',
                              color: 'white'
                          }}>
                              See your plan
                          </Text>
                      </TouchableOpacity>
                  </View>
  
                  {/* List of Other Trips */}
                  {userTrips.map((trip, index) => (
                      <UserTripCard key={index} trip={trip}
                      onSelectTrip={() => {
                        const parsedTripData = JSON.parse(trip.tripData);
                        setSelectedTrip({ ...parsedTripData
                            ,tripPlan: { ...parsedTripData.tripPlan, 
                            tripDetails: trip.tripPlan?.tripDetails // Ensure tripDetails is included
                        } });
                    }} />
                  ))}
              </View>
          </View>
      );
  }
  