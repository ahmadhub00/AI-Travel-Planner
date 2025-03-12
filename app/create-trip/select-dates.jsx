import { View, Text,TouchableOpacity } from 'react-native'
import React , { useEffect, useContext ,useState}from 'react'
import { Link, useNavigation ,useRouter} from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import CalendarPicker from 'react-native-calendar-picker';
export default function SelectDates() {
  
    const router = useRouter(); 
  const navigation=useNavigation(); 
const [ startDate, setStartDate ] = useState();
const [ endDate, setEndDate ] = useState();

  useEffect (()=>{ 
        navigation.setOptions({
          headerShown:false 
        })
       },[])
       
       const onDateChange = (date, type) => {
        console.log(type)
        console.log(date)}
       const OnDateSectionContinue = () => {
      
    }

    return (
    <View style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: "white",
        height: '100%'
    }}>
        <TouchableOpacity
      onPress={() => router.push('/create-trip/select-traveler')}
      style={{ padding: 10 }}>
      <Ionicons name="arrow-back" size={28} color="black" />
    </TouchableOpacity>

      <Text style={{
        fontSize: 35, 
        fontFamily: 'outfit-bold', 
        marginTop: 20,
      }}>Travel Dates</Text>
      <View style={{
        marginTop: 30
      }}>
        {/*<Text style={{
          fontSize: 23, 
          fontFamily: 'outfit-bold'
        }}>Choose your travel dates</Text>*/}
      <CalendarPicker onDateChange={onDateChange}
      allowRangeSelection={true} 
      minDate={new Date()}
      maxRangeDuration={5}
      selectedRangeStyle={{
        backgroundColor:"black"}}
        selectedDayTextStyle={{
            color:"white"}}/>     
    </View>
    <TouchableOpacity
      style={{ padding: 15,
      backgroundColor:"black",
      borderRadius:15,
      marginTop:35}}>

     <Text style={{
        fontFamily:'outfit-medium',
        color:"white",
        textAlign:'center',
        fontSize:20}}>
        Contine</Text>
      </TouchableOpacity>
    </View>
  )
}