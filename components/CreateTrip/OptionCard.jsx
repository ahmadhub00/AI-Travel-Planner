import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '../../constants/context/ThemeContext';

export default function OptionCard({option,selectedOption}) {
        const { theme } = useTheme();
        const isDark = theme === 'dark';
  
    return (
    <View style={[{
        padding:25,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        borderWidth:1,
        backgroundColor: isDark ? '#1E1E1E' : '#F0F0F0' ,
        borderRadius:15,
        borderColor: isDark ? '#555555' : 'grey'
    },selectedOption?.id==option?.id&&{borderWidth:1,borderColor: isDark ? 'white' : 'black'}]}>
        <View>
            <Text style={{
                fontSize:20,
                fontFamily:'outfit-bold',
                color:isDark ? '#fff' : '#000'
            }}>{option?.title}</Text>

            <Text style={{
                fontSize:17,
                fontFamily:'outfit',
                color:"grey"
            }}>{option?.desc}</Text>
        </View>
        <Text style={{
                fontSize:35
            }}>{option?.icon}</Text>
     
    </View>
  )
}