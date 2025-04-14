import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import moment from 'moment';
import UserTripCard from './UserTripCard';
import { useRouter } from 'expo-router';
import { useTheme } from '../../constants/context/ThemeContext';

export default function UserTripList({ userTrips }) {
    const router = useRouter();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const [search, setSearch] = useState('');
const [filteredTrips, setFilteredTrips] = useState(userTrips);
const [selectedTrip, setSelectedTrip] = useState(() => {
    const parsedTripData = JSON.parse(userTrips[0].tripData);
    return { ...parsedTripData, tripDetails: userTrips[0].tripDetails };
});

const handleSearchChange = (text) => {
  setSearch(text);

  const filtered = userTrips.filter(trip => {
    const data = JSON.parse(trip.tripData);
    const location = data?.tripPlan?.tripDetails?.location || '';
    const travelers = data?.tripPlan?.tripDetails?.travelers?.toString() || '';
    const startDate = moment(data?.startDate).format('DD MMM yyyy').toLowerCase();

    return (
      location.toLowerCase().includes(text.toLowerCase()) ||
      travelers.toLowerCase().includes(text.toLowerCase()) ||
      startDate.includes(text.toLowerCase())
    );
  });

  setFilteredTrips(filtered.length > 0 ? filtered : userTrips);

  if (filtered.length > 0) {
    const parsed = JSON.parse(filtered[0].tripData);
    setSelectedTrip({ ...parsed, tripDetails: filtered[0].tripDetails });
  }
};

    return userTrips && (
        <View >
            {/* Search Bar */}
            <View style={{ marginTop: 20, marginBottom: 10 }}>
  <TextInput
    placeholder="Search ..."
    placeholderTextColor={isDark ? '#ccc' : '#888'}
    style={{
      backgroundColor: isDark ? '#1e1e1e' : '#f2f2f2',
      color: isDark ? '#fff' : '#000',
      borderRadius: 10,
      paddingHorizontal: 15,
      paddingVertical: 10,
      fontFamily: 'outfit',
      fontSize: 16,
      borderColor: '#ccc',
      borderWidth: 1,
    }}
    value={search}
    onChangeText={handleSearchChange}
  />
</View>

            {/* Main Trip Image */}
            <View style={{ marginTop: 10 }}>
                {selectedTrip?.locationInfo?.photoRef ? (
                    <Image
                        source={{
                            uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='
                                + selectedTrip.locationInfo?.photoRef
                                + '&key=' + process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY
                        }}
                        style={{
                            width: '100%',
                            height: 240,
                            objectFit: 'cover',
                            borderRadius: 15,
                        }}
                    />
                ) : (
                    <Image
                        source={require('../../assets/images/login.jpeg')}
                        style={{
                            width: '100%',
                            height: 240,
                            objectFit: 'cover',
                            borderRadius: 15,
                        }}
                    />
                )}

                {/* Selected Trip Details */}
                <View style={{ marginTop: 10 }}>
                    <Text style={{
                        fontFamily: 'outfit-medium',
                        fontSize: 20,
                        color: isDark ? '#fff' : '#000'
                    }}>
                        {selectedTrip?.tripPlan?.tripDetails?.location || "No Location Found"}
                    </Text>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 5
                    }}>
                        <Text style={{
                            fontFamily: 'outfit',
                            fontSize: 17,
                            color: isDark ? '#fff' : '#000'
                        }}>
                            {moment(selectedTrip.startDate).format('DD MMM yyyy')}
                        </Text>
                        <Text style={{
                            fontFamily: 'outfit',
                            fontSize: 17,
                            color: 'grey'
                        }}>
                            🚌 {selectedTrip?.tripPlan?.tripDetails?.travelers || "Unknown Traveler"}
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => router.push({
                            pathname: '/trip-details',
                            params: { trip: JSON.stringify(selectedTrip) }
                        })}
                        style={{
                            marginTop: 10,
                            backgroundColor: 'black',
                            padding: 15,
                            borderWidth: 1,
                            borderRadius: 15,
                            borderColor: isDark ? 'grey' : '#000',
                        }}>
                        <Text style={{
                            fontFamily: 'outfit-medium',
                            fontSize: 15,
                            textAlign: 'center',
                            color: 'white',
                        }}>
                            See your plan
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Other Trips */}
                {filteredTrips.map((trip, index) => (
                    <UserTripCard
                        key={index}
                        trip={trip}
                        onSelectTrip={() => {
                            const parsedTripData = JSON.parse(trip.tripData);
                            setSelectedTrip({
                                ...parsedTripData,
                                tripPlan: {
                                    ...parsedTripData.tripPlan,
                                    tripDetails: trip.tripPlan?.tripDetails
                                }
                            });
                        }}
                    />
                ))}
            </View>
        </View>
    );
}
