import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";
import moment from "moment";
import { useTheme } from "../../constants/context/ThemeContext"; // Adjust the import path as necessary

export default function UserTripCard({ trip, onSelectTrip, onDeleteTrip}) {
  const formattedTrip = JSON.parse(trip.tripData);
  const photoRef = formattedTrip.locationInfo?.photoRef;
  const googleApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY;
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleDelete = () => {
    Alert.alert("Delete Trip", "Are you sure you want to delete this trip?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => onDeleteTrip(trip.id),
      },
    ]);
  };
  return (
    <TouchableOpacity onPress={onSelectTrip} activeOpacity={0.7}>
      <View
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          backgroundColor: isDark ? "#1e1e1e" : "#f0f0f0",
          padding: 10,
          borderRadius: 15,
        }}
      >
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${encodeURIComponent(
              photoRef
            )}&key=${googleApiKey}`,
          }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 15,
          }}
          onError={(e) =>
            console.log("Image Load Error At tripcard:", e.nativeEvent)
          }
        />

        <View style={{ flex: 1 }}>
            
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 17,
              width: 290,
              color: isDark ? "#fff" : "#000",
            }}
          >
            {trip.tripPlan?.tripDetails?.location}
          </Text>

          

          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 14,
              color: "grey",
              marginVertical: 2,
            }}
          >
            {moment(formattedTrip.startDate).format("DD MMM yyyy")}
          </Text>
          <View style={{ flexDirection: "row", gap: 10, justifyContent: "space-between", alignItems: "center", width: 230 }}>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 14,
              color: "grey",
              flexShrink: 1,
            }}
          >
            Traveling: {formattedTrip.traveler?.title}
          </Text>
          {/* Delete Button */}
          <TouchableOpacity
            onPress={handleDelete}
            style={{
              backgroundColor: "#FF6B6B",
              width: 54,
              paddingHorizontal: 6,
              borderRadius: 8,
              padding: 5,
              /* alignSelf: 'flex-start', */
            }}
          >
            <Text style={{ color: "white", fontFamily: "outfit" }}>Delete</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
