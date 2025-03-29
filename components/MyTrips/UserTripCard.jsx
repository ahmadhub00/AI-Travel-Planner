/* import { View, Text, Image } from 'react-native'
import React from 'react'
import moment from 'moment'

export default function UserTripCard({trip}) {
     const formatData=(data)=>{
     return JSON.parse(data);
    } ;
     //const formatData = (data) => {
      //  if (!data) return {}; // Return an empty object to prevent crashes
       // return typeof data === 'string' ? JSON.parse(data) : data;
      //    };
    
    const formattedTrip = formatData(trip.tripData); 
    const photoRef = formattedTrip.locationInfo?.photoRef;
    const googleApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY;

    return (
    <View style={{
        marginTop:20,
        display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center'
        }}>
             <Image source={{ uri:
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${encodeURIComponent(photoRef)}&key=${googleApiKey}`
                     }}
           style={{
             width:100,
             height:100,
            borderRadius:15 }}
            onError={(e) => console.log("Image Load Error:", e.nativeEvent)}
            /> 
           
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
} */import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import moment from 'moment';

export default function UserTripCard({ trip, onSelectTrip }) {
    const formattedTrip = JSON.parse(trip.tripData);
    const photoRef = formattedTrip.locationInfo?.photoRef;
    const googleApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY;

    return (
        <TouchableOpacity onPress={onSelectTrip} activeOpacity={0.7}>
            <View style={{
                marginTop: 20,
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center'
            }}>
                <Image
                    source={{
                        uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${encodeURIComponent(photoRef)}&key=${googleApiKey}`
                    }}
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 15
                    }}
                    onError={(e) => console.log("Image Load Error:", e.nativeEvent)}
                />

                <View>
                    <Text style={{
                        fontFamily: 'outfit-medium',
                        fontSize: 18
                    }}>
                        {trip.tripPlan?.tripDetails?.location}
                    </Text>
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 14,
                        color: 'grey'
                    }}>
                        {moment(formattedTrip.startDate).format('DD MMM yyyy')}
                    </Text>
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 14,
                        color: 'grey'
                    }}>
                        Traveling: {formattedTrip.traveler?.title}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
