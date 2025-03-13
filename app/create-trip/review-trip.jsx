import { View, Text, FlatList,TouchableOpacity } from 'react-native'
import React, { useEffect, useContext ,useState}  from 'react'
import { useNavigation ,useRouter} from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function ReviewTrip() {
  const router = useRouter(); 

  const navigation=useNavigation();

      useEffect(() => {
            navigation.setOptions({
                headerShown: false,
            });
        }, []);
  return (
    <View>
      <Text>ReviewTrip</Text>
    </View>
  )
}