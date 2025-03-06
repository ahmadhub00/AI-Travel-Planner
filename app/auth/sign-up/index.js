import { View, Text,StyleSheet,TextInput,TouchableOpacity, ToastAndroid ,Platform, Alert,  } from 'react-native'
import React, { useEffect,useState } from 'react';
import { useNavigation ,useRouter} from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../../configs/FirebaseConfig'

export default function SignUp() {
  const navigation=useNavigation();
  const router=useRouter();

  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [fullName,setFullName]=useState();

  useEffect(()=> {
navigation.setOptions({
  headerShown:false
})
  },[])

  const onCreateAccount=()=>{

    if (!email || !password || !fullName) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Please Enter All Details', ToastAndroid.LONG);
      } else {
        Alert.alert('Error', 'Please Enter All Details');
      }
      return; }

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage,errorCode);
    // ..
  });
  }

  return (
    <View style={{
        padding:25,
        paddingTop:50,
         backgroundColor:'white',
         height:'100%'
      }}>
        <TouchableOpacity onPress={()=>router.back()}>
              <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
       <Text style={{
       fontFamily:'outfit-bold' ,
       fontSize:30,
       marginTop:30
      }}>Create New Account </Text>

      {/*User Full Name*/}
          <View style={{
            marginTop:50
          }}>
            <Text style={{
              fontFamily:'outfit'
            }}>Full Name</Text>
            <TextInput style={styles.input}
                  onChangeText={(value)=>setFullName(value)}
                  placeholder='Enter Full Name'/>
           </View>

           {/*Email*/}
          <View style={{
            marginTop:20
          }}>
            <Text style={{
              fontFamily:'outfit'
            }}>Email</Text>
            <TextInput style={styles.input}
              onChangeText={(value)=>setEmail(value)}
               placeholder='Enter Email'/>
           </View>
      
      
            {/*Password*/}
            <View style={{
            marginTop:20
          }}>
            <Text style={{
              fontFamily:'outfit'
            }}>Password</Text>
            <TextInput 
            secureTextEntry={true}
            style={styles.input}
            onChangeText={(value)=>setPassword(value)}
            placeholder='Enter Password'/>
           </View>

            
            {/*Create Account Button*/}
            <TouchableOpacity onPress={onCreateAccount} style={{
                   padding:20,
                   backgroundColor:'black',
                   borderRadius:15,
                   marginTop:50,
               }}>
                 <Text style={{
                  color:'white',
                  textAlign:'center'
                 }}>Create Account</Text>
                </TouchableOpacity>
                
                {/*Sign In Button*/}
           <TouchableOpacity 
                 onPress={()=>router.replace('auth/sign-in')}
                 style={{
                   padding:20,
                   backgroundColor:'white',
                   borderRadius:15,
                   marginTop:20,
                   borderWidth:1
               }}>
                 <Text style={{
                  color:'black',
                  textAlign:'center'
                 }}>Sign In</Text>
                 </TouchableOpacity>

           
                
                
      
    </View>
  )
}

const styles = StyleSheet.create({
input:{
  padding:15,
  borderWidth:1,
  borderRadius:15,
  borderColor:'grey',
  fontFamily:'outfit'

}
})
