import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useContext, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CreateTripContext } from "./../../constants/context/CreateTripContext";
import { chatSession } from "../../configs/AiModel";
import { useTheme } from "../../constants/context/ThemeContext";

export default function AlternativeTrips() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { tripData, setTripData } = useContext(CreateTripContext);
  const navigation = useNavigation();
  const [alternatives, setAlternatives] = useState([]);
  const [loading, setLoading] = useState(true);
