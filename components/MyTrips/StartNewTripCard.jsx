import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function StartNewTripCard() {

    const router=useRouter();

  return (
    <View style={{
        padding:20,
        marginTop:50,
        display:'flex',
        alignItems:'center',
        gap:25
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

    <TouchableOpacity
    onPress={()=>router.push('/create-trip/search-place')}
    style={{
        padding:15,
        backgroundColor:"black",
        borderRadius:15,
        paddingHorizontal:30,
    }}>
        <Text style={{
         color:"white",
         fontFamily:'outfit-medium',
         fontSize:17
        }}> Start a new Trip </Text>
    </TouchableOpacity>
    </View>
  )
}