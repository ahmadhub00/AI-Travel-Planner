import { View, Text, ScrollView , TouchableOpacity, SafeAreaView} from 'react-native'
import React, { useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import StartNewTripCard from '../../components/MyTrips/StartnewTripCard';
import { db ,auth} from '../../configs/FirebaseConfig';
import { getDocs, query, collection, where, orderBy} from 'firebase/firestore';
import { ActivityIndicator } from 'react-native';
import UserTripList from '../../components/MyTrips/UserTripList';
import { useRouter, useNavigation } from 'expo-router';
import { useTheme } from '../../constants/context/ThemeContext'; 
import { deleteDoc, doc } from 'firebase/firestore';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MyTrip() {
    const [userTrips,setUserTrips]=useState([]);
    const user=auth.currentUser;
    const [loading,setLoading]=useState(false)
    const router = useRouter();
    
    const { theme } = useTheme();
    const isDark = theme === 'dark';
     const insets = useSafeAreaInsets();

    useEffect(()=>{
      user&&GetMyTrip(); //The condition user && GetMyTrip(); ensures that GetMyTrip() only runs if user is truthy.  
    },[user]);

    //function to get data from DB
      const GetMyTrip = async () => {
        setLoading(true);
        
        try {
          const q = query(collection(db, "UserTrips"),
           where("userEmail", "==", user?.email),
           orderBy("createdAt", "desc") );
          const querySnapshot = await getDocs(q);
          
          const trips = querySnapshot.docs.map(doc => ({
            id: doc.id,...doc.data()})); // Ensures a fresh list without duplicates
          
          setUserTrips(trips); // Set the new list directly instead of appending
        } catch (error) {
          console.error("Error fetching trips:", error);
        } finally {
          setLoading(false);
        }
      };
      
      // Function to delete a trip
const handleDeleteTrip = async (tripId) => {
  try {
    await deleteDoc(doc(db, 'UserTrips', tripId));
    setUserTrips(prev => prev.filter(trip => trip.id !== tripId));
  } catch (error) {
    console.error("Error deleting trip:", error);
  }
};
  return (
    <SafeAreaView style={{  flex: 1, backgroundColor: isDark ? "#121212" : "#ffffff" }}>
    <ScrollView style={{
        padding:25,
        paddingTop:20,
         paddingBottom: insets.bottom + 30,
        backgroundColor: isDark ? '#121212' : 'white',
        
        /* height:'100%' */
    }}>

      <View style={{
        display:'flex',
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'space-between'
      }}>
        <Text style={{
        fontFamily:'outfit-bold',
        fontSize:35,
        color: isDark ? '#fff' : '#000',
      }}>MyTrip</Text>

    <View style={{ flexDirection: 'row', gap: 8}}>
      
      {/* Currency Exchange Icon */}
    <TouchableOpacity onPress={() => router.push('../Homepage//Currencyexchange')} style={{ padding: 10 }}>
       <Ionicons name="cash-outline" // or use "swap-horizontal-outline"
        size={24} color={isDark ? 'white' : 'black'}/>
    </TouchableOpacity>

    {/* Expense Traker Icon */}
    <TouchableOpacity onPress={() => router.push('../Homepage/Calculator')} style={{ padding: 10 }}>
      <Ionicons name="calculator-outline" size={24} color={isDark ? 'white' : 'black'} />
    </TouchableOpacity>

    {/* Add Trip Icon */}
    <TouchableOpacity onPress={() => router.push('/create-trip/search-place')} style={{ padding: 10 }}>
      <Ionicons name="add" size={24} color={isDark ? 'white' : 'black'} />
    </TouchableOpacity>
    </View>
      
    </View> 
    {/* Show loading indicator when 'loading' is true */}
    {loading&&<ActivityIndicator size={'large'} color={isDark ? 'white' : 'black'} style={{ marginTop: 20 }}/>}

    {/* Show 'StartNewTripCard' if userTrips is empty */}
    {userTrips?.length==0?
    <StartNewTripCard/>
    :
    //userTrips={userTrips} passing data to usertriplist
    <UserTripList userTrips={userTrips} onDeleteTrip={handleDeleteTrip}/>
     }
   </ScrollView>
    </SafeAreaView>
  )
}