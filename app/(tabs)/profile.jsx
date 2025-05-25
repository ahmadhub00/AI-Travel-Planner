import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image,Alert, ScrollView, Platform, ToastAndroid} from 'react-native';
import React, { useEffect, useState } from 'react';
import { getAuth, signOut, updateEmail, updatePassword } from 'firebase/auth';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
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
const [currentPassword, setCurrentPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
      Alert.alert( message);
    }
  };
const onUpdateProfile = async () => {
  try {
    if (!currentPassword) {
      return showToast('⚠️ Please enter your current password to continue');
    }

    // Reauthenticate the user
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);

    let changesMade = false;

    // Update Email
    if (email && email !== user.email) {
      if (email.length < 11 || email.length > 320) {
        return showToast('❗Email must be between 11 and 320 characters');
      }
      await updateEmail(user, email);
      showToast('✅ Email updated successfully');
      changesMade = true;
    }

    // Update Password
    if (password) {
      if (password.length < 6 || password.length > 128) {
        return showToast('❗Password must be 6–128 characters');
      }

      if (password !== confirmPassword) {
        return showToast('❗Passwords do not match');
      }

      await updatePassword(user, password);
      showToast('✅ Password updated successfully');
      changesMade = true;
    }

    if (!changesMade) {
      showToast('No changes to update');
    }

    // Reset current password input
    setCurrentPassword('');
    setPassword('');
    setConfirmPassword('');
  } catch (err) {
    console.error('Update error:', err?.message || err);
    if (err.code === 'auth/wrong-password') {
      showToast('❌ Incorrect current password');
    } else {
      showToast(err.message || 'Something went wrong');
    }
  }
};

 /*  const onUpdateProfile = async () => {
    try {
      if (email && email !== user.email) {
        await updateEmail(user, email);
        showToast('✅ Email updated successfully');
      }
      if (email.length < 11 || email.length > 320) {
        showToast('Email must be between 11 and 320 characters.');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('Enter a valid email address.');
        return;
      }

      if (password.length > 0 && password.length < 6) {
        showToast('Password must be at least 6 characters.');
        return;
      }

      if (password.length > 128) {
        showToast('Password must not exceed 128 characters.');
        return;
      }

      if (email && email !== user.email) {
        await updateEmail(user, email);
        showToast('✅ Email updated successfully');
      }

      if (password && password.length >= 6 && password.length <= 128) {
        await updatePassword(user, password);
        showToast('✅ Password updated successfully');
      }
    } catch (err) {
       console.error('Error:', err?.message || err); 
      if (err.code === 'auth/operation-not-allowed') {
        showToast('⚠️ Email update not allowed. Please verify your account.');
      } else if (err.code === 'auth/requires-recent-login') {
        showToast('Please log in again to update your profile.');
        router.push('/auth/sign-in');
      } else {
        showToast(err.message || 'Something went wrong');
      }
    }
  }; */

  return (
    <ScrollView style={styles.container(isDark)}>
      <View style={styles.themeToggleContainer}>
        <TouchableOpacity onPress={toggleTheme}>
          <Ionicons
            name={isDark ? 'sunny-outline' : 'moon-outline'}
            size={35}
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
          <Text style={[styles.changePhotoText, {color: isDark ? 'white' : 'black',
        }]}>Edit</Text>
          
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

      <Text style={[styles.label, { color: isDark ? 'white' : 'black' }]}>Current Password</Text>
<TextInput
  style={[styles.input, { backgroundColor: isDark ? '#1e1e1e' : 'white', color: isDark ? 'white' : 'black' }]}
  value={currentPassword}
  secureTextEntry
  onChangeText={setCurrentPassword}
  placeholder="Enter current password"
  placeholderTextColor={isDark ? '#ccc' : '#888'}
/>

<Text style={[styles.label, { color: isDark ? 'white' : 'black' }]}>Confirm New Password</Text>
<TextInput
  style={[styles.input, { backgroundColor: isDark ? '#1e1e1e' : 'white', color: isDark ? 'white' : 'black' }]}
  value={confirmPassword}
  secureTextEntry
  onChangeText={setConfirmPassword}
  placeholder="Confirm new password"
  placeholderTextColor={isDark ? '#ccc' : '#888'}
/>


      <TouchableOpacity style={[styles.saveBtn, { borderColor: isDark ? 'grey' : 'black' }]} onPress={onUpdateProfile}>
     
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity
  style={[styles.logoutBtn, { borderColor: isDark ? 'grey' : 'black' }]}
  onPress={async () => {
    try {
      await signOut(auth);
      showToast('👋 Logged out');
      router.push('/auth/sign-in'); 
    } catch (error) {
      showToast('❌ Logout failed');
      console.error(error);
    }}}>
  <Text style={styles.logoutText}>Log Out</Text>
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
    paddingTop: 30,
  },
  profileContainer: { alignItems: 'center', marginTop: 20 },
  profileImage:(isDark) => ({
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: isDark ? 'grey' : 'white',
    /* marginBottom: 1, */
  }),
  changePhotoText: {
    fontSize: 14,
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    fontFamily: 'outfit-medium',
    paddingHorizontal: 10,
    paddingVertical: 4,
   /*  backgroundColor: 'black',
    color: 'white',
    borderRadius: 10, */
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
  logoutBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    width: '100%',
    alignSelf: 'center',
    
  },
  logoutText: {
    color: 'red',
    textAlign: 'center',
    fontFamily: 'outfit',
    fontSize: 16,
  },
});














