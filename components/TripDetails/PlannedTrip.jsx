import { View, Text } from 'react-native'
import React from 'react'

export default function PlannerTrip({details}) {
  return (
    <View style={{
        marginTop:20
    }}>
      <Text style={{
        fontSize:20,
        fontFamily:'outfit-bold'
      }}>⛺PlannerTrip</Text>

      {Object.entries(details).map(([day,dayDetails])=>(
        <View key={day}>
            <Text>{day.charAt(0).toUpperCase()+day.slice(1)}</Text>
        </View>
      ))}
      
    </View>
  )
}