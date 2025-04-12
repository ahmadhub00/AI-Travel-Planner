import { Text, View } from "react-native";
import Login from './../components/Login'
import {auth} from '../configs/FirebaseConfig'
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Index() {
  const user =auth.currentUser;
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}>
        
        {user?
       <Redirect href={'/mytrip'} /> :
        <Login/>
        }
       </GestureHandlerRootView>
  );
}
