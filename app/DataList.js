import { View, Text } from 'react-native'
import React, { useState } from 'react';
import { FlatList } from 'react-native'
import DataItem from './DataItem'
import PlaceDetailModal from './PlaceDetailModal';

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