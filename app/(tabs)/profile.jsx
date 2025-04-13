import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image,Alert, ScrollView, Platform, ToastAndroid} from 'react-native';
import React, { useEffect, useState } from 'react';
import { getAuth, updateEmail, updatePassword } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../constants/context/ThemeContext'; 

export default function UserProfile() {
  const router = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;

  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please grant camera roll permissions inside settings');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [ImagePicker.MediaType.IMAGE],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const showToast = (message) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('Notice', message);
    }
  };

  const onUpdateProfile = async () => {
    try {
      if (email && email !== user.email) {
        await updateEmail(user, email);
        showToast('✅ Email updated successfully');
      }

      if (password && password.length >= 6) {
        await updatePassword(user, password);
        showToast('✅ Password updated successfully');
      } else if (password && password.length < 6) {
        showToast('❗Password must be at least 6 characters');
      }

      if ((!email || email === user.email) && password.length < 6) {
        showToast('No changes to update');
      }
    } catch (err) {
      console.error('Error:', err?.message || err);
      if (err.code === 'auth/operation-not-allowed') {
        showToast('⚠️ Email update not allowed. Please verify your account.');
      } else {
        showToast(err.message || 'Something went wrong');
      }
    }
  };

  return (
    <ScrollView style={styles.container(isDarkMode)}>
      <View style={styles.themeToggleContainer}>
        <TouchableOpacity onPress={toggleTheme}>
          <Ionicons
            name={isDarkMode ? 'sunny-outline' : 'moon-outline'}
            size={30}
            color={isDarkMode ? 'white' : 'black'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{ uri: imageUri || 'https://i.pravatar.cc/150?img=12' }}
            style={styles.profileImage}
          />
          <Text style={styles.changePhotoText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.label, { color: isDarkMode ? 'white' : 'black' }]}>Email</Text>
      <TextInput
        style={[styles.input, {
          backgroundColor: isDarkMode ? '#1e1e1e' : 'white',
          color: isDarkMode ? 'white' : 'black',
        }]}
        value={email}
        autoCapitalize="none"
        onChangeText={setEmail}
        placeholder="Enter your email"
        placeholderTextColor={isDarkMode ? '#ccc' : '#888'}
      />

      <Text style={[styles.label, { color: isDarkMode ? 'white' : 'black' }]}>New Password</Text>
      <TextInput
        style={[styles.input, {
          backgroundColor: isDarkMode ? '#1e1e1e' : 'white',
          color: isDarkMode ? 'white' : 'black',
        }]}
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        placeholder="Enter new password"
        placeholderTextColor={isDarkMode ? '#ccc' : '#888'}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={onUpdateProfile}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: (isDark) => ({
    backgroundColor: isDark ? '#121212' : 'white',
    padding: 20,
    flex: 1,
  }),
  themeToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    paddingRight: 10,
    paddingTop: 20,
  },
  profileContainer: { alignItems: 'center', marginTop: 20 },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 5,
  },
  changePhotoText: {
    fontSize: 12,
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 2,
    fontFamily: 'outfit-medium',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: 'black',
    color: 'white',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontFamily: 'outfit-medium',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    fontFamily: 'outfit',
    marginBottom: 10,
  },
  saveBtn: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
  },
  saveText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'outfit-medium',
    fontSize: 16,
  },
});














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