import { View, Text, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

export default function DataItem({ place }) {
  return (
    <View
      style={{
        width: 240,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        margin: 5,
      }}
    >
      {place?.photos ? (
        <Image
          source={{
            uri:
              "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
              place?.photos[0]?.photo_reference +
              "&key=" +
              process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
          }}
          style={{
            width: 220,
            height: 120,
            borderRadius: 15,
          }}
        />
      ) : (
        <Text>no image</Text>
      )}
      <Text
        numberOfLines={2}
        style={{
          fontFamily: "outfit",
          fontSize: 16,
          marginTop: 5,
        }}
      >
        {place.name}
      </Text>
      <Text
        numberOfLines={2}
        style={{
          fontFamily: "outfit",
          fontSize: 13,
          marginTop: 5,
          color: "darkgrey",
        }}
      >
        {/*  If place.vicinity exists (is truthy), then use it. Otherwise, use place.formatted_address */}
        {place.vicinity ? place.vicinity : place.formatted_address}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          marginTop: 5,
          marginBottom: -5,
        }}
      >
        <AntDesign name="star" size={20} color="yellow" />
        <Text>{place.rating}</Text>
      </View>
    </View>
  );
}
