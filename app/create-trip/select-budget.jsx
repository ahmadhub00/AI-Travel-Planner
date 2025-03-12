import { View, Text, TouchableOpacity } from 'react-native'
import React ,{ useEffect} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

import { useRouter, useNavigation } from 'expo-router';


export default function SelectBudget() {
    const router = useRouter();
    const navigation=useNavigation();

    useEffect (()=>{
        navigation.setOptions({
          headerShown:false 
        })
       },[])

  return (
    <View style={{
        padding: 25,
        paddingTop: 75}}>

      <TouchableOpacity onPress={() => router.push('/create-trip/select-dates')} 
       style={{ padding: 10 }}>
        <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>        
      
      <Text
      style={{
        fontSize: 35, 
        fontFamily: 'outfit-bold', 
        marginTop: 20, 
      }}>Budget</Text>

      <View style={{
           marginTop:20
        }}>
        <Text style={{
            fontSize: 20, 
            fontFamily: 'outfit-bold'
        }}> Choose sepending habits for your trip </Text>
      </View>
    </View>
  )
}