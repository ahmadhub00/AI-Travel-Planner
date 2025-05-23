import { View, Text, FlatList,TouchableOpacity } from 'react-native'
import React, { useEffect, useContext ,useState}  from 'react'
import { useNavigation ,useRouter} from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import {CreateTripContext }from './../../constants/context/CreateTripContext';
import moment from 'moment';
import { useTheme } from '../../constants/context/ThemeContext';

export default function ReviewTrip() {
  const router = useRouter(); 
        const { theme } = useTheme();
        const isDark = theme === 'dark';
  const{tripData,setTripData}=useContext(CreateTripContext);
  const navigation=useNavigation();
  
      useEffect(() => {
            navigation.setOptions({
                headerShown: false,
            });
        }, []);
  return (
    <View style={{ 
        padding: 25, 
        paddingTop: 75, 
        backgroundColor: isDark ? '#121212' : '#FAFAFA',
        height:'100%'  }}>
     
    <TouchableOpacity
      onPress={() => router.push('/create-trip/select-budget')}
      style={{ padding: 10 }}>
      <Ionicons name="arrow-back" size={28} color= {isDark ? '#fff' : '#000' } />
    </TouchableOpacity>

   <Text style={{ 
     fontSize: 35, 
      fontFamily: 'outfit-bold', 
      marginTop: 20,
      color:isDark ? '#fff' : '#000'
      }}>ReviewTrip</Text> 

    <View style={{ 
      marginTop: 20
      }}>
    <Text style={{ 
      fontSize: 20, 
      fontFamily: 'outfit-bold',
      color:isDark ? 'lightgrey' : 'grey'
      }}>Before generating your trip,please review your selected trip</Text>
   
   {/*Destination Info*/ }
   <View style={{ 
      marginTop: 40,
      display:'flex',
      flexDirection:'row',
      gap:20
      }}>
   <Text style={{
         fontSize: 30
    }} >📍</Text>
   <View>
    <Text style={{
      fontSize: 20, 
      fontFamily: 'outfit-bold',
      color:isDark ? 'white' : 'grey'
    }}>Destination</Text>
    <Text style={{ 
      fontFamily: 'outfit-medium',
      fontSize: 20,
      width:'75%',
      color:isDark ? 'grey' : '#000'
    }}>{tripData?.locationInfo?.name}</Text>
    </View>
   </View>
   
   {/*Date Selected Info*/ }
   <View style={{ 
      marginTop: 25,
      display:'flex',
      flexDirection:'row',
      gap:20
      }}>
   <Text style={{
         fontSize: 30
    }}> 📅</Text>
   <View>
    <Text style={{
         fontSize: 20, 
      fontFamily: 'outfit-bold',
       color:isDark ? 'white' : 'grey'
    }}>TravelDate</Text>
    <Text style={{ 
      fontFamily: 'outfit-medium',
      fontSize: 20,
      color:isDark ? 'grey' : '#000'
    }}>{moment(tripData?.startDate).format('DD MMM')+" "}
      To {" "}  
      {moment(tripData?.endDate).format('DD MMM')+" "}
      ({tripData?.totalNoOfDays} Days)
      </Text>
    
    </View>
   </View>

{/*Traveler Info*/ }
<View style={{ 
      marginTop: 25,
      display:'flex',
      flexDirection:'row',
      gap:20
      }}>
   <Text style={{
         fontSize: 30
    }}>  🧳</Text>
   <View>
    <Text style={{
       fontSize: 20, 
       fontFamily: 'outfit-bold',
       color:isDark ? 'white' : 'grey'
    }}>Who's Traveling</Text>
    <Text style={{ 
      fontFamily: 'outfit-medium',
      fontSize: 20,
      color:isDark ? 'grey' : '#000'
    }}>{tripData?.traveler?.title}
      </Text>
    
    </View>
   </View>

{/*Budget Info*/ }
<View style={{ 
      marginTop: 25,
      display:'flex',
      flexDirection:'row',
      gap:20
      }}>
   <Text style={{
         fontSize: 30
    }}>  💰</Text>
   <View>
    <Text style={{
         fontSize: 20, 
      fontFamily: 'outfit-bold',
       color:isDark ? 'white' : 'grey'
    }}>Budget</Text>
    <Text style={{ 
      fontFamily: 'outfit-medium',
      fontSize: 20,
      color:isDark ? 'grey' : '#000'
    }}>{tripData?.budget}
      </Text>
    
    </View>
   </View>
   

   </View>
   <TouchableOpacity 
  onPress={() => router.push('/create-trip/alternative-trips')} // Changed from 'generate-trip' to 'alternative-trips'
  style={{
    padding:15,
    backgroundColor: isDark ? '#1e1e1e' : '#000',
    borderRadius:15,
    marginTop:40,
    borderWidth:1,
    borderColor: isDark ? 'grey' : '#000',
  }}>
  <Text style={{
    color:"white",
    textAlign:"center",
    fontSize:20,
    fontFamily:'outfit-medium'
  }}>Build My Trip</Text>
</TouchableOpacity>
         
    </View>
   
  ) 
}