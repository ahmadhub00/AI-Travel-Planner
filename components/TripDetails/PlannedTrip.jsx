import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function PlannedTrip({details= {}}) {
  return (
    <View style={{
        marginTop:20
    }}>
      <Text style={{
        fontSize:20,
        fontFamily:'outfit-bold'
      }}>⛺Plan Details</Text>

      {Object.entries(details).map(([day,dayDetails])=>(
        <View>
            <Text style={{
              fontFamily:'outfit-medium',
              fontSize:20,
              marginTop:20
            }}>
        {day.charAt(0).toUpperCase()+day.slice(1)}</Text>
        {dayDetails.schedule?.map((place,index)=>(
        <View  style={{
          borderWidth:1,
          backgroundColor: '#fafafa' ,
          padding:8,
          borderRadius:15,
          borderColor:'lightgrey',
          marginTop:20
        }}>
          <Image source={require('./../../assets/images/login.jpeg')}
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
          <Text style={{fontFamily:'outfit-medium'}}>{place?.ticketPricing || "No Price available"}</Text> </Text>
           <Text style={{
             fontFamily:'outfit',
             fontSize:15,
             marginTop:5
          }}>⏱️Time Required:  
            <Text style={{fontFamily:'outfit-medium'}}>{place?.duration || place?.timeRequired}</Text> </Text>
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