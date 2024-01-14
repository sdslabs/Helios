import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TimerContextProps {
  timerValue: number | null;
  setTimer: (value: number | null) => void;
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

interface TimerProviderProps {
  children: ReactNode;
}

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const [timerValue, setTimerValue] = useState<number | null>(0);

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
