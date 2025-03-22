const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
 
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: " Generate Travel Plan for location :Faisalabad, Pakistan,for 3 Days and 2 Night for Family with a Luxury budget with a Flight Details, Flight Price with Booking urls, hotels options list with geo coordinates, rating, descriptions and places to visit nearby with placeName, Place Details, Place Image url, Geo Coordinates, ticket Pricing, Time to Travel each of \nthe location for 3 days and 2 night with each day plan with best time to visit in JSON format."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"tripDetails\": {\n    \"location\": \"Faisalabad, Pakistan\",\n    \"duration\": \"3 Days, 2 Nights\",\n    \"budget\": \"Luxury\",\n    \"travelers\": \"Family\",\n    \"travelDates\": \"Please specify desired travel dates\",\n    \"notes\": \"This itinerary is a suggestion. Prices are estimates.\",\n    \"currency\": \"PKR\"\n  },\n  \"flightDetails\": {\n    \"flights\": [\n      {\n        \"flightNumber\": \"Search Airline Websites\",\n        \"airline\": \"PIA, Airblue, SereneAir\",\n        \"departureCity\": \"Your Departure City\",\n        \"arrivalCity\": \"Faisalabad (LYP)\",\n        \"estimatedPrice\": \"PKR 30,000 - 80,000 per person (round trip)\",\n        \"bookingURL\": \"https://www.piac.com.pk/, https://www.airblue.com/, https://www.flysereneair.com/\",\n        \"notes\": \"Prices vary. Book in advance.\"\n      }\n    ]\n  },\n  \"hotelOptions\": [\n    {\n      \"hotelName\": \"Serena Hotel Faisalabad\",\n      \"geoCoordinates\": {\n        \"latitude\": 31.4185,\n        \"longitude\": 73.0723\n      },\n      \"rating\": 4.5,\n      \"description\": \"Luxury hotel with excellent service, comfortable rooms, pool, and spa.\",\n      \"estimatedPricePerNight\": \"PKR 25,000 - 45,000\",\n      \"amenities\": [\"Pool\", \"Spa\", \"Restaurant\", \"Fitness Center\", \"Free WiFi\"],\n      \"bookingURL\": \"https://www.serenahotels.com/faisalabad\",\n      \"images\": [\"URL to Serena Hotel image\"]\n    },\n    {\n      \"hotelName\": \"The Grand Atrium\",\n      \"geoCoordinates\": {\n        \"latitude\": 31.4259,\n        \"longitude\": 73.0726\n      },\n      \"rating\": 4.0,\n      \"description\": \"Modern hotel with well-appointed rooms and multiple dining options.\",\n      \"estimatedPricePerNight\": \"PKR 18,000 - 35,000\",\n      \"amenities\": [\"Restaurant\", \"Fitness Center\", \"Free WiFi\"],\n      \"bookingURL\": \"N/A - Check Booking.com/Agoda\",\n      \"images\": [\"URL to Grand Atrium image\"]\n    },\n    {\n      \"hotelName\": \"Hotel One Faisalabad\",\n      \"geoCoordinates\": {\n        \"latitude\": 31.4336,\n        \"longitude\": 73.0818\n      },\n      \"rating\": 3.5,\n      \"description\": \"Comfortable and modern hotel with a convenient location.\",\n      \"estimatedPricePerNight\": \"PKR 12,000 - 25,000\",\n      \"amenities\": [\"Restaurant\", \"Free WiFi\", \"Parking\"],\n      \"bookingURL\": \"https://www.hotelone.com.pk/\",\n      \"images\": [\"URL to Hotel One Faisalabad image\"]\n    }\n  ],\n  \"dailyItinerary\": {\n    \"day1\": {\n      \"theme\": \"Arrival and City Exploration\",\n      \"schedule\": [\n        {\n          \"time\": \"Morning\",\n          \"activity\": \"Arrival and transfer to hotel.\",\n          \"details\": \"Arrange private transfer.\",\n          \"duration\": \"2-3 hours\"\n        },\n        {\n          \"time\": \"Afternoon\",\n          \"activity\": \"Visit Faisalabad Clock Tower and bazaars.\",\n          \"placeName\": \"Faisalabad Clock Tower\",\n          \"placeDetails\": \"Historical landmark surrounded by eight bazaars.\",\n          \"placeImageURL\": \"URL to Clock Tower Image\",\n          \"geoCoordinates\": {\n            \"latitude\": 31.4167,\n            \"longitude\": 73.0733\n          },\n          \"ticketPricing\": \"Free\",\n          \"travelTimeFromHotel\": \"5-15 minutes\",\n          \"bestTimeToVisit\": \"Late afternoon\"\n        },\n        {\n          \"time\": \"Evening\",\n          \"activity\": \"Dinner at Bundu Khan Restaurant.\",\n          \"placeName\": \"Bundu Khan Restaurant\",\n          \"placeDetails\": \"Traditional Pakistani cuisine.\",\n          \"placeImageURL\": \"URL to Bundu Khan Restaurant Image\",\n          \"geoCoordinates\": {\n            \"latitude\": 31.43,\n            \"longitude\": 73.06\n          },\n          \"ticketPricing\": \"PKR 1500-3000 per person\",\n          \"travelTimeFromClockTower\": \"10-20 minutes\",\n          \"bestTimeToVisit\": \"Evening\"\n        }\n      ]\n    },\n    \"day2\": {\n      \"theme\": \"History and Relaxation\",\n      \"schedule\": [\n        {\n          \"time\": \"Morning\",\n          \"activity\": \"Visit Lyallpur Museum.\",\n          \"placeName\": \"Lyallpur Museum\",\n          \"placeDetails\": \"History and culture of Faisalabad.\",\n          \"placeImageURL\": \"URL to Lyallpur Museum Image\",\n          \"geoCoordinates\": {\n            \"latitude\": 31.4266,\n            \"longitude\": 73.0866\n          },\n          \"ticketPricing\": \"PKR 50-100 per person\",\n          \"travelTimeFromHotel\": \"10-20 minutes\",\n          \"bestTimeToVisit\": \"Morning\"\n        },\n        {\n          \"time\": \"Afternoon\",\n          \"activity\": \"Relax at hotel (pool, spa).\",\n          \"placeName\": \"Hotel Amenities\",\n          \"placeDetails\": \"Enjoy hotel facilities.\",\n          \"placeImageURL\": \"URL to Hotel Pool/Spa\",\n          \"geoCoordinates\": \"Same as Hotel\",\n          \"ticketPricing\": \"Included in hotel stay\",\n          \"travelTimeFromLyallpurMuseum\": \"10-20 minutes\",\n          \"bestTimeToVisit\": \"Afternoon\"\n        },\n        {\n          \"time\": \"Evening\",\n          \"activity\": \"Shopping at Emporium Mall.\",\n          \"placeName\": \"Emporium Mall\",\n          \"placeDetails\": \"Shopping and entertainment.\",\n          \"placeImageURL\": \"URL to Emporium Mall Image\",\n          \"geoCoordinates\": {\n            \"latitude\": 31.3833,\n            \"longitude\": 73.05\n          },\n          \"ticketPricing\": \"Free entry\",\n          \"travelTimeFromHotel\": \"20-30 minutes\",\n          \"bestTimeToVisit\": \"Evening\"\n        }\n      ]\n    },\n    \"day3\": {\n      \"theme\": \"Agriculture and Departure\",\n      \"schedule\": [\n        {\n          \"time\": \"Morning\",\n          \"activity\": \"Visit University of Agriculture Faisalabad (Optional).\",\n          \"placeName\": \"University of Agriculture\",\n          \"placeDetails\": \"Explore the campus (check visitor access).\",\n          \"placeImageURL\": \"URL to Agriculture University Image\",\n          \"geoCoordinates\": {\n            \"latitude\": 31.4333,\n            \"longitude\": 73.0666\n          },\n          \"ticketPricing\": \"Check beforehand\",\n          \"travelTimeFromHotel\": \"10-20 minutes\",\n          \"bestTimeToVisit\": \"Morning\"\n        },\n        {\n          \"time\": \"Afternoon\",\n          \"activity\": \"Lunch and souvenir shopping.\",\n          \"placeName\": \"Local Restaurant\",\n          \"placeDetails\": \"Sample local delicacies.\",\n          \"placeImageURL\": \"N/A\",\n          \"geoCoordinates\": \"Varies\",\n          \"ticketPricing\": \"PKR 1000-2000 per person\",\n          \"travelTimeFromUniversity\": \"15-30 minutes\",\n          \"bestTimeToVisit\": \"Afternoon\"\n        },\n        {\n          \"time\": \"Evening\",\n          \"activity\": \"Transfer to Faisalabad International Airport (LYP).\",\n          \"details\": \"Allow ample time for check-in.\",\n          \"duration\": \"2-3 hours\"\n        }\n      ]\n    }\n  },\n  \"importantNotes\": [\n    \"Negotiate prices.\",\n    \"Dress modestly.\",\n    \"Stay hydrated.\",\n    \"Be aware of surroundings.\",\n    \"Bargaining is common.\",\n    \"Respect local customs.\"\n  ]\n}\n```\n"},
          ],
        
        },
      ],
    });
  
    //const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    //console.log(result.response.text());
  
  
  