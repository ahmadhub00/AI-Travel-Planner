import { View, Text, Image } from 'react-native'
import React from 'react'

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
          <Text style={{
             fontFamily:'outfit',
             fontSize:15,
             marginTop:5
          }}>🎟️Ticket Price:  {place?.ticketPricing || "No Price available"} </Text>
           <Text style={{
             fontFamily:'outfit',
             fontSize:15,
             marginTop:5
          }}>⏱️Time Required:  {place?.duration || place?.timeRequired} </Text>
        
            </View>

            </View>
        ))}
        </View>
      ))}
      
    </View>
  )
}