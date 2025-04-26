import { View, Text , TouchableOpacity} from 'react-native'
import React, { useEffect, useContext }  from 'react'
import { useNavigation ,useRouter} from 'expo-router';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';
import Ionicons from '@expo/vector-icons/Ionicons';
import {CreateTripContext }from './../../constants/context/CreateTripContext';
import { useTheme } from './../../constants/context/ThemeContext';

export default function SearchPlace() {
      const { theme } = useTheme();
      const isDark = theme === 'dark';
        
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
      borderColor: isDark ? 'black' : 'white',
      height:'100%',
      backgroundColor: isDark ? '#121212' : '#FAFAFA'
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
                
                    <Ionicons name="arrow-back" size={28} color={isDark ? 'white' : 'black'} />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 20,
                    fontFamily: 'outfit-bold',
                    marginLeft: 20, 
                   color: isDark ? '#FFFFFF' : '#333'
                }}>
                    Search
                </Text>
            </View>

          <View style={{
            flexDirection:'row',
            borderWidth:1,
            borderRadius:10,
            marginTop:25,
            overflow: 'hidden',
            backgroundColor: isDark ? '#1e1e1e' : '#fff',
            borderColor: isDark ? '#555' : 'black',
            }}>
<Ionicons name="location-sharp"
 size={24} color={isDark ? 'white' : 'black'} 
 style={{paddingTop:10, paddingLeft:8}}/>
{/* <Text style={{fontSize:20,fontFamily:'outfit-bold',marginLeft:60,marginTop:-30,color:isDark?'#FFFFFF':'#333'}}>Search Place</Text> */}
    <GooglePlacesAutocomplete
      placeholder='Search Place Here...'
      enablePoweredByContainer={false}
      // 'details' is provided when fetchDetails = true
      fetchDetails={true}
      onPress={(data, details = null) => {
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
       /* textInputContainer:{
       borderWidth:1,
       borderRadius:5,
       marginTop:25,
       backgroundColor: isDark ? '#1e1e1e' : '#fff',
       borderColor: isDark ? '#555' : 'black',},  */
       
       textInput: {
        fontFamily: 'outfit-medium',
        fontSize: 16,
        backgroundColor: isDark ? '#1e1e1e' : 'white',
        color: isDark ? 'white' : 'black',},
       
        clearButton: {
          color: 'red', 
        },

       listView: {
       backgroundColor: isDark ? '#1e1e1e' : '#fff',},
        
       row: {
       backgroundColor: isDark ? '#1e1e1e' : '#fff',
       flexDirection: 'row',},

       description: {
       color: isDark ? 'lightgrey' : 'black',},

       poweredContainer: {
        backgroundColor: isDark ? '#1e1e1e' : '#fff',
        borderTopWidth: 0.2,
        borderColor: isDark ? 'grey' : 'black',
        alignItems: 'center',
        
      },
      poweredText: {
      color: isDark ? '#888' : '#666',
      
    },
      }}
      textInputProps={{
        placeholderTextColor: isDark ? 'white' : 'black', // ✅ Real fix
      }}
    />
     </View>
    </View>
  )
}
