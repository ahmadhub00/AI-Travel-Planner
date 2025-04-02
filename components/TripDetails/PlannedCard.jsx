
import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { GetPhotoRef } from '../../Services/GooglePlaceApi';
 
 export default function PlannedCard ({place}){
      const [photoRef,setPhotoRef]=useState(null);
     useEffect(()=>{
      if (place?.placeName) {
         getGooglePhotoRef();  }
     },[place?.placeName])
 
     const getGooglePhotoRef = async () => {
         try {
          const result = await GetPhotoRef(place?.placeName );
          const photo = result?.results?.[0]?.photos?.[0]?.photo_reference;
        if (photo) {
          setPhotoRef(photo);
        } else {
          console.warn(`No photo found for ${place?.placeName}`);
        }
      } catch (error) {
        console.error('Error fetching Google Photo Reference:', error);
      }
    };
return (     
       <View>
          {photoRef && (
            <Image source={{
                uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='
                + photoRef
                +'&key='+process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}}
          style={{
            width:'100%',
            height:120,
            borderRadius:15
          }}/> )}

          <View style={{
            marginTop:5
          }}>
          <Text style={{
            fontFamily:'outfit-medium',
            fontSize:17
          }}>{place?.placeName  || place?.activity}</Text>
            <Text style={{
            fontFamily:'outfit',
            fontSize:15
          }}><Text>{place?.placeDetails || place?.details || "No details available"}</Text></Text>
        
         <View style={{
             display:'flex',
             flexDirection:'row',
             alignItems:'center',
             justifyContent:'space-between',
             width: '100%'
         }}>
          <View style={{flexShrink: 1, 
             flexDirection:'column'}}>
          <Text style={{
             fontFamily:'outfit',
             fontSize:15,
             marginTop:5
          }}>🎟️Ticket Price:  
          <Text style={{fontFamily:'outfit-medium'}}>{place?.ticketPricing || "N/A"}</Text> </Text>
           
           <Text style={{
             fontFamily:'outfit',
             fontSize:15,
             marginTop:5
          }}>⌛Time Required:  
            <Text style={{fontFamily:'outfit-medium'}}>{place?.duration || place?.timeRequired || "N/A"}</Text> </Text>
        
            <Text style={{
             fontFamily:'outfit',
             fontSize:15,
             marginTop:5
          }}>⏱️Best Time To Visit:  
            <Text style={{fontFamily:'outfit-medium'}}>{place?.bestTimeToVisit || "N/A"}</Text> </Text>
        </View>
            <TouchableOpacity style={{marginRight:5,}}>
            <Ionicons name="navigate" size={24} color="black" />
            </TouchableOpacity>
            </View>
            </View>

            </View>
)};