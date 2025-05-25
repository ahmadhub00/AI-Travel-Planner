import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../configs/FirebaseConfig";

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const showAlert = (message) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.LONG);
    } else {
      Alert.alert("Validation Error", message);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onSignIn = () => {
    if (!email || !password || email.trim() === "" || password.trim() === "") {
      showAlert("Please Enter All Details");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      showAlert("Please enter a valid email address");
      return;
    }

    // Trim whitespace from inputs
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        router.replace("/mytrip");
        //console.log(user);
      })
      .catch((error) => {
        console.log("Firebase Error Code:", error.code);
        console.log("Firebase Error Message:", error.message);

        let message = "Something went wrong";

        switch (error.code) {
          case "auth/user-not-found":
          case "auth/wrong-password":
          case "auth/invalid-credential":
          case "auth/invalid-credentials":
            message =
              "Invalid email or password. Please check your credentials.";
            break;
          case "auth/invalid-email":
            message = "Invalid email format";
            break;
          case "auth/user-disabled":
            message = "This account has been disabled";
            break;
          case "auth/too-many-requests":
            message = "Too many failed attempts. Try again later.";
            break;
          default:
            message = "Login failed. Please try again.";
        }
        showAlert(message);
      });
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{
        padding: 25,
        paddingTop: 40,
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <View>
        <TouchableOpacity
          onPress={() => router.replace("Login")}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
          marginTop: 10,
        }}
      >
        {" "}
        Let's Sign You In
      </Text>

      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 30,
          color: "grey",
          marginTop: 20,
        }}
      >
        Welcome Back
      </Text>

      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 20,
          color: "grey",
          marginTop: 20,
        }}
      >
        You've been missed
      </Text>

      {/*Email*/}
      <View
        style={{
          marginTop: 30,
        }}
      >
        <Text style={{ fontFamily: "outfit" }}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter Email"
          placeholderTextColor="lightgrey"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="emailAddress"
        />
      </View>

      {/*Password*/}
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit",
          }}
        >
          Password
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "grey",
            borderRadius: 15,
            paddingHorizontal: 10,
          }}
        >
          <TextInput
            style={{
              flex: 1,
              padding: 15,
              fontFamily: "outfit",
              color: "black",
            }}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter Your Password"
            placeholderTextColor="lightgrey"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="grey"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/*Sign In Button*/}
      <TouchableOpacity
        onPress={onSignIn}
        style={{
          padding: 20,
          backgroundColor: "black",
          borderRadius: 15,
          marginTop: 50,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
          }}
        >
          Sign In
        </Text>
      </TouchableOpacity>

      {/*Create Account Button*/}
      <TouchableOpacity
        onPress={() => router.replace("auth/sign-up")}
        style={{
          padding: 20,
          backgroundColor: "white",
          borderRadius: 15,
          marginTop: 20,
          borderWidth: 1,
        }}
      >
        <Text
          style={{
            color: "black",
            textAlign: "center",
          }}
        >
          Create Account
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "grey",
    fontFamily: "outfit",
    color: "black",
  },
});
