import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../constants/context/ThemeContext'; 

export default function DataItem({ place, onPress }) {
  const { theme } = useTheme();
      const isDark = theme === 'dark';
      return (
    <TouchableOpacity onPress={onPress}>
    <View
      style={{
        width: 240,
        backgroundColor: isDark ? '#1e1e1e' : 'white',
        borderRadius: 10,
        padding: 10,
        margin: 5,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
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
        <View style={{ width: 220, height: 120, borderRadius: 15, backgroundColor: "#f0f0f0", justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#888" }}>No image</Text>
      </View>
      )}
      <Text
        numberOfLines={1}
        style={{
          fontFamily: "outfit",
          fontSize: 16,
          marginTop: 5,
         color: isDark ? 'white' : 'black',
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
         
          marginBottom: -5,
        }}
      >
        <AntDesign name="star" size={20} color="orange" />
        <Text style={{
          color: isDark ? 'white' : 'black',
        }}>{place.rating}</Text>
        <Ionicons name="ellipsis-vertical" size={30} style={{marginLeft:"62%"}} color={isDark ? 'white' : 'black'} />
      </View>
    </View>
    </TouchableOpacity>
  );
}
