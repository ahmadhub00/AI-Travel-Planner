import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../../constants/context/ThemeContext'; 

export default function TabLayout() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <Tabs screenOptions={{
      headerShown:false,
      tabBarActiveTintColor: isDark ? 'white' : 'black',
      tabBarInactiveTintColor: isDark ? '#888' : '#888',
      tabBarStyle: {
        backgroundColor: isDark ? '#121212' : 'white',
        borderTopColor: isDark ? '#333' : '#ccc',
      },
    }}>
    
      <Tabs.Screen name ="mytrip" options={{
        tabBarLabel:'my Trip',
        tabBarIcon:({color})=><Ionicons name="location-sharp" size={24} color={color} />}}/>
      <Tabs.Screen name ="discover" options={{
        tabBarLabel:'Discover',
        tabBarIcon:({color})=><Ionicons name="globe-sharp" size={24} color={color} />}}/>
      <Tabs.Screen name ="profile" options={{
        tabBarLabel:'Profile',
        tabBarIcon:({color})=><Ionicons name="people-circle" size={24} color={color} />}}/>
     
    </Tabs>
  )
}