const MAX_STORED_LOCATIONS = 6;

export const StoreWeather = (data) => {
  try {
    // Get existing data from localStorage
    let existingData = JSON.parse(localStorage.getItem('weatherStore') || '[]');

    // Check if data with the same location already exists
    const index = existingData.findIndex(item => 
      item.location.name === data.location.name &&
      item.location.region === data.location.region &&
      item.location.country === data.location.country
    );

    if (index !== -1) {
      // If exists, remove it from its current position
      existingData.splice(index, 1);
    } else if (existingData.length >= MAX_STORED_LOCATIONS) {
      // If we're at the limit, remove the oldest entry
      existingData.pop();
    }

    // Add the new or updated data to the beginning
    existingData.unshift(data);

    // Store updated array back to localStorage
    localStorage.setItem('weatherStore', JSON.stringify(existingData));
  } catch (error) {
    console.error('Error storing weather data:', error);
  }
};

export const FetchStoreWeather = () => {
  try {
    const storedData = localStorage.getItem('weatherStore');
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error('Error fetching stored weather data:', error);
    return [];
  }
};