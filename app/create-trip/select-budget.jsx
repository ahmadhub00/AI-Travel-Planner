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
    <View>
      <Text>SelectBudget
    </Text>
    </View>
  )
}