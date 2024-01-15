import { useEffect, useState } from "react";
import { toast } from "react-toastify";
interface Location {
  latitude: number;
  longitude: number;
}
const useLocationAccess = () => {
  const [hasLocationAccess, setHasLocationAccess] = useState(false);
  const [location, setLocation] = useState<Location | null>(null);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setHasLocationAccess(true);
          // TODO: update logs in the database
        },
        (error) => {
          console.error(error);
          setHasLocationAccess(false);
          toast.error(
            'Please allow the location access for the quiz to start',
            {
              position: 'top-left',
              autoClose: false,
              hideProgressBar: true,
              closeOnClick: false,
              closeButton: false,
              progress: undefined,
              toastId: 'locationToast',
            },
          );
        }
      );
    } else {
      toast.error(
        'Please allow the location access for the quiz to start',
        {
          position: 'top-left',
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: false,
          closeButton: false,
          progress: undefined,
          toastId: 'locationToast',
        },
      );
    }
  }, []);
  return { hasLocationAccess };
}

export default useLocationAccess;