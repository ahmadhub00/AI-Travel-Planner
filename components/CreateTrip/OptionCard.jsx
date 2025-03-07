import { View, Text } from 'react-native'
import React from 'react'

export default function OptionCard({option}) {
  return (
    <View style={{
        padding:25,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroungColor:"grey",
        borderRadius:15
    }}>
        <View>
            <Text style={{
                fontSixe:20,
                fontFamily:'outfit-bold'
            }}>{options?.title}</Text>

            <Text style={{
                fontSixe:17,
                fontFamily:'outfit',
                color:"grey"
            }}>{option?.desc}</Text>
        </View>
        <Text style={{
                fontSixe:35
            }}>{option?.icon}</Text>
     
    </View>
  )
}