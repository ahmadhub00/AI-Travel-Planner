import { View, Text } from 'react-native'
import React from 'react'
import { use } from 'react';

export default function SelectBudget() {
    const navigation=useNavigation();

    useEffect (()=>{
        navigation.setOptions({
          headerShown:false 
        })
       },[])

  return (
    <View style={{
        padding: 25,
        paddingTop: 75}}>
      
      <Text
      style={{
        fontSize: 35, 
        fontFamily: 'outfit-bold', 
        marginTop: 20, 
      }}>Budget</Text>
    </View>
  )
}