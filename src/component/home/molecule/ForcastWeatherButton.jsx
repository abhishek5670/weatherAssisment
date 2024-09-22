import React, { useState } from 'react';
import WeatherDayButton from '../atom/weather_button';
import PreviousWeatherCard from '../atom/PreviousWheatherCard';

const WeatherForecastButtons = ({ forecastData, onDaySelect,previousShow =false}) => {
  const [selectedDay, setSelectedDay] = useState(0);

  const handleDayClick = (index) => {
    setSelectedDay(index);
    onDaySelect(forecastData[index]);
  };

  if (!forecastData || !Array.isArray(forecastData) || forecastData.length === 0) {
    return <div className="text-center p-4">No forecast data available</div>;
  }

  return (

    <div className="flex flex-wrap ">
      {previousShow ?forecastData.map((data, index) => (
        <PreviousWeatherCard
          key={index}
          location={data.location?.name}
          localTime={data.location?.localtime}
          temp={data.current?.temp_c}
          condition={data.current?.condition}
        />)):forecastData.map((day, index) => (
        <WeatherDayButton
          key={day.date}
          date={day.date}
          temp={{max:day?.day?.maxtemp_c,min:day?.day?.mintemp_c}}
          condition={day.day.condition}
          onClick={() => handleDayClick(index)}
          isSelected={selectedDay === index}
        />
      ))}
    </div>
  );
};

export default WeatherForecastButtons;