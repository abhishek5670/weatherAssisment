import { useState, useCallback } from 'react';

const celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;
const fahrenheitToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;

export const useTemperatureUnit = () => {
  const [isCelsius, setIsCelsius] = useState(true);

  const toggleTemperatureUnit = useCallback(() => {
    setIsCelsius((prev) => !prev);
  }, []);

  const convertTemperature = useCallback((temp) => {
    if (typeof temp === 'number') {
      return isCelsius ? temp : celsiusToFahrenheit(temp);
    }
    if (temp && typeof temp === 'object' && 'max' in temp && 'min' in temp) {
      return {
        max: isCelsius ? temp.max : celsiusToFahrenheit(temp.max),
        min: isCelsius ? temp.min : celsiusToFahrenheit(temp.min),
      };
    }
    return temp;
  }, [isCelsius]);

  const getTemperatureSymbol = useCallback(() => {
    return isCelsius ? '°C' : '°F';
  }, [isCelsius]);

  return {
    isCelsius,
    toggleTemperatureUnit,
    convertTemperature,
    getTemperatureSymbol,
  };
};

export const roundTemperature = (temp) => {
  if (typeof temp === 'number') {
    return Math.round(temp * 10) / 10;
  }
  if (temp && typeof temp === 'object' && 'max' in temp && 'min' in temp) {
    return {
      max: Math.round(temp.max * 10) / 10,
      min: Math.round(temp.min * 10) / 10,
    };
  }
  return temp;
};