import useWindowFocus from '@giveQuiz/hooks/useWindowFocus';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TimerContextProps {
  timerValue: number | null;
  setTimer: (value: number | null) => void;
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

interface TimerProviderProps {
  children: ReactNode;
  handleBlur?: () => void;
}

export const TimerProvider: React.FC<TimerProviderProps> = ({ children, handleBlur }) => {
  const [timerValue, setTimerValue] = useState<number | null>(0);
  if(handleBlur)
    useWindowFocus(handleBlur);
  const setTimer = (value: number | null) => {
    setTimerValue(value);
  }

  return <TimerContext.Provider value={{ timerValue, setTimer }}>{children}</TimerContext.Provider>
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};
