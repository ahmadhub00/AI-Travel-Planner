import { View, Text ,Image, StyleSheet,TouchableOpacity} from 'react-native'
import React from 'react'
import { useRouter} from 'expo-router'

export default function Login() {
  const router=useRouter();
  
  
  return (
    <View>
     <Image style={{
      width:'140%',
      height:500}}
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
          </View>
   
   
    <TouchableOpacity style={styles.button} 
    onPress={()=>router.push('auth/sign-in')}>
      <Text style={{
        color:'white',
        fontFamily:'outfit',
        textAlign:'center',
        fontSize:17
        }}> Get Started</Text>
        </TouchableOpacity>
  
    </View>
  )
}

const styles = StyleSheet.create({
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
  borderRadius:99,
  marginTop:'20%',
  alignItems:'center'
 }

})
