import React, { useEffect, useState } from "react";
import WeatherForecastButtons from "./molecule/ForcastWeatherButton";
import SearchBox from "../Shared/SearchBox";
import ShowFutureWeatherDetail from "./atom/ShowFutureWeatherDetail";
import { FetchStoreWeather } from "../../api/storeWheather";

const FutureWeather = ({ forecastData, onselectDate }) => {
  const [selectedDayForecast, setSelectedDayForecast] = useState(null);
  const [previousData, setPreviousData] = useState([]);
  useEffect(() => {
    // Auto-select the first day when forecastData changes or component mounts
    if (forecastData && forecastData.length > 0) {
      setSelectedDayForecast(forecastData[0]);
    }
    fetchStoredWheather();
  }, [forecastData]);

  const fetchStoredWheather = async () => {
    try {
      const response = await FetchStoreWeather();
      setPreviousData(response);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDaySelect = (dayForecast) => {
    setSelectedDayForecast(dayForecast);
  };

  const handleLocationSelect = (select) => {
    onselectDate(select);
  };

  return (
    <div className="md:p-10 p-5 bg-[#fafafa] h-full gap-y-10">
      <div className="md:p-4 max-md:hidden flex justify-center ">
        <SearchBox onSelectLocation={handleLocationSelect} />
      </div>
      <p></p>
      {selectedDayForecast && (
        <ShowFutureWeatherDetail selectedday={selectedDayForecast} />
        // <div className="mt-8 p-4 bg-white rounded-lg shadow">
        //   <h2 className="text-2xl font-semibold mb-4">Selected Day Forecast</h2>
        //   <p className="text-lg">Date: {selectedDayForecast.date}</p>
        //   <p className="text-lg">
        //     Max Temp: {selectedDayForecast.day.maxtemp_c}°C
        //   </p>
        //   <p className="text-lg">
        //     Min Temp: {selectedDayForecast.day.mintemp_c}°C
        //   </p>
        //   <p className="text-lg">
        //     Condition: {selectedDayForecast.day.condition.text}
        //   </p>
        //   {/* Add more detailed forecast information here */}
        // </div>
      )}

      <WeatherForecastButtons
        forecastData={forecastData}
        onDaySelect={handleDaySelect}
        previousShow={false}
      />
     {!previousData.length=== 0 && <div>
        <p className="text-2xl ">Recently Viwed</p>
        <WeatherForecastButtons
          forecastData={previousData}
          onDaySelect={handleDaySelect}
          previousShow={true}
        />
      </div>}
    </div>
  );
};

export default FutureWeather;
