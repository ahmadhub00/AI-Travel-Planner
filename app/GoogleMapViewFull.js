import {View, Text, Dimensions, Alert, StyleSheet } from 'react-native';
import React, { useState, useEffect }from 'react'
import MapView, { Marker/* , PROVIDER_GOOGLE */} from 'react-native-maps';
import * as Location from 'expo-location';

export default function GoogleMapViewFull() {
    const [region, setRegion] = useState([]);
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
     (async () => {
           const { status } = await Location.requestForegroundPermissionsAsync();
           if (status !== 'granted') {
             Alert.alert('Permission Denied', 'Location access is required.');
             return;
           }
           const location = await Location.getCurrentPositionAsync({});
           const { latitude, longitude } = location.coords;
     
           setUserLocation({ latitude, longitude });
           setRegion({
             latitude,
             longitude,
             latitudeDelta: 0.01,
             longitudeDelta: 0.01,
           });
         })();
       }, []);
    
  return (
    <View>
      {userLocation ? 
        <MapView
          style={{
             width: Dimensions.get('screen').width,
             height: Dimensions.get('screen').height
             }}
            /*  provider={PROVIDER_GOOGLE}  */// remove if not using Google Maps
          region={mapRegion}
          showsUserLocation={true}
        >
            <Marker
              coordinate={mapRegion}
              title="you"
              /* description="This is a custom pin" */
            />
        </MapView>:null
        }
    </View>
        )}
