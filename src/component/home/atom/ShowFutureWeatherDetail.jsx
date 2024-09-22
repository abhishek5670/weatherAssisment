import React from "react";
import { roundTemperature, useTemperatureUnit } from "../../Shared/TemperatureConvertor";
import { Wind, Droplets, Sun } from "lucide-react"; // Importing icons
import { formatDate } from "../../Shared/formateDate";

const ShowFutureWeatherDetail = ({ selectedday }) => {
  const {  toggleTemperatureUnit, convertTemperature, getTemperatureSymbol } = useTemperatureUnit();

  const avgTemp = convertTemperature(selectedday?.day?.avgtemp_c);
  const maxMinTemp = convertTemperature({
    max: selectedday?.day?.maxtemp_c,
    min: selectedday?.day?.mintemp_c
  });

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-6 rounded-xl flex justify-center flex-col items-center shadow-lg  w-full mx-auto">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {formatDate(selectedday?.date)}
        </h2>
        <p className="text-lg text-gray-600">{selectedday?.day?.condition?.text}</p>
      </div>

      <div className="flex justify-center items-center mb-6">
        <img
          src={selectedday?.day?.condition?.icon}
          alt={selectedday?.day?.condition?.text}
          className="w-24 h-24 mr-4"
        />
        <div className="text-center">
          <div className="text-6xl font-bold text-gray-800 flex items-baseline">
            {roundTemperature(avgTemp)}
            <span className="text-3xl ml-1 cursor-pointer" onClick={toggleTemperatureUnit}>
              {getTemperatureSymbol()}
            </span>
          </div>
          <p className="text-gray-600">
            {`${roundTemperature(maxMinTemp.max)}° / ${roundTemperature(maxMinTemp.min)}°`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center max-w-md">
        <div className="bg-white p-3 rounded-lg shadow">
          <Wind className="w-6 h-6 mx-auto mb-2 text-blue-500" />
          <p className="text-sm text-gray-600">Wind</p>
          <p className="font-semibold">{selectedday?.day?.maxwind_kph} km/h</p>
        </div>
        <div className="bg-white p-3 rounded-lg shadow">
          <Droplets className="w-6 h-6 mx-auto mb-2 text-blue-500" />
          <p className="text-sm text-gray-600">Humidity</p>
          <p className="font-semibold">{selectedday?.day?.avghumidity}%</p>
        </div>
        <div className="bg-white p-3 rounded-lg shadow">
          <Sun className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
          <p className="text-sm text-gray-600">UV Index</p>
          <p className="font-semibold">{selectedday?.day?.uv}</p>
        </div>
      </div>
    </div>
  );
};

export default ShowFutureWeatherDetail;