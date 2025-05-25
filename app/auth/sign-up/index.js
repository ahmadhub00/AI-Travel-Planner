import { View, Text,StyleSheet,TextInput,TouchableOpacity, ToastAndroid ,Platform, Alert,  } from 'react-native'
import React, { useEffect,useState } from 'react';
import { useNavigation ,useRouter} from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getAuth, createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
import {auth} from '../../../configs/FirebaseConfig'

export default function SignUp() {
  const navigation=useNavigation();
  const router=useRouter();

  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [fullName,setFullName]=useState();

  const showAlert = (message) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.LONG);
  } else {
    Alert.alert('Validation Error', message);
  }
};

  useEffect(()=> {
navigation.setOptions({
  headerShown:false
})
  },[])

  const onCreateAccount=()=>{
const trimmedName = fullName?.trim() || "";
  const trimmedEmail = email?.trim() || "";
  const trimmedPassword = password?.trim() || "";
  // Full Name validation
  const nameRegex = /^[A-Za-z\s]{2,50}$/; // Only letters and spaces, 2-50 characters
  if (!nameRegex.test(trimmedName)) {
    showAlert("Full name must be 2-50 characters long and contain only letters.");
    return;
  }
  // Email validation
  if (trimmedEmail.length < 11 || trimmedEmail.length > 320) {
    showAlert("Email must be between 11 and 320 characters.");
    return;
  }
  // Password validation
  if (trimmedPassword.length < 6 || trimmedPassword.length > 128) {
    showAlert("Password must be between 6 and 128 characters.");
    return;
  }

createUserWithEmailAndPassword(auth, email.trim(), password.trim())
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(user, { displayName: trimmedName }).then(() => {
        router.replace('/mytrip');
      });
    //console.log(user);
    
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage,errorCode);
    let message = 'Something went wrong';
  switch (error.code) {
    case 'auth/email-already-in-use':
      message = 'This email is already registered.';
      break;
    case 'auth/invalid-email':
      message = 'Invalid email format.';
      break;
    case 'auth/weak-password':
      message = 'Password is too weak. Try a stronger one.';
      break;
    default:
      message = error.message;
  }
   showAlert(message);   
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
                  onChangeText={(value) => {
    const onlyLetters = value.replace(/[^A-Za-z\s]/g, '');
    setFullName(onlyLetters);
  }}
                  placeholder='Enter Full Name'
                  value={fullName}/>
           </View>

           {/*Email*/}
          <View style={{
            marginTop:20
          }}>
            <Text style={{
              fontFamily:'outfit'
            }}>Email</Text>
            <TextInput style={styles.input}
              onChangeText={(value)=>setEmail(value.trim())}
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
            onChangeText={(value)=>setPassword(value.trim())}
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
