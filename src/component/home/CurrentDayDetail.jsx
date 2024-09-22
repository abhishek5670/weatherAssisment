import React from "react";
import HourlyForecast from "./atom/Hourlyweather";
import "../../App.css";
import SearchBox from "../Shared/SearchBox";
import { roundTemperature,useTemperatureUnit} from "../Shared/TemperatureConvertor";
import { formatDate } from "../Shared/formateDate";
import { getWeatherIcon } from "../Shared/weathericon";
// import cloud from '../../../public/assets/cloudy.svg'

const CurrentDayDetail = ({ weatherDetail,onselectDate }) => {
    const {  toggleTemperatureUnit, convertTemperature, getTemperatureSymbol } = useTemperatureUnit();
    const handleLocationSelect =(select)=>{

        onselectDate(select)
      }

      const weatherIconName = getWeatherIcon(
        weatherDetail?.current?.condition?.text || '',
        weatherDetail?.current?.is_day
      );
  return (
    <div className="w-full h-full md:p-10 p-5 flex flex-col relative bg-[#f6f6f6]  items-center ">
      <div className="md:p-4 w-full md:hidden
      ">
        <SearchBox onSelectLocation={handleLocationSelect} />
      </div>
      <img
        src={`./assets/${weatherIconName}.svg`}
        alt="im"
        className="  h-[10vh] w-[20vw] md:h-[20vh]  object-contain"
      />
      <div className="flex flex-col gap-y-5 justify-center items-center">
        <div className="flex flex-col gap-y-2 justify-center items-center">
          <div className="flex flex-row">
          <h2 className="text-[#6b6b6b] text-6xl font-semibold">
              {roundTemperature(convertTemperature(weatherDetail?.current?.temp_c))}
            </h2>
            <p className="font-semibold text-3xl text-[#6b6b6b] cursor-pointer" onClick={toggleTemperatureUnit}>
              {getTemperatureSymbol()}
            </p>
          </div>
          <p className=" text-base text-gray-600 bold">
            {` Feels Like ${weatherDetail?.current?.feelslike_c}`}&deg;C
          </p>
        </div>

        <p className="text-xl font-semibold">
          {weatherDetail?.current?.condition?.text}
        </p>
      </div>
      <div className="border border-gray-400 w-[100%] my-2"></div>
      <div className="flex flex-col justify-center items-center gap-1 pb-5">
        <p>{formatDate(weatherDetail?.current?.last_updated)}</p>
        <p className="text-bold">{weatherDetail?.location?.name}</p>
      </div>

      <HourlyForecast
        hourlyData={weatherDetail?.forecast?.forecastday[0]?.hour}
      />
    </div>
  );
};

export default CurrentDayDetail;
