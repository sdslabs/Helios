import useLog from "@giveQuiz/api/useLog";
import { LogType } from "@giveQuiz/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const useLocationAccess = () => {
  const [hasLocationAccess, setHasLocationAccess] = useState(false);
  const { mutate: log } = useLog();
  const { quizId } = useParams() as { quizId: string };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setHasLocationAccess(true);
          log({
            logType: LogType.Location,
            quizId: quizId,
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          });
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