import React from "react";
import {
  roundTemperature,
  useTemperatureUnit,
} from "../../Shared/TemperatureConvertor";

// Helper function to format time
const formatTime = (timeString) => {
  const date = new Date(timeString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

// Single hour weather box component
const HourlyWeatherBox = ({ hour }) => {
  const {
  
    toggleTemperatureUnit,
    convertTemperature,
    getTemperatureSymbol,
  } = useTemperatureUnit();
  
  return(
  <div className="flex flex-col min-w-[40vw] md:min-w-[10vw] items-center border border-gray-200 p-4 m-2 bg-[#f6f6f6] rounded-lg shadow-lg ">
    <p className="font-bold">{formatTime(hour.time)}</p>
    <div className="text-xl mt-2 flex flex-row">
      <h2 className="">{roundTemperature(convertTemperature(hour?.temp_c))}</h2>
      <p className="text-base cursor-pointer" onClick={toggleTemperatureUnit}>
        {getTemperatureSymbol()}
      </p>
    </div>
    <img
      src={hour.condition.icon}
      alt={hour.condition.text}
      className="w-10 h-10 "
    />
    <p className="text-sm mt-2 text-secondary font-semibold">
      {hour.condition.text}
    </p>
  </div>
  
);
}

// Main component for hourly forecast
const HourlyForecast = ({ hourlyData }) => {
  // If hourlyData is null or undefined, show a loading state
  if (!hourlyData) {
    return <div className="text-center p-4">Loading forecast data...</div>;
  }

  // Filter data to show only future hours
  const currentTime = new Date().getTime() / 1000; // Current time in seconds
  const futureHours = hourlyData.filter(
    (hour) => hour.time_epoch > currentTime
  );

  // If there are no future hours (which shouldn't happen, but just in case), show a message
  // if (futureHours.length === 0) {
  //   return (
  //     <div className="text-center p-4">
  //       No forecast data available for upcoming hours.
  //     </div>
  //   );
  // }

  return (
    <div className="w-full  relative  ">
      {!futureHours.length === 0 && <p className="text-2xl text-bold align-middle w-full text-center">
        HOURLY FORECAST
      </p>}
      <div className="flex  overflow-x-auto no-scrollbar ">
        {futureHours.map((hour, index) => (
          <HourlyWeatherBox key={index} hour={hour} />
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
