import { View, Text, FlatList, TouchableOpacity, Platform, Alert, ToastAndroid } from 'react-native'
import React ,{ useEffect,useState, useContext} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { useRouter, useNavigation } from 'expo-router';
import { SelectBudgetOptions } from '../../constants/Options';
import {CreateTripContext }from './../../constants/context/CreateTripContext';
import { useTheme } from '../../constants/context/ThemeContext';


export default function SelectBudget() {
    const router = useRouter();
          const { theme } = useTheme();
          const isDark = theme === 'dark';
    
    const navigation=useNavigation();
    const [selectedOption, setSelectedOption] = useState(null);
    const {tripData,setTripData}=useContext(CreateTripContext);

useEffect (()=>{
        navigation.setOptions({
          headerShown:false 
        })
       },[])

        useEffect (()=>{ 
          selectedOption&&setTripData({ 
            ...tripData,
             budget: selectedOption?.title });
            },[selectedOption])

         const onClickContinue = () => {
               if (!selectedOption) {
                   const message = 'Select your Budget';
                   if (Platform.OS === 'android') {
                       ToastAndroid.show(message, ToastAndroid.LONG);
                     } else { Alert.alert( message); }
                   return; }
                   
                   router.push('/create-trip/review-trip');

               };

  return (
    <View style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: isDark ? '#121212' : '#FAFAFA',
        height:'100%'}}>

      <TouchableOpacity onPress={() => router.push('/create-trip/select-dates')} 
       style={{ padding: 10 }}>
        <Ionicons name="arrow-back" size={28} color= {isDark ? '#fff' : '#000' }/>
        </TouchableOpacity>        
      
      <Text
      style={{
        fontSize: 35, 
        fontFamily: 'outfit-bold', 
        marginTop: 20, 
        color:isDark ? '#fff' : '#000'
      }}>Budget</Text>

      <View style={{
           marginTop:12,
        }}>
        <Text style={{
            fontSize: 20, 
            fontFamily: 'outfit-bold',
            color:'grey',
            marginBottom:15
        }}> Choose sepending habits for your trip </Text>
      
      <FlatList
           data={SelectBudgetOptions}
           renderItem={({item,index})=>(
            <TouchableOpacity
            onPress={() => setSelectedOption(item)}
            style={{ marginVertical: 10 }}> 
           <OptionCard option={item} selectedOption={selectedOption}/>
           </TouchableOpacity> )}/>
    </View>

    <TouchableOpacity 
         onPress={ onClickContinue}
         style={{
          padding:15,
          backgroundColor: isDark ? '#1e1e1e' : '#000',
          borderWidth:1,
          borderRadius:15,
          marginTop:20,
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