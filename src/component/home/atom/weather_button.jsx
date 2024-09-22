import React from "react";
import {
  roundTemperature,
  useTemperatureUnit,
} from "../../Shared/TemperatureConvertor";

const WeatherDayButton = ({ date, temp, condition, onClick, isSelected }) => {
  const {
    toggleTemperatureUnit,
    convertTemperature,
    getTemperatureSymbol,
  } = useTemperatureUnit();
  // Convert date string to Day of week (e.g., "Mon", "Tue")
  const dayOfWeek = new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
  });
  const maxMinTemp = convertTemperature({
    max: temp?.max,
    min: temp?.min
  });

  return (
    <button
      onClick={onClick}
      className={`flex md:flex-col flex-row max-md:w-full justify-between items-center p-3 m-1 border rounded-lg transition-colors duration-200 ease-in-out
        ${
          isSelected
            ? "bg-blue-100 border-blue-300"
            : "bg-white border-gray-300 hover:bg-gray-100"
        }`}
    >
      <div className="font-bold text-lg">{dayOfWeek}</div>
      <div className="text-2xl my-1 flex flex-row">
      {`${roundTemperature(maxMinTemp.max)}/${roundTemperature(maxMinTemp.min)}`}
      <p className="text-base cursor-pointer" onClick={toggleTemperatureUnit}>
            {getTemperatureSymbol()}
            </p>
      </div>
      <img
        src={condition.icon}
        alt={condition.text}
        className="w-10 h-10 my-1"
      />
      <div className="text-sm text-gray-600">{condition.text}</div>
    </button>
  );
};

export default WeatherDayButton;
