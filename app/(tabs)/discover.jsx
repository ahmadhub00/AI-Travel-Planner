import React, { useState, useEffect,  useContext} from 'react';
import { StyleSheet, View, Dimensions, Alert } from 'react-native';
import { UserLocationContext } from '../../constants/context/UserLocationContext';
import * as Location from 'expo-location';
import DataList from '../../components/Discover/DataList';
import GoogleMapViewFull from '../../components/Discover/GoogleMapViewFull';
import SearchBar from '../../components/Discover/SearchBar';

export default function Discover() {
    const {userLocation, setUserLocation} = useContext(UserLocationContext);
    const [placeList, setPlaceList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('restaurants'); // Default search term
    
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
      // Only search for places once we have the location
      if (latitude && longitude) {
        getNearBySearchPlace(searchQuery);
    }
    }
  )();
}, []);
// Effect to run search when user location or search query changes
useEffect(() => {
  if (userLocation && searchQuery) {
      getNearBySearchPlace(searchQuery);
  }
}, [userLocation, searchQuery]);

    const getNearBySearchPlace=(query)=>{
      const encodedPlaceName = encodeURIComponent(query);
      
        const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodedPlaceName}&location=${userLocation.latitude},${userLocation.longitude}&radius=2000&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`;
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            if (data.results && data.results.length > 0) {
              setPlaceList(data.results);
             // console.log("Nearby places:", data.results);
            } else {
              Alert.alert("No places found nearby.");
              setPlaceList([]);
            }
          })
          .catch((error) => {
            console.error("Error fetching nearby places:", error);
          });
      }
      const handleSearch = (query) => {
        setSearchQuery(query);
    };
  return (
    <View style={{
       flex: 1,
      position:'relative'}}>
        
      <View style={{position: 'absolute', zIndex:20}}>
       <SearchBar onSearch={handleSearch} />
      </View>
      
       <GoogleMapViewFull placeList={placeList}/> 
      <View style={{position: 'absolute', zIndex:20, bottom:0}}>
       <DataList placeList={placeList} />
      </View>

    </View>
  )
}