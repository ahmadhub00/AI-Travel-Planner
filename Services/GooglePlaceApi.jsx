
  export const GetPhotoRef = async (placeName) => {
    try {
      // Properly encode the placeName to handle spaces and special characters
      const encodedPlaceName = encodeURIComponent(placeName);
      
      // Construct the URL with proper encoding
      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodedPlaceName}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`;
      
      // Make the API request
      const response = await fetch(url);
      
      // Check if the response is ok
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      // Parse the JSON response
      const result = await response.json();
      
      // Log the result for debugging
      //console.log('Google Places API result:', result);
      
      // Check if the result has the expected structure
      if (!result || !result.results || result.results.length === 0) {
        console.warn('No results found for place:', placeName);
        return null;
      }
      
      // Return the full result object
      return result;
    } catch (error) {
      console.error('Error fetching place data:', error);
      throw error;
    }
  };