import { View, Text, TouchableOpacity, Platform, ToastAndroid, Alert } from 'react-native';
import React, { useEffect, useContext, useState } from 'react';
import { useRouter, useNavigation } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function SelectDates() {
    const router = useRouter();
    const navigation = useNavigation();
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
           backgroundColor: "white",
            height: '100%' }}>
              
            <TouchableOpacity onPress={() => router.push('/create-trip/select-traveler')} 
            style={{ padding: 10 }}>
                <Ionicons name="arrow-back" size={28} color="black" />
            </TouchableOpacity>

            <Text style={{
               fontSize: 35,
               fontFamily: 'outfit-bold', 
               marginTop: 20
                }}>Travel Dates</Text>

            <View style={{
               marginTop: 30,
                padding: 20,
                borderWidth:2,
                borderColor:'black',
                borderRadius:15 }}>
                <Text style={{ 
                  fontSize: 20,
                   fontWeight: 'bold',
                    marginBottom: 10 
                    }}>Choose your travel dates</Text>
                
                <Calendar
                    onDayPress={onDayPress}
                    markingType={'period'}
                    markedDates={markedDates}
                    minDate={new Date().toISOString().split('T')[0]}
                    theme={{
                        selectedDayBackgroundColor: 'black',
                        todayTextColor: 'red',
                        arrowColor: 'black',
                    }}
                />
            </View>

            <TouchableOpacity
             onPress={OnDateSectionContinue} 
             style={{ 
              padding: 15,
               backgroundColor: "black",
                borderRadius: 15,
                 marginTop: 35 }}>
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
