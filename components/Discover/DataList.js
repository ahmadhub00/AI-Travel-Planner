import { View, Text } from 'react-native'
import React, { useState } from 'react';
import { FlatList } from 'react-native'
import DataItem from './DataItem'
import PlaceDetailModal from './PlaceDetailModal';
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from 'react-native';

export default function DataList({placeList}) {
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handlePlacePress = (place) => {
        setSelectedPlace(place);
        setModalVisible(true);
      };
    
      const closeModal = () => {
        setModalVisible(false);
      };
      
  return (
    <View>
         {/*  <LinearGradient
  colors={[ 'transparent','rgba(0, 0, 0, 0.7)']} 
  style={{
    padding: 20,
    width: Dimensions.get('screen').width ,
     height:200, 
    bottom: 0,
    position: 'absolute',
    }}
/> */}
      <FlatList
      data={placeList}
      horizontal={true}
      renderItem={({item})=>(
          <DataItem place={item}
          onPress={() => handlePlacePress(item)}/>
      )}
      />
      
      {selectedPlace && (
        <PlaceDetailModal 
          place={selectedPlace}
          visible={modalVisible}
          onClose={closeModal}
        />
      )}
    </View>
  )
}