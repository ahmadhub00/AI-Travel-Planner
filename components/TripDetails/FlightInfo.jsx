/* import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function FlightInfo({flightData = [] }) {
    console.log("Received Flight Data:", flightData);
  return (
    <View style={{
        marginTop:20,
        marginLeft:10,
        marginRight:10,
        borderWidth:2,
        borderColor:'lightgrey',
        padding:10,
        borderRadius:15
    }}>
        
        <View  style={{
       display:'flex',
       flexDirection:'row',
       justifyContent:'space-between',
       alignItems:'center'
      }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20
      }}>✈️ Flights</Text>
      <TouchableOpacity style={{
        backgroundColor:'black',
        padding:5,
        width:90,
        borderRadius:7
    }}>
    <Text style={{
        textAlign:'center',
        color:'white',
        fontFamily:'outfit'
    }}>Book Here</Text>
    </TouchableOpacity>
    </View>
      <Text style={{
        fontFamily:'outfit',
        fontSize:17
      }}>Airline: {flightData[0]?.airline}</Text>
      <Text style={{
        fontFamily:'outfit',
        fontSize:17
      }}>Price: {flightData[0]?.estimatedPrice}</Text>
    
    
    </View>
  )
} */

import { View, Text, TouchableOpacity, Linking } from 'react-native';
import React from 'react';

export default function FlightInfo({ flightData = [] }) {
  console.log("Received Flight Data:", flightData);

  if (!flightData || flightData.length === 0) {
    return (
      <View style={{
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'lightgrey',
        alignItems: 'center'
      }}>
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 18 }}>✈️ No Flights Available</Text>
      </View>
    );
  }

  return (
    <View style={{
      marginTop: 20,
      marginLeft: 10,
      marginRight: 10,
      borderWidth: 2,
      borderColor: 'lightgrey',
      padding: 10,
      borderRadius: 15
    }}>
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 20
        }}>✈️ Flights</Text>
      </View>

      {/* Flight List */}
     {/*  {flightData.map((flight, index) => ( */}
        <View /* key={index} */ style={{ marginBottom: 10 }}>
          <Text style={{
            fontFamily: 'outfit',
            fontSize: 17
          }}>Airline: {flightData[0]?.airline || "Unknown"}</Text>

          <Text style={{
            fontFamily: 'outfit',
            fontSize: 17
          }}>Price: {flightData[0]?.estimatedPrice || "N/A"}</Text>

          {/* Booking Button (if booking URL exists) */}
          {/* {flight?.bookingURL && ( */}
            <TouchableOpacity
              style={{
                backgroundColor: 'black',
                padding: 7,
                width: 110,
                borderRadius: 7,
                marginTop: 5
              }}
              onPress={() => Linking.openURL(flightData[0]?.bookingURL)}
            >
              <Text style={{
                textAlign: 'center',
                color: 'white',
                fontFamily: 'outfit'
              }}>Book Here</Text>
            </TouchableOpacity>
          {/* )} */}
        </View>
      {/* ))} */}
    </View>
  );
}
