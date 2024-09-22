import { useState, useEffect } from 'react';

const useCurrentLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorApi, setErrorApi] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setErrorApi('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (err) => {
        setErrorApi(`ERROR(${err.code}): ${err.message}`);
      }
    );
  }, []);

  return { location, errorApi };
};

export default useCurrentLocation
