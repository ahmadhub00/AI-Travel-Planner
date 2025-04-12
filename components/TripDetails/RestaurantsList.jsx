import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect } from 'react'
import RestaurantCard from './RestaurantCard';

export default function HotelList(/*  hotelList}*/) {
  
  return (
    <View style={{
        marginTop:20,
        borderWidth:1,
        borderRadius:16,
        borderColor:'lightgrey',
        padding:10,
        backgroundColor: '#fafafa' 
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20
      }}>🍽️  Restaurants Recommended</Text>

      <FlatList
      style={{
        marginTop:10
      }}
      data={hotelList || []}
      horizontal={true}
      renderItem={({item,index})=>(
     <HotelCard item={item}/>
      )}
      />
    </View>
  )
} 
 