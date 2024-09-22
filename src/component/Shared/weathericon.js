export const getWeatherIcon = (condition, isDay) => {
    const lowerCondition = condition.toLowerCase();
  
    if (lowerCondition.includes('thunder')) {
      if (lowerCondition.includes('snow')) {
        return isDay ? 'day_snow_thunder' : 'night_half_moon_snow_thunder';
      }
      return isDay ? 'day_rain_thunder' : 'night_full_moon_rain_thunder';
    }
    
    if (lowerCondition.includes('rain')) {
      return isDay ? 'day_rain' : 'night_half_moon_rain';
    }
    
    if (lowerCondition.includes('snow')) {
      return isDay ? 'day_snow' : 'night_full_moon_snow';
    }
    
    if (lowerCondition.includes('sleet')) {
      return isDay ? 'day_sleet' : 'night_full_moon_sleet';
    }
    
    if (lowerCondition.includes('cloud')) {
      return isDay ? 'cloudy' : 'night_half_moon_partial_cloud';
    }
    
    if (lowerCondition.includes('clear') || lowerCondition.includes('sunny')) {
      return isDay ? 'day_clear' : 'night_half_moon_clear';
    }
    
    if (lowerCondition.includes('overcast')) return 'overcast';
    if (lowerCondition.includes('fog')) return 'fog';
    if (lowerCondition.includes('mist')) return 'mist';
    if (lowerCondition.includes('tornado')) return 'tornado';
    if (lowerCondition.includes('wind')) return 'wind';
    
    // Default icon if no condition matches
    return isDay?'day_clear':'night_full_moon_clear';
  };