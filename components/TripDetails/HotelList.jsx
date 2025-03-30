import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'

export default function HotelList({hotelList}) {
  return (
    <View style={{
        marginTop:20,
        borderWidth:1,
        borderRadius:16,
        borderColor:'grey'
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20
      }}>🏨 Hotels Recommended</Text>

      <FlatList
      style={{
        marginTop:8
      }}
      data={hotelList}
      horizontal={true}
      renderItem={({item,index})=>(

        <View style={{
            marginRight:30,
            Width:180
        }}>
            <Image source={require('./../../assets/images/login.jpeg')}
            style={{
                width:220,
                height:120,
                borderRadius:15
            }}/>

       <View style={{padding:5}}>
          <Text 
          style={{
            fontFamily:'outfit',
            fontSize:17,
            width: 200}}>
          {item?.hotelName}</Text>
         <View style={{
          display:'flex',
          flexDirection:'row'
         }}>
          <Text style={{
           fontFamily:'outfit'
          }}>
          ⭐{item.rating}</Text>
          <Text style={{
           fontFamily:'outfit',
           width:200,
           marginLeft: 20}}
           numberOfLines={1} ellipsizeMode="tail">
          💰{item.estimatedPricePerNight}</Text>
          </View>
         
         </View>
        </View>
      )}
      />
    </View>
  )
}