import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SelectTravelesList } from '../../constants/Options';
import OptionCard from '../../components/CreateTrip/OptionCard';

export default function SelectTraveler() {
  const navigation=useNavigation(); 
    useEffect (()=>{ 
    navigation.setOptions({
    headerShown:true, 
    headerTransparent:true, 
    headerTitle:''
    })
     },[])
  
  return (
    <View   style={{ 
      padding: 25, 
      paddingTop: 75, 
      backgroundColor:"white",
      height:'100%'  }}>

   <View   style={{ 
      marginTop:20  
      }}>

   <Text  style={{ 
      padding: 25, 
      paddingTop: 75, 
      backgroundColor:"white",
      height:'100%'  
      }}> Who's Traveling</Text>
 
     <FlatList
     data={SelectTravelList}
     renderItem={(item,index)=>(
      <View style={{
        marginVerticle:10
      }}>
        
    <OptionCard option={item}/>
      </View>
     )}  />

     </View>

       </View>
  )
}