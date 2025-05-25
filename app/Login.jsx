import { View, Text ,Image, StyleSheet,TouchableOpacity, ScrollView} from 'react-native'
import React from 'react'
import { useRouter} from 'expo-router'


export default function Login() {
  const router=useRouter();
  
  
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
     <Image style={{
      width:'140%',
      height:550
    }}
     source={require('./../assets/images/login.jpeg')}/>

      <View style={styles.container}>
         <Text style={{
          fontSize:28, 
          fontFamily:'outfit-bold',
          textAlign:'center',
          marginTop:10
          }}>AI Travel Planner </Text>

            <Text style={{
              fontSize:17, 
              fontFamily:'outfit',
              textAlign:'center',
               color:'#7d7d7d',
               marginTop:20
          }}>Discover your next adventure effortlessly</Text>
         
    <TouchableOpacity style={styles.button} 
    onPress={()=>router.push('auth/sign-in')}>
      <Text style={styles.buttonText} >
         Get Started </Text>
        </TouchableOpacity>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#fff',
    flexGrow: 1, 
  },
 container:{
  backgroundColor:'#fff',
  marginTop:-20,
  borderTopLeftRadius:20,
  borderTopRightRadius:20,
  padding: 25
 },
 button:{
  padding :15,
  backgroundColor:'black',
  borderRadius:15,
  marginTop:'20%',
  alignItems:'center',
  justifyContent: 'center',
  marginHorizontal: 15
 },
 buttonText: {
  color: 'white',
  fontFamily: 'outfit',
  textAlign: 'center',
  fontSize: 17
}

})
