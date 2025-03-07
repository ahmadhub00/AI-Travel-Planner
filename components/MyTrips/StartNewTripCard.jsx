import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function StartNewTripCard() {
  return (
    <View style={{
        padding:20,
        marginTop:50,
        display:'flex',
        alignItems:'center',
        gap:20
    }}>
    <Ionicons name="location-sharp" size={30} color="black" />
    <Text style={{
        fontSize:25,
        fontFamily:'outfit-medium',
        marginTop:10
    }}>
        No Trips Planned Yet
    </Text>
    <Text style={{
        fontSize:20,
        fontFamily:'outfit',
        textAlign:'center',
        color:"grey"
    }}>
        Looks like its time to plan a new travel experience! Get started below
    </Text>

    <TouchableOpacity style={{
        padding:15,
        backgroundColor:"black",
        borderRadius15,
        paddingHorizontal:30,
    }}>
        <Text>Start a new Trip</Text>
    </TouchableOpacity>
    </View>
  )
}