import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { BlurView } from 'expo-blur';
import { useTheme } from '../../constants/context/ThemeContext'; 

export default function SearchBar({ onSearch }) {
  const [searchInput, setSearchInput] = useState('');
  const handleSubmit = () => {
    if (searchInput.trim()) {
        onSearch(searchInput);
    }
};
const { theme } = useTheme();
    const isDark = theme === 'dark';

     return (
    <View>
      
       {/*  <LinearGradient
  colors={['rgba(156, 155, 155, 0.7)', 'transparent']} 
  style={{
    padding: 20,
    width: Dimensions.get('screen').width ,
    height:100,
    position: 'absolute',
    }}
/> */}
  
      <Text
        style={{
          color: isDark ? 'white' : '#121212',
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
          marginTop: 10,
          flexDirection: "row",
          paddingHorizontal:10 ,
          gap: 8,
          borderRadius: 10,
          alignItems: "center",
          fontFamily: 'outfit',
          fontSize: 16,
          borderColor: "grey"/* isDark ? 'grey' : 'black' */,
          borderWidth: 1,
          backgroundColor: isDark ? '#1e1e1e' : 'white',
      
        }}
      >
        <Ionicons name="search" size={24} color="grey" />
        <TextInput
          placeholder="Search Place Here"
          placeholderTextColor="grey"
          style={{
            backgroundColor: isDark ? '#1e1e1e' : 'white',
           width:"75%",
           fontFamily: 'outfit',
          }}
          value={searchInput}
          onChangeText={(value) => setSearchInput(value)}
          onSubmitEditing={handleSubmit}
        />
        <TouchableOpacity 
          onPress={handleSubmit}
          style={{
            backgroundColor: '#1e1e1e',
            borderRadius: 8,
            padding: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>
    
    </View>
  );
}
