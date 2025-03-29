import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'

export default function HotelList({hotelList}) {
  return (
    <View style={{
        marginTop:20
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20
      }}>🏨 Hotels Recommended</Text>

      <FlatList
      style={{
        marginTop:10
      }}
      data={hotelList}
      horizontal={true}
      renderItem={({item,index})=>(
        <View>
            <Image source={require('./../../assets/images/login.jpeg')}
            style={{
                width:180,
                height:120,
                borderRadius:15
            }}/>

     <Text>{item.hotelName}</Text>
        </View>
      )}
      />
    </View>
  )
}