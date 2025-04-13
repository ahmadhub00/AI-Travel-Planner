import { View, Text , TouchableOpacity} from 'react-native'
import React, { useEffect, useContext }  from 'react'
import { useNavigation ,useRouter} from 'expo-router';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';
import Ionicons from '@expo/vector-icons/Ionicons';
import {CreateTripContext }from './../../constants/context/CreateTripContext';

export default function SearchPlace() {

    const navigation=useNavigation(); 
    const router=useRouter();
    const {tripData,setTripData}=useContext(CreateTripContext)
    
    useEffect(()=>{
    navigation.setOptions
    ({ headerShown:false})
 },[])
     
 {/*useEffect(()=>{
  console.log(tripData);
 }),[tripData]
 */}
 
  return (
    <View style={{
      padding:25,
      paddingTop:75,
      backgroundColor:"white",
      height:'100%'
    }}>
        <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                position: "absolute",
                top: 40,
                left: 20,
                zIndex: 10,
            }}>
                <TouchableOpacity
                    onPress={() => router.push('mytrip')}
                    style={{ padding: 10 }}>
                
                    <Ionicons name="arrow-back" size={28} color="black" />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 20,
                    fontFamily: 'outfit-bold',
                    marginLeft: 50, 
                }}>
                    Search
                </Text>
            </View>

    <GooglePlacesAutocomplete
      placeholder='Search Place'
      fetchDetails={true}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        
        setTripData({
          locationInfo:{
            name:data.description,
            coordinates:details?.geometry.location,
            photoRef:details?.photos[0]?.photo_reference,
            url:details?.url
          }
        });
        router.push('/create-trip/select-traveler')
      }}
      query={{

        key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,     
        language: 'en',
      }}
      styles={{
       textInputContainer:{
       borderWidth:1,
       borderRadius:5,
       marginTop:25} }}

    /> 
    </View>
  )
}
