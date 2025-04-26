import { View, Text } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'
import DataItem from './DataItem'

export default function DataList({placeList}) {
  return (
    <View>
      <FlatList
      data={placeList}
      horizontal={true}
      renderItem={({item})=>(
          <DataItem place={item}/>
      )}
      />
    </View>
  )
}