import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { GetPhotoRef } from '../../Services/GooglePlaceApi';
import PlannedCard from './PlannedCard';

export default function PlannedTrip({details= {}}) {

      //console.log(JSON.stringify(details, null, 2));

  return (
    //with Flatlist method
 /*     <View style={{
        marginTop:20
    }}>
      <Text style={{
        fontSize:20,
        fontFamily:'outfit-bold'
      }}>⛺Plan Details</Text>

     <FlatList
       data={Object.entries(details)}
        keyExtractor={([day], index) => day + index.toString()}
        renderItem={({ item }) => {
        const [day, dayDetails] = item;
  return (
    <View key={day}>
      <Text style={{ fontFamily: 'outfit-medium', fontSize: 20, marginTop: 20 }}>
        {day.charAt(0).toUpperCase() + day.slice(1)}
      </Text>

      <FlatList
        data={dayDetails.schedule}
        keyExtractor={(place, index) => place?.id || index.toString()}
        nestedScrollEnabled={true}
        renderItem={({ item: place }) => (
          <View style={{
            borderWidth: 1,
            backgroundColor: '#fafafa',
            padding: 8,
            borderRadius: 15,
            borderColor: 'lightgrey',
            marginTop: 20
          }}>
            <PlannedCard place={place} />
          </View>
        )}
      />
    </View>
  );
}}
/>
</View>
);
}  */
//with MAP method 
 <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 20, fontFamily: 'outfit-bold' }}>⛺Plan Details</Text>

      <View>
        {Object.entries(details).map(([day, dayDetails]) => (
          <View key={day}>
            <Text style={{ fontFamily: 'outfit-medium', fontSize: 20, marginTop: 20 }}>
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </Text>

            <View>
              {dayDetails.schedule.map((place, index) => (
                <View key={index} style={{
                  borderWidth: 1,
                  backgroundColor: '#fafafa',
                  padding: 8,
                  borderRadius: 15,
                  borderColor: 'lightgrey',
                  marginTop: 20,
                }}>
                  <PlannedCard place={place} />
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
} 