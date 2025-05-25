import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Platform,
  ToastAndroid,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getAuth, signOut, updateEmail, updatePassword } from "firebase/auth";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useTheme } from "../../constants/context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UserProfile() {
  const router = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;

  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const loadImage = async () => {
      try {
        const savedUri = await AsyncStorage.getItem("profileImageUri");
        if (savedUri) setImageUri(savedUri);
      } catch (error) {
        console.error("Failed to load profile image:", error);
      }
    };
    loadImage();
  }, []);
  // Request image picker permissions
  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Please grant camera roll permissions inside settings"
        );
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setImageUri(uri);
        await AsyncStorage.setItem("profileImageUri", uri);
        showToast("✅ Profile picture updated");
      }
    } catch (error) {
      console.error("Image picker error:", error);
      showToast("❌ Failed to select image");
    }
  };

  const showToast = (message) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert("Notification",message);
    }
  };

  const onUpdateProfile = async () => {
    try {
      if (!currentPassword) {
        return showToast("⚠️ Please enter your current password to continue");
      }

      // Reauthenticate the user
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      let changesMade = false;

      // Update Email
      if (email && email !== user.email) {
        if (!emailRegex.test(email)) {
          return showToast("❗ Please enter a valid email address");
        }
        if (email.length < 11 || email.length > 320) {
          return showToast("❗Email must be between 11 and 320 characters");
        }
        await updateEmail(user, email);
        showToast("✅ Email updated successfully");
        changesMade = true;
      }

      // Update Password
      if (password) {
        if (password.length < 6 || password.length > 128) {
          return showToast("❗Password must be 6–128 characters");
        }

        if (password !== confirmPassword) {
          return showToast("❗Passwords do not match");
        }

        await updatePassword(user, password);
        showToast("✅ Password updated successfully");
        changesMade = true;
      }

      if (!changesMade) {
        showToast("No changes to update");
      }

      // Reset current password input
      setCurrentPassword("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Update error:", err);
      
      let errorMessage = "Something went wrong";
      
      switch (err.code) {
        case "auth/wrong-password":
        case "auth/invalid-credential":
          errorMessage = "❌ Current password is incorrect";
          break;
        case "auth/email-already-in-use":
          errorMessage = "❌ This email is already in use";
          break;
        case "auth/weak-password":
          errorMessage = "❌ Password is too weak";
          break;
        case "auth/requires-recent-login":
          errorMessage = "❌ Please log out and log back in to make this change";
          break;
        case "auth/network-request-failed":
          errorMessage = "❌ Network error. Check your connection";
          break;
        default:
          errorMessage = err.message || "❌ Update failed";
      }
      showToast(errorMessage);
    }
  };

const handleLogout = async () => {
            try {
              await signOut(auth);
              showToast("👋 Logged out successfully");
              router.replace("/auth/sign-in");
              setShowLogoutModal(false);
            } catch (error) {
              showToast("❌ Logout failed");
              console.error(error);
            }
  };
  return (
    <ScrollView style={styles.container(isDark)}>
      {/* Dark mode button */}
      <View style={styles.themeToggleContainer}>
        <TouchableOpacity onPress={toggleTheme}>
          <Ionicons
            name={isDark ? "sunny-outline" : "moon-outline"}
            size={35}
            color={isDark ? "white" : "black"}
          />
        </TouchableOpacity>
      </View>
      {/* Profile Image */}
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{ uri: imageUri || "https://i.pravatar.cc/150?img=12" }}
            style={styles.profileImage(isDark)}
          />
          <Text
            style={[
              styles.changePhotoText,
              { color: isDark ? "white" : "black" },
            ]}
          >
            Edit
          </Text>
        </TouchableOpacity>
      </View>
      {/* Email */}
      <Text style={[styles.label, { color: isDark ? "white" : "black" }]}>
        Email
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#1e1e1e" : "white",
            color: isDark ? "white" : "black",
          },
        ]}
        value={email}
        autoCapitalize="none"
         keyboardType="email-address"
        onChangeText={setEmail}
        placeholder="Enter your email"
        placeholderTextColor={isDark ? "#ccc" : "#888"}
      />

      {/* Current Password */}
      <Text style={[styles.label, { color: isDark ? "white" : "black" }]}>
        Current Password
      </Text>
      <View
        style={[
          styles.passwordContainer,
          { backgroundColor: isDark ? "#1e1e1e" : "white" },
        ]}
      >
        <TextInput
          style={[styles.passwordInput(isDark)]}
          value={currentPassword}
          secureTextEntry={!showCurrentPassword}
          onChangeText={setCurrentPassword}
          placeholder="Enter current password"
          placeholderTextColor={isDark ? "#ccc" : "#888"}
        />
        <TouchableOpacity
          onPress={() => setShowCurrentPassword(!showCurrentPassword)}
        >
          <Ionicons
            name={showCurrentPassword ? "eye-off" : "eye"}
            size={24}
            color={isDark ? "#ccc" : "black"}
          />
        </TouchableOpacity>
      </View>

      {/* new Password */}
      <Text style={[styles.label, { color: isDark ? "white" : "black" }]}>
        New Password
      </Text>
      <View
        style={[
          styles.passwordContainer,
          { backgroundColor: isDark ? "#1e1e1e" : "white" },
        ]}
      >
        <TextInput
          style={[styles.passwordInput(isDark)]}
          value={password}
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
          placeholder="Enter new password"
          placeholderTextColor={isDark ? "#ccc" : "#888"}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color={isDark ? "#ccc" : "black"}
          />
        </TouchableOpacity>
      </View>

      {/* Confirm new password */}
      <Text style={[styles.label, { color: isDark ? "white" : "black" }]}>
        Confirm New Password
      </Text>
      <View
        style={[
          styles.passwordContainer,
          { backgroundColor: isDark ? "#1e1e1e" : "white" },
        ]}
      >
        <TextInput
          style={[styles.passwordInput(isDark)]}
          value={confirmPassword}
          secureTextEntry={!showConfirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm new password"
          placeholderTextColor={isDark ? "#ccc" : "#888"}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Ionicons
            name={showConfirmPassword ? "eye-off" : "eye"}
            size={24}
            color={isDark ? "#ccc" : "black"}
          />
        </TouchableOpacity>
      </View>
      {/* Save Button */}
      <TouchableOpacity
        style={[styles.saveBtn, { borderColor: isDark ? "grey" : "black" }]}
        onPress={onUpdateProfile}
      >
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.logoutBtn, { borderColor: isDark ? "grey" : "black" }]}
        onPress={() => setShowLogoutModal(true)}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      {/* Logout Modal */}
      <Modal
        visible={showLogoutModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={{
            ...styles.modalContent,
            backgroundColor: isDark ? '#1E1E1E' : 'white',
          }}>
            <Text style={{
              ...styles.modalTitle,
              color: isDark ? '#FFFFFF' : 'black',
            }}>Confirm Logout</Text>
            <Text style={{
              ...styles.modalText,
              color: isDark ? '#BBBBBB' : '#555',
            }}>
              Are you sure you want to log out?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={{
                  ...styles.modalButton,
                  ...styles.cancelModalButton,
                  backgroundColor: isDark ? '#333333' : '#F2F2F2',
                }}
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={{
                  ...styles.cancelButtonText,
                  color: isDark ? '#FFFFFF' : 'black',
                }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmModalButton]}
                onPress={handleLogout}
              >
                <Text style={styles.confirmButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: (isDark) => ({
    backgroundColor: isDark ? "#121212" : "white",
    padding: 20,
    flex: 1,
  }),
  themeToggleContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingBottom: 5,
    paddingRight: 10,
    paddingTop: 20,
  },
  profileContainer: { alignItems: "center", marginTop: 10 },
  profileImage: (isDark) => ({
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: isDark ? "grey" : "white",
    /* marginBottom: 1, */
  }),
  changePhotoText: {
    fontSize: 14,
    textAlign: "center",
    alignSelf: "center",
    marginBottom: 10,
    fontFamily: "outfit-medium",
    paddingHorizontal: 10,
    paddingVertical: 4,
    /*  backgroundColor: 'black',
    color: 'white',
    borderRadius: 10, */
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontFamily: "outfit-medium",
    marginBottom: 5,
    marginTop: 5,
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    fontFamily: "outfit",
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "grey",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  passwordInput: (isDark) => ({
    flex: 1,
    padding: 15,
    color: isDark ? "white" : "black",
    backgroundColor: isDark ? "#1e1e1e" : "white",
    fontFamily: "outfit",
  }),
  saveBtn: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: "100%",
    borderWidth: 1,
  },
  saveText: {
    color: "white",
    textAlign: "center",
    fontFamily: "outfit-medium",
    fontSize: 16,
  },
  logoutBtn: {
    backgroundColor: "transparent",
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    width: "100%",
    alignSelf: "center",
  },
  logoutText: {
    color: "red",
    textAlign: "center",
    fontFamily: "outfit",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: "outfit-medium",
  },
  modalText: {
    marginBottom: 25,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "outfit",
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    minWidth: 80,
    flex: 1,
    marginHorizontal: 5,
  },
  cancelModalButton: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  confirmModalButton: {
    backgroundColor: '#FF4444',
  },
  cancelButtonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: "outfit-medium",
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: "outfit-medium",
  },
});
