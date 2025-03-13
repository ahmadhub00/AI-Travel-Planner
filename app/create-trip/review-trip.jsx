import { View, Text, FlatList,TouchableOpacity } from 'react-native'
import React, { useEffect, useContext ,useState}  from 'react'
import { useNavigation ,useRouter} from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function ReviewTrip() {
  const router = useRouter(); 

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
        backgroundColor:"white",
        height:'100%'  }}>
     
    <TouchableOpacity
      onPress={() => router.push('/create-trip/select-budget')}
      style={{ padding: 10 }}>
      <Ionicons name="arrow-back" size={28} color="black" />
    </TouchableOpacity>
    
   <Text style={{ 
     fontSize: 35, 
      fontFamily: 'outfit-bold', 
      marginTop: 20
      }}>ReviewTrip</Text> 
    </View>
  )
}