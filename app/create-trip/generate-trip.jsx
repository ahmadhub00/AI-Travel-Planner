import { View, Text,Image } from 'react-native'
import React, { useEffect, useContext ,useState}  from 'react'
import { useNavigation ,useRouter} from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CreateTripContext } from '../../context/CreateTripContext';
import { AI_PROMPT } from '../../constants/Options';
import { chatSession } from '../../configs/AiModel';
import { set } from 'date-fns';
import { db ,auth} from '../../configs/FirebaseConfig';
import { doc, setDoc } from 'firebase/firestore';


export default function GenerateTrip () {
  const {tripData,setTripData} = useContext(CreateTripContext);  
    const[loading,setLoading]=useState(false);
    const router=useRouter();
    const user=auth.currentUser;

  useEffect(()=>{
    GenerateAiTrip()
  },[])

  const GenerateAiTrip=async()=>{
    //Using try catch for error handling
    try { 
    setLoading(true);
    console.warn('Generating Trip');
    //Sending our Data by replacing the placeholders in AI_PROMPT
         const FINAL_PROMPT=AI_PROMPT
         .replace('{location}',tripData?.locationInfo?.name)
         .replace('{totalDays}', tripData?.totalNoOfDays?.toString() )
         .replace('{totalNights}',(tripData?.totalNoOfDays - 1)?.toString() )
         .replace('{traveler}',tripData?.traveler?.title)
         .replace('{budget}',tripData?.budget)
        // .replace('{totalDays}',tripData?.totalNoOfDays)
        // .replace('{totalNights}',tripData?.totalNoOfDays-1);
       
         //Showing Genarated Final Prompt
        // console.warn(FINAL_PROMPT);
        //Sending Data to AI
         const result = await chatSession.sendMessage(FINAL_PROMPT);
         
         let tripResp = null;

         //Showing Response
         if (result.response) {
          const responseText = await result.response.text();
         //console.log(responseText);
          
         // Validate and Parse JSON
         try {
          tripResp = JSON.parse(responseText.trim());
      } catch (error) {
          console.error("JSON Parsing Error:", error.message);
          return; // Stop execution if JSON is invalid
      }
        } else {
          console.warn("No response received from AI.");
        } 

      // Saving Data in DataBase
      if (tripResp) {
      const docId= (Date.now()).toString();
      const result_=await setDoc(doc(db,"UserTrips",docId),{
        userEmail:user?.email,
        tripPlan:tripResp, // AI result
        //tripData:JSON.stringify(tripData),// user selection data
        tripData: JSON.stringify({ 
          ...tripData, 
          tripPlan: tripResp // Merge AI-generated tripPlan
      }), // Store merged tripData
        dpcId:docId
      });
       console.warn('Data Saved in Database');
        router.push('(tabs)/mytrip');
      } else {
        console.warn("Trip response is empty, skipping database save.");
      }

            //Catch
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