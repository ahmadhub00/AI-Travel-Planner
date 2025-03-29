import { View, Text, FlatList, Image,TouchableOpacity, Linking  } from 'react-native'
import React from 'react'

export default function FlightInfo({ flightData = [] }) {
  return (
    <View style={{
        marginTop:20
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20
      }}>✈️ Flights</Text>

      <FlatList
      style={{
        marginTop:10
      }}
      data={flightData }
      horizontal={true}
      renderItem={({item,index})=>(

     <View style={{
            marginRight:15,
            Width:180,
            width: 250, // Adjust width as needed
            flexWrap: 'wrap'}}>
            {/* <Image source={require('./../../assets/images/login.jpeg')}
            style={{
                width:180,
                height:120,
                borderRadius:15
            }}/> */}
        
     <View style={{ marginBottom: 10 }}>
        <Text style={{ fontFamily: 'outfit', fontSize: 17 }}>
            Airline: {item?.airline || "Unknown"}
           </Text>
        <Text style={{ fontFamily: 'outfit', fontSize: 17 }}>
          Price: {item?.estimatedPrice || "N/A"}
           </Text>

        {item?.bookingURL && (
        <TouchableOpacity
            style={{ backgroundColor: 'black', padding: 7, width: 110, borderRadius: 7, marginTop: 5 }}
           onPress={() => Linking.openURL(item?.bookingURL)}>
           <Text style={{ textAlign: 'center', color: 'white', fontFamily: 'outfit' }}>
           Book Here
           </Text>
          </TouchableOpacity>)}
            </View>
            </View>
            )}/>
    </View>
  )
}