import React, { useState, useEffect,  useContext} from 'react';
import { StyleSheet, View, Dimensions, Alert } from 'react-native';
import GoogleMapViewFull from '../GoogleMapViewFull';
import SearchBar from '../SearchBar';
import { UserLocationContext } from '../../constants/context/UserLocationContext';
import * as Location from 'expo-location';

export default function Discover() {
    const {userLocation, setUserLocation} = useContext(UserLocationContext);
    const [placeList, setPlaceList] = useState([]);
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
      GetNearBySearchPlace();
    })();})

    const GetNearBySearchPlace=()=>{
      const encodedPlaceName = encodeURIComponent(restaurants);
      
        const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodedPlaceName}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`;
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            if (data.results && data.results.length > 0) {
              setPlaceList(data.results);
              console.log("Nearby places:", data.results);
            } else {
              Alert.alert("No places found nearby.");
            }
          })
          .catch((error) => {
            console.error("Error fetching nearby places:", error);
          });
      }
    
  return (
    <View>
      <View style={{position: 'absolute', zIndex:20}}>
      <SearchBar />
      </View>
      
      <GoogleMapViewFull /> 
    </View>
  )
}