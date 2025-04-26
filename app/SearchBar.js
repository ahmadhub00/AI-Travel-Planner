import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";

export default function SearchBar() {
     return (
    <View>
      {/* <LinearGradient
  colors={['grey', 'transparent']} 
  style={{
    padding: 20,
    width: Dimensions.get('screen').width ,
    }}
>
  <Text style={{ color: 'white', fontWeight: 'bold',padding:40, fontSize: 20}}>
   Discover</Text>
</LinearGradient> */}

      <Text
        style={{
          color: "white",
          marginTop: 40,
          marginLeft: 30,
          fontFamily: "outfit-bold",
          fontSize: 35,
        }}
      >
        Discover
      </Text>
      <View
        style={{
          marginHorizontal:18,
         
          display: "flex",
          flexDirection: "row",
          paddingHorizontal:10 ,
          gap: 8,
          backgroundColor: "white",
          borderRadius: 10,
          alignItems: "center",
          fontFamily: 'outfit',
          fontSize: 16,
          borderColor: 'grey'/* isDark ? 'grey' : 'black' */,
          borderWidth: 1,
          backgroundColor:'white' /* isDark ? '#1e1e1e' : '#EEE' */,
      
        }}
      >
        <Ionicons name="search" size={24} color="grey" />
        <TextInput
          placeholder="Search"
          placeholderTextColor="grey"
          style={{
            backgroundColor:'white',
           width:"85%"
          }}
          onChangeText={(value) => console.log(value)}
          onSubmitEditing={(value) => console.log(searchInput)}
        />
      </View>
    </View>
  );
}
