import { View, Text, FlatList, Image,TouchableOpacity, Linking  } from 'react-native'
import React from 'react'

export default function FlightInfo({ flightData = [] }) {
  return (
    <View style={{
        marginTop:20,
        borderWidth:1,
        borderRadius:16,
        borderColor:'lightgrey',
        backgroundColor: '#fafafa',
        padding:10
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20
      }}>✈️ Flights</Text>

      <FlatList
      style={{
        marginTop:9
      }}
      data={flightData }
      horizontal={true}
      renderItem={({item,index})=>(

     <View style={{
            marginRight:5,
            Width:180,
            width: 250, 
            flexWrap: 'wrap'}}>
            {/* <Image source={require('./../../assets/images/login.jpeg')}
            style={{
                width:180,
                height:120,
                borderRadius:15
            }}/> */}
        
     <View style={{ marginBottom: 10 }}>
        <Text style={{ fontFamily: 'outfit-medium', fontSize: 18 }}>
            Airline: 
            <Text style={{ fontFamily: 'outfit', fontSize: 15 }}> {item?.airline ||  "N/A"}
           </Text></Text>

           <Text style={{ fontFamily: 'outfit-medium', fontSize: 18 ,width:200 }}
             numberOfLines={2} ellipsizeMode="tail">
            Price:
            <Text style={{ fontFamily: 'outfit', fontSize: 15 }}> {item?.estimatedPrice || "N/A"}
           </Text></Text>


        {item?.bookingURL && (
        <TouchableOpacity
            style={{ backgroundColor: 'black', padding: 7, width: 110, borderRadius: 7, marginTop: 5 }}
           onPress={() => Linking.openURL(item?.bookingURL)}>
            {/* onPress={() => {
           const urls = item.bookingURL.split(",").map(url => url.trim()); // Split and trim spaces
           if (urls.length > 0) {
           Linking.openURL(`https://${urls[0]}`); }}}> */}
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