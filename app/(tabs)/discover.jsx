/* import { View, Text } from 'react-native'
import React from 'react'

export default function discover() {
  return (
    <View>
      <Text>discover</Text>
    </View>
  )
} */
  import React, { useEffect, useState } from 'react';
  import { StyleSheet, View, Dimensions } from 'react-native';
  import MapView, { Marker } from 'react-native-maps';
  import * as Location from 'expo-location';
  
  export default function discover() {
    const [location, setLocation] = useState(null);
    const [region, setRegion] = useState(null);
  
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission denied');
          return;
        }
  
        let loc = await Location.getCurrentPositionAsync({});
        console.log(loc);
        setLocation(loc.coords);
        setRegion({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      })();
    }, []);
  
    return (
      <View style={styles.container}>
        {region && (
          <MapView style={styles.map} region={region} showsUserLocation={true}>
            <Marker coordinate={location} title="You are here" />
          </MapView>
        )}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });
  