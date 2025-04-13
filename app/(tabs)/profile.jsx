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
  const isDark = theme === 'dark';

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
    <ScrollView style={styles.container(isDark)}>
      <View style={styles.themeToggleContainer}>
        <TouchableOpacity onPress={toggleTheme}>
          <Ionicons
            name={isDark ? 'sunny-outline' : 'moon-outline'}
            size={30}
            color={isDark ? 'white' : 'black'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{ uri: imageUri || 'https://i.pravatar.cc/150?img=12' }}
            style={styles.profileImage(isDark)}
          />
          <Text style={styles.changePhotoText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.label, { color: isDark ? 'white' : 'black' }]}>Email</Text>
      <TextInput
        style={[styles.input, {
          backgroundColor: isDark ? '#1e1e1e' : 'white',
          color: isDark ? 'white' : 'black',
        }]}
        value={email}
        autoCapitalize="none"
        onChangeText={setEmail}
        placeholder="Enter your email"
        placeholderTextColor={isDark? '#ccc' : '#888'}
      />

      <Text style={[styles.label, { color: isDark ? 'white' : 'black' }]}>New Password</Text>
      <TextInput
        style={[styles.input, {
          backgroundColor: isDark ? '#1e1e1e' : 'white',
          color: isDark ? 'white' : 'black',
        }]}
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        placeholder="Enter new password"
        placeholderTextColor={isDark ? '#ccc' : '#888'}
      />

      <TouchableOpacity style={[styles.saveBtn, { borderColor: isDark ? 'grey' : 'black' }]} onPress={onUpdateProfile}>
     
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
  profileImage:(isDark) => ({
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: isDark ? 'grey' : 'white',
    marginBottom: 5,
  }),
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
    borderWidth: 1,
  },
  saveText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'outfit-medium',
    fontSize: 16,
  },
});














