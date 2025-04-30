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

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    fetchAlternatives();
  }, []);

  const fetchAlternatives = async () => {
    try {
      setLoading(true);

      // Prompt to get alternative trips based on the user's selection
      const ALTERNATIVE_PROMPT = `Based on the selected trip to ${tripData?.locationInfo?.name} for ${tripData?.totalNoOfDays} days with a ${tripData?.budget} budget for ${tripData?.traveler?.title},
       suggest 3 alternative destinations that would offer:
      
      1. Similar experiences but at a lower cost
      2. Better value or luxury options for the same budget
      3. Longer possible stay duration for the same budget
      
      For each alternative, provide:
      - Destination name
      - Number of possible days
      - Budget category (basic, moderate, luxury)
      - Main attraction or benefit
      - A brief description of why it's a good alternative
      - Estimated cost comparison (% cheaper or same cost but more value)
      
      Format the response as JSON with this structure:
{
  "alternatives": [
    {
      "destination": "destination name",
      "days": number of days (integer),
      "budgetCategory": "budget category (basic/moderate/luxury)",
      "mainAttraction": "main attraction",
      "description": "brief description",
      "costComparison": "cost comparison text"
    },
    ...
  ]
}`;

      const result = await chatSession.sendMessage(ALTERNATIVE_PROMPT);

      if (result.response) {
        const responseText = await result.response.text();

        try {
          const alternativesData = JSON.parse(responseText.trim());
          setAlternatives(alternativesData.alternatives || []);
        } catch (error) {
          console.error("JSON Parsing Error:", error.message);
          // Fallback to sample data if parsing fails
          setAlternatives(getSampleAlternatives());
        }
      }
    } catch (error) {
      console.error("Error fetching alternatives:", error);
      // Fallback to sample data on error
      setAlternatives(getSampleAlternatives());
    } finally {
      setLoading(false);
    }
  };

  // Sample alternatives in case API fails
  const getSampleAlternatives = () => {
    return [
      {
        destination: "Thailand",
        days: tripData?.totalNoOfDays + 2,
        budgetCategory: "moderate",
        mainAttraction: "Tropical Beaches",
        description:
          "Enjoy beautiful beaches and rich culture for less than your original budget",
        costComparison: "20% cheaper",
      },
      {
        destination: "Vietnam",
        days: tripData?.totalNoOfDays + 4,
        budgetCategory: tripData?.budget === "basic" ? "moderate" : "luxury",
        mainAttraction: "Cultural Experience",
        description:
          "Get more luxury amenities while experiencing amazing food and culture",
        costComparison: "Same budget, higher category",
      },
      {
        destination: "Portugal",
        days: tripData?.totalNoOfDays,
        budgetCategory: tripData?.budget,
        mainAttraction: "European Charm",
        description:
          "Similar experience to your original destination but more affordable",
        costComparison: "15% cheaper",
      },
    ];
  };

  const selectAlternative = (alternative) => {
    // Update the trip data with the selected alternative
    setTripData({
      ...tripData,
      alternativeSelected: true,
      originalDestination: tripData?.locationInfo?.name,
      locationInfo: {
        ...tripData.locationInfo,
        name: alternative.destination,
      },
      totalNoOfDays: alternative.days,
      budget: alternative.budgetCategory,
    });

    // Navigate to generate trip
    router.push("/create-trip/generate-trip");
  };

  const continueWithOriginal = () => {
    router.push("/create-trip/generate-trip");
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 40,
        backgroundColor: isDark ? "#121212" : "#FAFAFA",
        height: "100%",
      }}
    >
      <TouchableOpacity
        onPress={() => router.push("/create-trip/review-trip")}
        style={{ padding: 10 }}
      >
        <Ionicons
          name="arrow-back"
          size={28}
          color={isDark ? "#fff" : "#000"}
        />
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 35,
          fontFamily: "outfit-bold",
          marginTop: 5,
          color: isDark ? "#fff" : "#000",
        }}
      >
        Alternative Options
      </Text>

      <Text
        style={{
          fontSize: 18,
          fontFamily: "outfit-medium",
          marginTop: 10,
          marginBottom: 20,
          color: isDark ? "lightgrey" : "grey",
        }}
      >
        Check out these alternative trips that might offer better value for your
        budget
      </Text>

      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={isDark ? "#fff" : "#000"} />
          <Text
            style={{
              marginTop: 20,
              fontFamily: "outfit-medium",
              color: isDark ? "#fff" : "#000",
            }}
          >
            Finding alternatives...
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={alternatives}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => selectAlternative(item)}
                style={{
                  backgroundColor: isDark ? "#1e1e1e" : "#fff",
                  borderRadius: 15,
                  padding: 20,
                  marginBottom: 15,
                  borderWidth: 1,
                  borderColor: isDark ? "#333" : "#eee",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                  elevation: 2,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 22,
                      fontFamily: "outfit-bold",
                      color: isDark ? "#fff" : "#000",
                    }}
                  >
                    {item.destination}
                  </Text>
                </View>

                <View style={{ marginTop: 10 }}>
                  <View
                    style={{ flexDirection: "row", gap: 10, marginBottom: 8 }}
                  >
                    <View
                      style={{
                        backgroundColor: isDark ? "#2d2d2d" : "#f5f5f5",
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 8,
                      }}
                    >
                      <Text
                        style={{
                          color: isDark ? "#fff" : "#000",
                          fontFamily: "outfit-medium",
                        }}
                      >
                        {item.days} days
                      </Text>
                    </View>
                    {/* Budget Category Tag */}
                    <View
                      style={{
                        backgroundColor: isDark ? "#2d2d2d" : "#f5f5f5",
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 8,
                      }}
                    >
                      <Text
                        style={{
                          color: isDark ? "#fff" : "#000",
                          fontFamily: "outfit-medium",
                        }}
                      >
                        {item.budgetCategory}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: isDark ? "#2d2d2d" : "#f5f5f5",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 8,
                      marginRight: 10,
                      alignSelf: "flex-start",
                    }}
                  >
                    <Text
                      style={{
                        color: isDark ? "#fff" : "#000",
                        fontFamily: "outfit-medium",
                      }}
                    >
                      {item.costComparison}
                    </Text>
                  </View>
                </View>

                <Text
                  style={{
                    fontFamily: "outfit-medium",
                    fontSize: 16,
                    marginTop: 10,
                    color: isDark ? "#ccc" : "#444",
                  }}
                >
                  {item.description}
                </Text>

                <Text
                  style={{
                    fontFamily: "outfit-bold",
                    fontSize: 16,
                    marginTop: 10,
                    color: isDark ? "#8ce3ff" : "#0078a5",
                  }}
                >
                  ✨ {item.mainAttraction}
                </Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity
            onPress={continueWithOriginal}
            style={{
              padding: 15,
              backgroundColor: isDark ? '#1e1e1e' : '#000',
              borderRadius: 15,
              marginTop: 10,
              borderWidth: 1,
              borderColor: isDark ? 'grey' : '#000',
            }}
          >
            <Text
              style={{
                color: 'white',
                textAlign: "center",
                fontSize: 18,
                fontFamily: "outfit-medium",
              }}
            >
              Continue with Original Trip
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
