import { View, Text, Image } from 'react-native'
import React from 'react'
import moment from 'moment'

export default function UserTripCard({trip}) {
    const formatData=(data)=>{
     return JSON.parse(data);
    }
  return (
    <View style={{
        marginTop:15,
        display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center'
        }}>
      <Image source={require('../../assets/images/login.jpeg')}
      style={{ 
        width:100,
        height:100}}/>
        <View>
            <Text style={{
                fontFamily:'outfit-medium',
                fonstSize:18}}> 
            {trip.tripPlan?.tripDetails.location}</Text>
            <Text style={{

            }}>
            {moment(formatData(trip.tripData).startDate).format('DD MMM yyyy')}</Text>
            <Text>{formatData(trip.tripData).traveler.title}</Text>
            
        </View>
    </View>
  )
}