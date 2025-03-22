import { View, Text,Image } from 'react-native'
import React, { useEffect, useContext ,useState}  from 'react'
import { useNavigation ,useRouter} from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CreateTripContext } from '../../context/CreateTripContext';
import { AI_PROMPT } from '../../constants/Options';
import { chatSession } from '../../configs/AiModel';
import { set } from 'date-fns';


export default function GenerateTrip () {
  const {tripData,setTripData} = useContext(CreateTripContext);  
    const[loading,setLoading]=useState(false);
  useEffect(()=>{
    tripData&&GenerateAiTrip()
  },[tripData])

  const GenerateAiTrip=async()=>{
    try { 
    setLoading(true);
    console.warn('Generating Trip');
         const FINAL_PROMPT=AI_PROMPT
         .replace('{location}',tripData?.locationInfo?.name)
         .replace('{totalDays}',tripData.totalNoOfDays)
         .replace('{totalNights}',tripData.totalNoOfDays-1)
         .replace('{traveler}',tripData.traveler?.title)
         .replace('{budget}',tripData.budget)
         .replace('{totalDays}',tripData.totalNoOfDays)
         .replace('{totalNights}',tripData.totalNoOfDays-1);
       
         console.warn(FINAL_PROMPT);

         const result = await chatSession.sendMessage(FINAL_PROMPT);
         //console.log(result.response.text());
         if (result.response) {
          const responseText = await result.response.text();
          console.log(responseText);
        } else {
          console.warn("No response received from AI.");
        }
      } catch (error) {
        console.error("Error generating AI trip:", error);
      } finally {
        setLoading(false);
      }
    };

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