import React, { useEffect, useState, useCallback } from "react";
import CurrentDayDetail from "../component/home/CurrentDayDetail";
//@ts-ignore
import FutureWeather from "../component/home/FutureWeather.jsx";
import { currentDay } from "../api/weatherApi.js";
import useCurrentLocation from "../api/currentLocation.js";
import LoadingScreen from "../component/Shared/LoadingScreen.jsx";
import PullToRefresh from "../component/Shared/Reload.jsx";
import { useNavigate } from "react-router-dom";
import { StoreWeather } from "../api/storeWheather.js";

const Home = () => {
  const navigation = useNavigate();
  const { location, errorApi } = useCurrentLocation();
  const [weatherDetail, setWeatherDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [place, setSelectPlace] = useState();
  const [error, setError] = useState(null);
  const [isLocationReady, setIsLocationReady] = useState(false);

  const fetchWeatherDetail = useCallback(async (selectedPlace = null) => {
    try {
      setIsLoading(true);
      let queryLocation;

      if (selectedPlace) {
        queryLocation = `${selectedPlace.lat},${selectedPlace.lon}`;
      } else if (place?.lat && place?.lon) {
        queryLocation = `${place.lat},${place.lon}`;
      } else if (location) {
        queryLocation = `${location.lat},${location.lon}`;
      } else {
        queryLocation = "mumbai";
      }

      const params = {
        q: queryLocation,
        key: process.env.REACT_APP_API_KEY,
        days: 5,
      };

      const response = await currentDay(params);

      if (!response?.error) {
        setWeatherDetail(response);
        if (selectedPlace) {
          StoreWeather(response);
        }
      } else {
        setError(response?.message || "An error occurred");
        navigation("/error");
      }
    } catch (error) {
      setError("Failed to fetch weather data");
      navigation("/error");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [place, location, navigation]);

  useEffect(() => {
    if (location || errorApi) {
      setIsLocationReady(true);
    }
  }, [location, errorApi]);

  useEffect(() => {
    if (isLocationReady) {
      fetchWeatherDetail();
    }
  }, [isLocationReady, fetchWeatherDetail]);

  const handleSelectDate = async (selectedPlace) => {
    setSelectPlace(selectedPlace);
    await fetchWeatherDetail(selectedPlace);
  };

  const handleRefresh = () => {
    fetchWeatherDetail();
  };

  if (isLoading || !isLocationReady) {
    return <LoadingScreen />;
  }

  if (error) {
    return navigation('/error')
  }

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="flex flex-col h-screen ">
        <div className="flex md:flex-row flex-col flex-grow">
          <div className="md:w-[30%] w-[full]">
            <CurrentDayDetail
              weatherDetail={weatherDetail}
              onselectDate={handleSelectDate}
            />
          </div>
          <div className="md:w-[70%] w-full">
            <FutureWeather
              forecastData={weatherDetail?.forecast?.forecastday}
              onselectDate={handleSelectDate}
            />
          </div>
        </div>
      </div>
    </PullToRefresh>
  );
};

export default Home;