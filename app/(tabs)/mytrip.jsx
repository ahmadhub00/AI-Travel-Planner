import { View, Text } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import StartNewTripCard from '../../components/MyTrips/StartnewTripCard';

export default function MyTrip() {

    const [userTrips,setUserTrips]=useState([]);
  return (
    <View style={{
        padding:25,
        paddingTop:55,
        backgroundColor:"white",
        height:'100%'
    }}>
      <View style={{
        display:'flex',
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'space-between'
      }}>
        <Text style={{
        fontFamily:'outfit-bold',
        fontSize:35
      }}>MyTrip</Text>
      <Ionicons name="add" size={24} color="black" />
    </View> 

    {userTrips?.length==0?
    <StartNewTripCard/>
    :null
    }
   </View>
  )
}