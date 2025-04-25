import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Alert } from 'react-native';
import MapView, { Marker/* , PROVIDER_GOOGLE */} from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapScreen() {
  const [region, setRegion] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [droppedPin, setDroppedPin] = useState(null);

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

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setDroppedPin({ latitude, longitude });

    // 🛰️ Example: Send these to your backend
    console.log('Dropped pin coordinates:', latitude, longitude);
    // Or send using fetch() to your API
  };

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          showsCompass={true}
          showsScale={true}
          rotateEnabled={true}
          pitchEnabled={true}
          scrollEnabled={true}
        /* scaleBarEnabled={true} */
          style={styles.map}
          region={region}
          showsUserLocation={true}
          onPress={handleMapPress}
          
        >
          {droppedPin && (
            <Marker
              coordinate={droppedPin}
              /* title="Custom Pin"
              description={`Lat: ${droppedPin.latitude}, Lng: ${droppedPin.longitude}`}
            */ />
          )}
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
