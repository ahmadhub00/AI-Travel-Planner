import { View, Text, FlatList,TouchableOpacity } from 'react-native'
import React, { useEffect, useContext ,useState}  from 'react'
import { Link, useNavigation ,useRouter} from 'expo-router';
import { SelectTravelesList } from '../../constants/Options';
import {CreateTripContext }from './../../constants/context/CreateTripContext';
import OptionCard from '../../components/CreateTrip/OptionCard';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../../constants/context/ThemeContext';

export default function SelectTraveler() {
  const router = useRouter(); 
      const { theme } = useTheme();
      const isDark = theme === 'dark';

  const navigation=useNavigation(); 
  const [ selectedTraveler, setSelectedTraveler ] = useState(null);
  const {tripData,setTripData}=useContext(CreateTripContext);
  
  

    useEffect (()=>{ 
      navigation.setOptions({
        headerShown:false 
      })
     },[])

     useEffect (()=>{ 
      setTripData({...tripData,traveler:selectedTraveler})
     },[selectedTraveler])
    
  return (
    <View   style={{ 
      padding: 25, 
      paddingTop: 75, 
      backgroundColor: isDark ? '#121212' : '#FAFAFA',
      height:'100%'  }}>

    <TouchableOpacity
      onPress={() => router.push('/create-trip/search-place')}
      style={{ padding: 10 }}>
      <Ionicons name="arrow-back" size={28} color= {isDark ? '#fff' : '#000' }/>
    </TouchableOpacity>

    <Text  style={{ 
      fontSize: 35, 
      fontFamily: 'outfit-bold', 
      marginTop: 20,
      color:isDark ? '#fff' : '#000'
      }}> Who's Traveling</Text>
  
    <View  style={{ 
      marginTop: 20
       }}>
      <Text  style={{ 
       fontSize: 23, 
       fontFamily: 'outfit-bold',
       color:isDark ? '#fff' : '#000'
       }}> Choose your traveles</Text>

    <FlatList
     data={SelectTravelesList}
     renderItem={({item,index})=>(
      <TouchableOpacity
      onPress={() => setSelectedTraveler(item)}
      style={{ marginVertical: 10 }}> 
     <OptionCard option={item} selectedOption={selectedTraveler} />
     </TouchableOpacity> )}/>
     
     </View>

     <TouchableOpacity 
     onPress={() => router.push('/create-trip/select-dates')}
     style={{
      padding:15,
      backgroundColor: isDark ? '#1e1e1e' : '#000',
      borderRadius:15,
      marginTop:20,
      borderWidth:1,
      borderColor: isDark ? 'grey' : '#000',
     }}>
      <Text style={{
        color:"white",
        textAlign:"center",
        fontSize:20,
        fontFamily:'outfit-medium'
      }}>Continue</Text>
     </TouchableOpacity>
      
       </View>
  )
}