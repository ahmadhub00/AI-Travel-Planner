import { View, Text, FlatList,TouchableOpacity } from 'react-native'
import React, { useEffect, useContext ,useState}  from 'react'
import { useNavigation ,useRouter} from 'expo-router';
import { SelectTravelesList } from '../../constants/Options';
import {CreateTripContext} from '../../context/CreateTripContext';
import OptionCard from '../../components/CreateTrip/OptionCard';
import Ionicons from '@expo/vector-icons/Ionicons';
export default function SelectTraveler() {
  const router = useRouter(); 

  const navigation=useNavigation(); 
  const [ selectedTraveler, setSelectedTraveler ] = useState(null);
  const {tripData,setTripData}=useContext(CreateTripContext

  )
  

    useEffect (()=>{ 
      navigation.setOptions({
        headerShown:false 
      })
     },[])
  
  return (
    <View   style={{ 
      padding: 25, 
      paddingTop: 75, 
      backgroundColor:"white",
      height:'100%'  }}>

    <TouchableOpacity
      onPress={() => router.push('/create-trip/search-place')}
      style={{ padding: 10 }}>
      <Ionicons name="arrow-back" size={28} color="black" />
    </TouchableOpacity>

    <Text  style={{ 
     fontSize: 35, 
      fontFamily: 'outfit-bold', 
      marginTop: 20, 
      }}> Who's Traveling</Text>
  
    <View  style={{ 
      marginTop: 20
       }}>
        <Text  style={{ 
       fontSize: 23, 
       fontFamily: 'outfit-bold'
       }}> Choose your traveles</Text>

    <FlatList
     data={SelectTravelesList}
     renderItem={({item,index})=>(
      <TouchableOpacity
      onPress={() => setSelectedTraveler(item.title)}
      style={{ marginVertical: 10 }}> 
     <OptionCard option={item} selectedTraveler={selectedTraveler}/>
     </TouchableOpacity> )}
     
       />

     </View>

       </View>
  )
}