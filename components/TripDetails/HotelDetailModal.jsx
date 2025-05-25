import { View, Text, Modal, Image, ScrollView, TouchableOpacity, StyleSheet, Linking } from "react-native";
import React from "react";
import { AntDesign, Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";

export default function HotelDetailModal({ place, visible, onClose }) {
  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${place.name}&query_place_id=${place.place_id}`;
    Linking.openURL(url);
  };

  const handleCall = () => {
    if (place.formatted_phone_number) {
      Linking.openURL(`tel:${place.formatted_phone_number}`);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>
            {place?.photos ? (
              <Image
                source={{
                  uri:
                    "https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=" +
                    place?.photos[0]?.photo_reference +
                    "&key=" +
                    process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
                }}
                style={styles.image}
              />
            ) : (
              <View style={[styles.image, styles.noImage]}>
                <Text style={{ color: "#888" }}>No image available</Text>
              </View>
            )}

            <Text style={styles.title}>{place.name}</Text>
            
            {place.rating && (
              <View style={styles.ratingContainer}>
                <AntDesign name="star" size={20} color="orange" />
                <Text style={styles.rating}>{place.rating}</Text>
                {place.user_ratings_total && (
                  <Text style={styles.reviews}>({place.user_ratings_total} reviews)</Text>
                )}
              </View>
            )}

            <View style={styles.infoContainer}>
              <MaterialIcons name="location-on" size={22} color="#4285F4" />
              <Text style={styles.infoText}>
                {place.vicinity ? place.vicinity : place.formatted_address}
              </Text>
            </View>

            {place.formatted_phone_number && (
              <TouchableOpacity style={styles.infoContainer} onPress={handleCall}>
                <MaterialIcons name="phone" size={22} color="#4285F4" />
                <Text style={styles.infoText}>{place.formatted_phone_number}</Text>
              </TouchableOpacity>
            )}

            {place.opening_hours && (
              <View style={styles.infoContainer}>
                <MaterialIcons name="access-time" size={22} color="#4285F4" />
                <Text style={styles.infoText}>
                  {place.opening_hours.open_now ? "Open Now" : "Closed Now"}
                </Text>
              </View>
            )}

            {place.website && (
              <TouchableOpacity 
                style={styles.infoContainer}
                onPress={() => Linking.openURL(place.website)}
              >
                <MaterialIcons name="public" size={22} color="#4285F4" />
                <Text style={[styles.infoText, styles.website]} numberOfLines={1}>
                  {place.website}
                </Text>
              </TouchableOpacity>
            )}

            {place.price_level && (
              <View style={styles.infoContainer}>
                <FontAwesome name="dollar" size={22} color="#4285F4" />
                <Text style={styles.infoText}>
                  {Array(place.price_level).fill('$').join('')}
                </Text>
              </View>
            )}

            <TouchableOpacity style={styles.directionsButton} onPress={openGoogleMaps}>
              <Text style={styles.directionsButtonText}>Get Directions</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    height: '80%',
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    marginBottom: 15
  },
  noImage: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'outfit',
    marginBottom: 10
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  rating: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'outfit',
  },
  reviews: {
    marginLeft: 5,
    color: 'gray',
    fontFamily: 'outfit',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'outfit',
    flex: 1
  },
  website: {
    color: '#4285F4',
    textDecorationLine: 'underline'
  },
  directionsButton: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  directionsButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'outfit',
  }
});