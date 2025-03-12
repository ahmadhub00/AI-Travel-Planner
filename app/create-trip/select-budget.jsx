import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React ,{ useEffect,useState} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { useRouter, useNavigation } from 'expo-router';
import { SelectBudgetOptions } from '../../constants/Options';


export default function SelectBudget() {
    const router = useRouter();
    const navigation=useNavigation();
const [selectedOption, setSelectedOption] = useState(null);
    useEffect (()=>{
        navigation.setOptions({
          headerShown:false 
        })
       },[])

  return (
    <View style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor:"white",
        height:'100%'}}>

      <TouchableOpacity onPress={() => router.push('/create-trip/select-dates')} 
       style={{ padding: 10 }}>
        <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>        
      
      <Text
      style={{
        fontSize: 35, 
        fontFamily: 'outfit-bold', 
        marginTop: 20, 
      }}>Budget</Text>

      <View style={{
           marginTop:20
        }}>
        <Text style={{
            fontSize: 20, 
            fontFamily: 'outfit-bold'
        }}> Choose sepending habits for your trip </Text>
      
      <FlatList
           data={SelectBudgetOptions}
           renderItem={({item,index})=>(
            <TouchableOpacity
            onPress={() => setSelectedOption(item)}
            style={{ marginVertical: 10 }}> 
           <OptionCard option={item} selectedOption={selectedOption}/>
           </TouchableOpacity> )}
           
             />
    </View>
    </View>
  )
}