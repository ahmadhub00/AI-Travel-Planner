
  import { View, Text, Image, TouchableOpacity } from 'react-native'
  import React, { useEffect, useContext, useState } from 'react'
  import { useNavigation, useRouter } from 'expo-router';
  import Ionicons from '@expo/vector-icons/Ionicons';
  import { CreateTripContext } from './../../constants/context/CreateTripContext';
  import { AI_PROMPT } from '../../constants/Options';
  import { chatSession } from '../../configs/AiModel';
  import { set } from 'date-fns';
  import { db, auth } from '../../configs/FirebaseConfig';
  import { doc, setDoc } from 'firebase/firestore';
  import { useTheme } from '../../constants/context/ThemeContext';
  
  export default function GenerateTrip() {
    const { tripData, setTripData } = useContext(CreateTripContext);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const user = auth.currentUser;
    const { theme } = useTheme();
    const isDark = theme === 'dark';
  
    useEffect(() => {
      GenerateAiTrip()
    }, [])
  
    const GenerateAiTrip = async () => {
      //Using try catch for error handling
      try {
        setLoading(true);
        console.warn('Generating Trip');
        
        // Check if this is an alternative trip selected by the user
        const isAlternative = tripData?.alternativeSelected;
        
        //Sending our Data by replacing the placeholders in AI_PROMPT
        const FINAL_PROMPT = AI_PROMPT
          .replace('{location}', tripData?.locationInfo?.name)
          .replace('{totalDays}', tripData?.totalNoOfDays?.toString())
          .replace('{totalNights}', (tripData?.totalNoOfDays - 1)?.toString())
          .replace('{traveler}', tripData?.traveler?.title)
          .replace('{budget}', tripData?.budget)
  
        //Sending Data to AI
        const result = await chatSession.sendMessage(FINAL_PROMPT);
  
        let tripResp = null;
  
        //Showing Response
        if (result.response) {
          const responseText = await result.response.text();
  
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
          const docId = (Date.now()).toString();
          const createdAt = new Date();
          // Include information about whether this was an alternative trip
          const tripDataToSave = {
            ...tripData,
            tripPlan: tripResp,
            isAlternativeTrip: isAlternative || false,
            originalDestination: isAlternative ? tripData.originalDestination : null
          };
          
          const result_ = await setDoc(doc(db, "UserTrips", docId), {
            userEmail: user?.email,
            tripPlan: tripResp, // AI result
            tripData: JSON.stringify(tripDataToSave), // Store merged tripData with flag
            docId: docId,
            createdAt: createdAt
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
        padding: 25,
        paddingTop: 75,
        backgroundColor: isDark ? '#121212' : '#FAFAFA',
        height: '100%'
      }}>
        <TouchableOpacity
                onPress={() => router.push('/create-trip/alternative-trips')}
                style={{ padding: 10 }}>
                <Ionicons name="arrow-back" size={28} color={isDark ? '#fff' : '#000'} />
              </TouchableOpacity>
        <Text style={{
          fontSize: 35,
          fontFamily: 'outfit-bold',
          textAlign: 'center',
          color: isDark ? '#fff' : '#000'
        }}> Please wait </Text>
        
        <Text style={{
          fontSize: 20,
          fontFamily: 'outfit-medium',
          textAlign: 'center',
          marginTop: 20,
          color: isDark ? 'lightgrey' : 'grey'
        }}>
          {tripData?.alternativeSelected 
            ? `We are generating your alternative trip to ${tripData?.locationInfo?.name}` 
            : "We are working to generate your trip"}
        </Text>
  
        <Image source={require('../../assets/images/plane1.gif')}
          style={{
            width: '100%',
            height: 400,
            objectFit: 'contain'
          }} />
          
        <Text style={{
          fontFamily: 'outfit',
          color: isDark ? "lightgrey" : "grey",
          fontSize: 20,
          textAlign: 'center'
        }}>Don't go back</Text>
      </View>
    )
  }