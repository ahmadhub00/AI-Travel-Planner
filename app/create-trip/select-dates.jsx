import { View, Text,TouchableOpacity } from 'react-native'
import React , { useEffect, useContext ,useState}from 'react'
import { Link, useNavigation ,useRouter} from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import CalendarPicker from 'react-native-calendar-picker';
export default function SelectDates() {
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
        paddingTop: 75,
        backgroundColor: "white",
        height: '100%'
    }}>
        <TouchableOpacity
      onPress={() => router.push('/create-trip/select-traveler')}
      style={{ padding: 10 }}>
      <Ionicons name="arrow-back" size={28} color="black" />
    </TouchableOpacity>

      <Text style={{
        fontSize: 35, 
        fontFamily: 'outfit-bold', 
        marginTop: 20,
        
      }}>Travel Dates</Text>
      <CalendarPicker onDateChange={this.onDateChange} />     
    </View>
  )
}