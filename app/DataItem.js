import { View, Text } from 'react-native'
import React from 'react'

export default function DataItem({place}) {
  return (
    <View>
      {place?.photos ? 
        <Image  source={{
                        uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='
                        + place?.photos[0]?.photo_reference  
                        +'&key='+process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}}
                        style={{
                               width:220,
                               height:120,
                               borderRadius:15
                           }}/>
        : 
        }
    </View>
  )
}