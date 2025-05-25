import React, { useEffect, useState } from 'react';
import { View,Text, Image, TouchableOpacity, Linking } from 'react-native';
import { GetPhotoRef } from '../../Services/GooglePlaceApi';

export default function HotelCard ({item, onPress}){
    const [photoRef,setPhotoRef]=useState(null)
    useEffect(()=>{
        getGooglePhotoRef();
    },[item.hotelName])

    const getGooglePhotoRef = async () => {
        try {
          const result = await GetPhotoRef(item.hotelName);
       //   console.log(result?.results[0]?.photos[0]?.photo_reference);
      const photo=result?.results[0]?.photos[0]?.photo_reference
       setPhotoRef(photo);

            // Check if results exist
            if (!result || !result.results || result.results.length === 0) {
              console.warn("No places found for this location.");
              return;
            }
    
        } catch (error) {
          console.error("Error fetching Google Photo Reference:", error);
        }
      };
      
    return (
      <TouchableOpacity onPress={onPress}>
            <View style={{
                   marginRight:20,
                   Width:180
                  }}>
            {photoRef ? (
              <Image  source={{
                uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='
                + photoRef
                +'&key='+process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}}
                style={{
                       width:220,
                       height:120,
                       borderRadius:15
                   }}/>
                  ) : (
                    <View style={{
                      width: 220,
                      height: 120,
                      borderRadius: 15,
                      backgroundColor: 'lightgrey',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <Text style={{ color: '#555', fontFamily: 'outfit-medium' }}>No image available</Text>
                    </View>
                  )}
       
    <View style={{padding:5}}>
            <Text style={{
                   fontFamily:'outfit',
                   fontSize:17,
                   width: 200}}>
                 {item?.hotelName}</Text>

            <View style={{
                 display:'flex',
                 flexDirection:'column'
                }}>

                 <Text style={{
                  fontFamily:'outfit'
                 }}>
                 ⭐{item.rating}</Text>

                 <Text style={{
                  fontFamily:'outfit',
                  width: 215,
                  /* marginLeft: 15 */}}
                  numberOfLines={2} ellipsizeMode="tail">
                 💰{item.price ? item.price : item.pricePerNight}
                 </Text>
                 </View>
               
        {item?.bookingURL.startsWith('http') && (
           <TouchableOpacity
               style={{ backgroundColor: 'black', padding: 7, width: 110, borderRadius: 7, marginTop: 5 }}
               onPress={() => Linking.openURL(item?.bookingURL)}>
             {/* onPress={() => {
                       const urls = item.bookingURL.split(",").map(url => url.trim()); // Split and trim spaces
                       if (urls.length > 0) {
                       Linking.openURL(`https://${urls[0]}`); }}}>  */}
            <Text style={{ textAlign: 'center', color: 'white', fontFamily: 'outfit' }}>
            Book Here </Text>
            </TouchableOpacity>)}

                </View>
               </View>
               </TouchableOpacity>
    );
};




