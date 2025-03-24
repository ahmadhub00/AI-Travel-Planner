import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import StartNewTripCard from '../../components/MyTrips/StartnewTripCard';
import { db ,auth} from '../../configs/FirebaseConfig';
import { query } from 'firebase/firestore';
import { getDocs, collection, where } from 'firebase/firestore';
import { ActivityIndicator } from 'react-native';
import UserTripList from '../../components/MyTrips/UserTripList';

export default function MyTrip() {
    const [userTrips,setUserTrips]=useState([]);
    const user=auth.currentUser;
    const [loading,setLoading]=useState(false)
    
    useEffect(()=>{
      user&&GetMyTrip(); //The condition user && GetMyTrip(); ensures that GetMyTrip() only runs if user is truthy.  
    },[user]);

    //function to get data from DB
    const GetMyTrip=async()=>{
      setLoading(true);
      setUserTrips([]);
        const q=query(collection(db,'UserTrips'),where('userEmail','==',user?.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            //setUserTrips([...userTrips,doc.data()]);
            console.log(doc.id, " => ", doc.data());
            setUserTrips(prev=>[...prev,doc.data()])
        });
      setLoading(false);
     }

  return (
    <ScrollView style={{
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
    {/* Show loading indicator when 'loading' is true */}
    {loading&&<ActivityIndicator size={'large'} color="black"/>}

    {/* Show 'StartNewTripCard' if userTrips is empty */}
    {userTrips?.length==0?
    <StartNewTripCard/>
    :
    //userTrips={userTrips} passing data to usertriplist
    <UserTripList userTrips={userTrips}/>
     }
   </ScrollView>
  )
}