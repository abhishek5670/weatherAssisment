import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-screen h-screen justify-center items-center bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <div className="text-center">
        <div className="mb-8 relative">
          <img
            src="./assets/night_full_moon_rain_thunder.svg"
            alt="Error"
            className="w-48 h-48 mx-auto object-contain animate-pulse"
          />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full flex items-center justify-center">
            <span className="text-6xl font-bold text-red-500">!</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong</h1>
        <p className="text-xl mb-8">We're sorry, but we couldn't complete your request.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold transition-all hover:bg-blue-600 hover:shadow-lg transform hover:-translate-y-1"
        >
          Return Home
        </button>
      </div>
    </div>
  );
};

export default Error;