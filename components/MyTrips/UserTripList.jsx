import { View, Text,Image } from 'react-native'
import React from 'react'
import moment from 'moment'

export default function UserTripList({userTrips}) {
    const LatestTrip=JSON.parse(userTrips[0].tripData)

  return userTrips&&(
    <View>
      <View>
        <Image source={require('../../assets/images/login.jpeg')}
        style={{
            width:'100%',
            height:300,
            objectFit:'cover',
            borderRadius:15
        }}/>
        <View style={{marginTop:10}}>
            <Text style={{
                fontFamily:'outfit-medium',
                fontSize:'20'}}>
     {userTrips[0]?.tripPlan?.travelPlan?.location || "No Location Found"}  </Text>
        
        <Text style={{
                fontFamily:'outfit',
                fontSize:'17'}}>
     {moment(LatestTrip.startData).format('DD MMM yyyy')}</Text>
        </View>
      </View>
    </View>
  )
}