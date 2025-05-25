import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import HotelCard from './HotelCard';
import HotelDetailModal from './HotelDetailModal';

export default function HotelList({hotelList}) {
  const [selectedPlace, setSelectedPlace] = useState(null);
      const [modalVisible, setModalVisible] = useState(false);
  
      const handlePlacePress = (item) => {
          setSelectedPlace(item);
          setModalVisible(true);
        };
      
        const closeModal = () => {
          setModalVisible(false);
        };
  return (
    <View style={{
        marginTop:20,
        borderWidth:1,
        borderRadius:16,
        borderColor:'lightgrey',
        padding:10,
        backgroundColor: '#fafafa' 
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20
      }}>🏨 Hotels Recommended</Text>

      <FlatList
      style={{
        marginTop:10
      }}
      data={hotelList || []}
      horizontal={true}
      renderItem={({item,index})=>(
     <HotelCard item={item}
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
 