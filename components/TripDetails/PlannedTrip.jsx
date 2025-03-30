import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { GetPhotoRef } from '../../Services/GooglePlaceApi';
import PlannedCard from './PlannedCard';

export default function PlannedTrip({details= {}}) {
   const [photoRef,setPhotoRef]=useState()
       useEffect(()=>{
          getGooglePhotoRef();
      },[])
  
      const getGooglePhotoRef = async () => {
          try {
            const result = await GetPhotoRef(details);
         //   console.log(result?.results[0]?.photos[0]?.photo_reference);
        const photo=result?.results[0]?.photos[0]?.photo_reference
         setPhotoRef(photo);
  
              // Check if results exist
              if (!result || !result.results || result.results.length === 0) {
                console.warn("No places found for this location.");
                return;
              }
      
          } catch (error) {
            console.error("Error fetching Google Photo Reference:", error);
          }
        }; 
  return (
    <View style={{
        marginTop:20
    }}>
      <Text style={{
        fontSize:20,
        fontFamily:'outfit-bold'
      }}>⛺Plan Details</Text>
{/* <FlatList
      style={{
        marginTop:10
      }}
      data={details || []}
      //horizontal={true}
      renderItem={({item,index})=>(
     <PlannedCard item={item}/>
      )}
      /> */}
       {Object.entries(details).map(([day,dayDetails])=>(
        <View  key={day}>
            <Text style={{
              fontFamily:'outfit-medium',
              fontSize:20,
              marginTop:20
            }}>
        {day.charAt(0).toUpperCase()+day.slice(1)}</Text>
       
        {dayDetails.schedule?.map((place,index)=>(
        <View key={place?.id || index} 
         style={{
          borderWidth:1,
          backgroundColor: '#fafafa' ,
          padding:8,
          borderRadius:15,
          borderColor:'lightgrey',
          marginTop:20
        }}>
          <Image source={{
                uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='
                + photoRef
                +'&key='+process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}}
          style={{
            width:'100%',
            height:120,
            borderRadius:15
          }}/>

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
          }}>⏱️Time Required:  
            <Text style={{fontFamily:'outfit-medium'}}>{place?.duration || place?.timeRequired || "N/A"}</Text> </Text>
        </View>
            <TouchableOpacity style={{marginRight:5,}}>
            <Ionicons name="navigate" size={24} color="black" />
            </TouchableOpacity>
            </View>
            </View>

            </View>
        ))}
        </View>
      ))} 
      
    </View>
  )
} 
 