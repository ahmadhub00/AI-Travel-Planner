import { View, Text, TouchableOpacity, Platform, ToastAndroid, Alert } from 'react-native';
import React, { useEffect, useContext, useState } from 'react';
import { useRouter, useNavigation } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import {CreateTripContext }from './../../constants/context/CreateTripContext';
import { useTheme } from '../../constants/context/ThemeContext';

export default function SelectDates() {
    const router = useRouter();
    const navigation = useNavigation();
          const { theme } = useTheme();
          const isDark = theme === 'dark';
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [markedDates, setMarkedDates] = useState({});
    const { tripData, setTripData } = useContext(CreateTripContext) || {}; 

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const onDayPress = (day) => {
      const date = day.dateString;
      
      if (!startDate || (startDate && endDate)) {
          console.log(`Start Date Selected: ${date}, Type: START_DATE`);
          setStartDate(date);
          setEndDate(null);
          setMarkedDates({
              [date]: { selected: true, startingDay: true, endingDay: true, color: 'black', textColor: 'white' }
          });
      } else {
          if (moment(date).isBefore(startDate)) {
              console.log(`Start Date Selected: ${date}, Type: START_DATE`);
              setStartDate(date);
          } else {
              console.log(`End Date Selected: ${date}, Type: END_DATE`);
              setEndDate(date);
              highlightRange(startDate, date);
          }
      }
  };

    const highlightRange = (start, end) => {
        let range = {};
        let currentDate = moment(start);

        while (currentDate.isSameOrBefore(end)) {
            range[currentDate.format('YYYY-MM-DD')] = { selected: true, color: 'black', textColor: 'white' };
            currentDate.add(1, 'day');
        }

        range[start] = { selected: true, startingDay: true, color: 'black', textColor: 'white' };
        range[end] = { selected: true, endingDay: true, color: 'black', textColor: 'white' };

        setMarkedDates(range);
    };

    const OnDateSectionContinue = () => {
        if (!startDate || !endDate) {
            const message = 'Please select both start and end dates';
            if (Platform.OS === 'android') {
                ToastAndroid.show(message, ToastAndroid.LONG);
              } else { Alert.alert('Missing Dates', message); }
            return; }

        if (!setTripData) {
            console.error("Context is not properly set");
            return;
        }
        const totalNoOfDays = moment(endDate).diff(moment(startDate), 'days');
        console.log(`Total No of Days: ${totalNoOfDays+1}`);
              
        setTripData({
            ...tripData,
            startDate,
            endDate,
            totalNoOfDays: totalNoOfDays + 1,
        });
        router.push('/create-trip/select-budget');
    }

    return ( 
        <View style={{ 
          padding: 25, 
          paddingTop: 75,
          backgroundColor: isDark ? '#121212' : '#FAFAFA',
          height: '100%' }}>
              
            <TouchableOpacity onPress={() => router.push('/create-trip/select-traveler')} 
            style={{ padding: 10 }}>
                <Ionicons name="arrow-back" size={28} color= {isDark ? '#fff' : '#000' } />
            </TouchableOpacity>

            <Text style={{
               fontSize: 35,
               fontFamily: 'outfit-bold', 
               marginTop: 20,
               color:isDark ? '#fff' : '#000'
                }}>Travel Dates</Text>

            <View style={{
               marginTop: 30,
                padding: 20,
                borderWidth:1,
                borderColor:isDark ? 'grey' : 'black',
                borderRadius:15,
                backgroundColor:isDark ? '#121212' : '#ffffff' }}>
                <Text style={{ 
                  fontSize: 20,
                   fontWeight: 'bold',
                    marginBottom: 10 ,
                    color:isDark ? '#fff' : '#000'
                    }}>Choose your travel dates</Text>
                
                <Calendar
                    onDayPress={onDayPress}
                    markingType={'period'}
                    markedDates={markedDates}
                    minDate={new Date().toISOString().split('T')[0]}
                    theme={{
                        backgroundColor: isDark ? '#121212' : '#ffffff',
                        calendarBackground: isDark ? '#121212' : '#ffffff',
                        textSectionTitleColor: isDark ? '#BBBBBB' : '#444444',
                        selectedDayBackgroundColor: isDark ? 'grey' : '#000000',
                        selectedDayTextColor: isDark ? '#ffffff' : '#ffffff',
                        todayTextColor: isDark ? '#FF6B6B' : '#FF0000',
                        dayTextColor: isDark ? '#DDDDDD' : '#2d4150',
                        textDisabledColor: isDark ? '#555555' : '#d9e1e8',
                        dotColor: isDark ? '#FF6B6B' : '#00adf5',
                        selectedDotColor: '#ffffff',
                        arrowColor: isDark ? 'white' : '#000000',
                        monthTextColor: isDark ? '#FFFFFF' : '#000000',
                        indicatorColor: isDark ? '#FF6B6B' : '#000000',
                        textDayFontFamily: 'outfit',
                        textMonthFontFamily: 'outfit-bold',
                        textDayHeaderFontFamily: 'outfit', }}
                />
            </View>

            <TouchableOpacity
              onPress={OnDateSectionContinue} 
              style={{ 
              padding: 15,
              backgroundColor: isDark ? '#1e1e1e' : '#000',
              borderRadius: 15,
              marginTop: 35,
              borderWidth:1,
              borderColor: isDark ? 'grey' : '#000',}}>
                <Text style={{
                   fontFamily: 'outfit-medium', 
                   color: "white", 
                   textAlign: 'center', 
                   fontSize: 20 
                   }}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}
