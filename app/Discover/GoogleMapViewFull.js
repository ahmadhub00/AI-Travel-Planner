import {View, Text, Dimensions, Alert, StyleSheet } from 'react-native';
import React, { useState, useEffect, useContext } from 'react'
import MapView, { Marker/* , PROVIDER_GOOGLE */} from 'react-native-maps';
import { UserLocationContext } from '../../constants/context/UserLocationContext';
import { useTheme } from '../../constants/context/ThemeContext'; 
import darkMapStyle from './darkMapStyle';

export default function GoogleMapViewFull({ placeList = [] }) {
  const [mapRegion, setMapRegion] = useState(null);
    const {userLocation, setUserLocation} = useContext(UserLocationContext);

    const { theme } = useTheme();
        const isDark = theme === 'dark';

        
    useEffect(() => {
      if (userLocation){
           setMapRegion({
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
             latitudeDelta: 0.01,
             longitudeDelta: 0.01,
           });
         }
       }, [userLocation]);

        /* Adjust the map to fit all markers when placeList changes */
    useEffect(() => {
        if (placeList.length > 0 && userLocation) {
            // Keep using current region as default
            setMapRegion(prevRegion => prevRegion || {
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            });
        }
    }, [placeList, userLocation]);
    
  return (
    <View>
      {userLocation && mapRegion ? (
        <MapView
          style={{
             width: Dimensions.get('screen').width,
             height: Dimensions.get('screen').height
             }}
        region={mapRegion}
          showsUserLocation={true}
          showsMyLocationButton={false}
          customMapStyle={theme === 'dark' ? darkMapStyle : []}
        >
          {/* User's current location marker */}
            <Marker
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude
            }}
            title="You are here"
            pinColor="blue"
        />
          {/* Display markers for all places in the search results */}
          {placeList.map((place, index) => (
                        place.geometry && (
                            <Marker
                                key={`place-${index}`}
                                coordinate={{
                                    latitude: place.geometry.location.lat,
                                    longitude: place.geometry.location.lng
                                }}
                                title={place.name}
                                description={place.vicinity || place.formatted_address}
                            />
                        )
                    ))}
                </MapView>
            ) : (
                <View style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                    <Text>Loading map...</Text>
                </View>
            )}
        </View>
    );
}
