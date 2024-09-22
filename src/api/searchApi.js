const API_KEY = process.env.REACT_APP_SEARCH_API_KEY // Replace with your actual API key

export const fetchLocationSuggestions = async (text) => {
  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(text)}&apiKey=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    throw error;
  }
};