import { View, Text,Image } from 'react-native'
import React, { useEffect, useContext ,useState}  from 'react'
import { useNavigation ,useRouter} from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CreateTripContext } from '../../context/CreateTripContext';
import { AI_PROMPT } from '../../constants/Options';


export default function GenerateTrip () {
  const {tripData,setTripData} = useContext(CreateTripContext);  
    
  useEffect(()=>{
    tripData&&GenerateAiTrip()
  },[tripData])

  const GenerateAiTrip=()=>{
         const FINAL_PROMPT=AI_PROMPT
         .replace('{location}',tripData?.locationInfo?.name)
         .replace('{totalDays}',tripData.totalNoOfDays)
         .replace('{totalNights}',tripData.totalNoOfDays-1)
         .replace('{traveler}',tripData.traveler?.title)
         .replace('{budget}',tripData.budget)
         .replace('{totalDays}',tripData.totalNoOfDays)
         .replace('{totalNights}',tripData.totalNoOfDays-1);
       
         console.warn(FINAL_PROMPT);
        }

  return (
    <View style={{
        padding :25,
        paddingTop: 75, 
        backgroundColor: "white",
        height: '100%'
    }}>
      <Text style={{
        fontSize: 35,
        fontFamily: 'outfit-bold',
        textAlign: 'center' 
      }}> Please wait </Text>

      <Text style={{
        fontSize: 20,
        fontFamily: 'outfit-medium',
        textAlign: 'center',
        marginTop: 20 
      }}> we are working to generate Trip </Text>

<Image source={require('../../assets/images/plane1.gif')}  
    style={{
        width:'100%',
        height:400,
       objectFit:'contain'
    }}/>

    <Text style={{ 
        fontFamily: 'outfit',
        color: "blacgrey",
        fontSize: 20,
        textAlign: 'center'
    }} >Dont go back </Text>    
    </View>
  )
}