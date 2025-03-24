import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import moment from 'moment'
import UserTripCard from './UserTripCard'

export default function UserTripList({userTrips}) {
    const LatestTrip=JSON.parse(userTrips[0].tripData)
   
  return userTrips&&(
    <View>
      <View style={{marginTop:20}}>
        <Image source={require('../../assets/images/login.jpeg')}
        style={{
            width:'100%',
            height:240,
            objectFit:'cover',
            borderRadius:15 }}/>

        <View style={{marginTop:10}}>
             {/*Showing Location*/}
         <Text style={{
                fontFamily:'outfit-medium',
                fontSize:20}}>
             {userTrips[0]?.tripPlan?.tripDetails.location || "No Location Found"}  </Text>
        
        <View style={{
                flexDirection:'row',
                justifyContent:'space-between',
               marginTop:5}}>
             {/*Showing date of travel*/}
        <Text style={{
                fontFamily:'outfit',
                fontSize:17}}>
             {moment(LatestTrip.startDate).format('DD MMM yyyy')}</Text>
             {/*Showing traveler title*/}
        <Text style={{
                fontFamily:'outfit',
                fontSize:17,
                color:'grey'}}>
            🚌 {LatestTrip?.traveler?.title || "Unknown Traveler"}</Text>
         </View>
         <TouchableOpacity style={{
                borderRadius:15,
                marginTop:10,
                backgroundColor:'black',
                padding:15}}>
         <Text style={{
                fontFamily:'outfit-medium',
                fontSize:15,
                textAlign:'center',
                color:'white'}}>
                    See your plan
                </Text></TouchableOpacity>
        </View>

{/*This code iterates over an array called userTrips and creates a list of UserTripCard components, passing each trip's data as a prop.*/}
        {userTrips.map((trip,index)=>(
            <UserTripCard trip={trip} key={index}/>
        ))}
        </View>
      </View>
    
  )
}