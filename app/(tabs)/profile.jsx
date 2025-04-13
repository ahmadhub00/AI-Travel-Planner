import { View, Text } from 'react-native'
import React from 'react'

export default function profile() {
  return (
    <View style={{ padding: 20 }}>  
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 35
      }}>profile</Text>

    /* user info */
    <UserIntro/>
   /*  menu list */
    </View>

   
  )
}















/* import React, { useState } from 'react';
import {
  View, Text, Button, Image, StyleSheet, TouchableOpacity, Switch,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { useColorScheme } from 'react-native';
import { Provider as PaperProvider, useTheme, Switch as PaperSwitch } from 'react-native-paper';

const translations = {
  en: { email: "Email", password: "Password", logout: "Logout", language: "Language", darkMode: "Dark Mode", settings: "Settings" },
  es: { email: "Correo", password: "Contraseña", logout: "Cerrar sesión", language: "Idioma", darkMode: "Modo Oscuro", settings: "Configuraciones" },
};

i18n.translations = translations;
i18n.locale = Localization.locale;
i18n.fallbacks = true;

const Profile = () => {
  const [image, setImage] = useState(null);
  const [language, setLanguage] = useState(i18n.locale.startsWith('es') ? 'es' : 'en');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = useTheme();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'es' : 'en';
    setLanguage(newLang);
    i18n.locale = newLang;
  };

  const handleLogout = () => {
    // Your logout logic here
    console.log('Logged out');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TouchableOpacity onPress={pickImage}>
         <Image
          source={image ? { uri: image } : require('../../assets/images/default-avatar.png')}
          style={styles.avatar}
        /> 
      </TouchableOpacity>

      <Text style={[styles.text, { color: theme.colors.onBackground }]}>{i18n.t('email')}: example@mail.com</Text>
      <Text style={[styles.text, { color: theme.colors.onBackground }]}>{i18n.t('password')}: ••••••••</Text>

      <View style={styles.row}>
        <Text style={styles.label}>{i18n.t('language')}:</Text>
        <Button title={language.toUpperCase()} onPress={toggleLanguage} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{i18n.t('darkMode')}:</Text>
        <PaperSwitch value={isDarkMode} onValueChange={() => setIsDarkMode(!isDarkMode)} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{i18n.t('settings')}:</Text>
        <Button title="More" onPress={() => console.log('Settings')} />
      </View>

      <Button title={i18n.t('logout')} onPress={handleLogout} color="red" />
    </View>
  );
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = {
    dark: isDarkMode,
    colors: {
      background: isDarkMode ? '#121212' : '#fff',
      onBackground: isDarkMode ? '#fff' : '#000',
      primary: isDarkMode ? '#bb86fc' : '#6200ee',
    },
  };

  return (
    <PaperProvider theme={theme}>
      <ProfileScreen />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    backgroundColor: '#ccc',
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  label: {
    fontSize: 16,
  },
});
 */