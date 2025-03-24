import { View, Text, Image } from 'react-native'
import React from 'react'
import moment from 'moment'

export default function UserTripCard({trip}) {
   /*  const formatData=(data)=>{
     return JSON.parse(data);
    } */
    const formatData = (data) => {
        if (!data) return {}; // Return an empty object to prevent crashes
        return typeof data === 'string' ? JSON.parse(data) : data;
    };
  return (
    <View style={{
        marginTop:20,
        display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center'
        }}>
      {/* <Image source={require('../../assets/images/login.jpeg')}
           style={{ 
        width:100,
        height:100,
        borderRadius:15}}/> */}
       < Image source={{uri:'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='
                    +formatData(trip.tripdata).locationInfo?.photoRef
                    +'&key='+process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}}
                    style={{
                        width:100,
                        height:100,
                        borderRadius:15 }}/>
        <View>
            <Text style={{
                fontFamily:'outfit-medium',
                fonstSize:18}}> 
            {trip.tripPlan?.tripDetails.location}</Text>
            <Text style={{
                fontFamily:'outfit',
                fontSize:14,
                color:'grey'}}>
            {moment(formatData(trip.tripData).startDate).format('DD MMM yyyy')}</Text>
            <Text style={{
                fontFamily:'outfit',
                fontSize:14,
                color:'grey'}}>
            Traveling:  {formatData(trip.tripData).traveler.title}</Text>
            
        </View>
    </View>
  )
}