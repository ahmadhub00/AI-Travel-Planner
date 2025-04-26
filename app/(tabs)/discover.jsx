import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Alert } from 'react-native';
import GoogleMapViewFull from '../GoogleMapViewFull';
import SearchBar from '../SearchBar';

export default function Discover() {
  return (
    <View>
      <View style={{position: 'absolute', zIndex:20}}>
      <SearchBar />
      </View>
      
      <GoogleMapViewFull /> 
    </View>
  )}
