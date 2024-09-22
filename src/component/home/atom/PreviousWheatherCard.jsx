import React from 'react';
import { roundTemperature, useTemperatureUnit } from '../../Shared/TemperatureConvertor';
import { formatDate } from '../../Shared/formateDate';
const PreviousWeatherCard = ({ location, localTime, temp, condition }) => {
    const {  toggleTemperatureUnit, convertTemperature, getTemperatureSymbol } = useTemperatureUnit();
    return (
      <div className="flex flex-col  justify-between w-[40vw] md:w-[10vw] items-center p-3 m-1 border rounded-lg bg-white border-gray-300">
        <div className="font-bold text-lg">{location}</div>
        <div className="text-sm text-gray-600">{formatDate(localTime)}</div>
        <div className="text-2xl my-1 flex flex-row"><h2 className="">
              {roundTemperature(convertTemperature(temp))}
            </h2>
            <p className="text-base cursor-pointer" onClick={toggleTemperatureUnit}>
              {getTemperatureSymbol()}
            </p></div>
        <img src={condition?.icon} alt={condition?.text} className="w-10 h-10 my-1" />
        <div className="text-sm text-gray-600">{condition?.text}</div>
      </div>
    );
  };
  
  export default PreviousWeatherCard;