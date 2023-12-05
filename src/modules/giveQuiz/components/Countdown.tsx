import React, { useState, useEffect } from 'react';
import { TimeIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';
import { useTimer } from './TimerContext';
import { QuizSummaryModal } from './Modals/QuizSummaryModal';
import { useNavigate } from 'react-router-dom';


function Countdown() {
  const { timerValue } = useTimer();
  const [duration, setDuration] = useState(0);
  const [countHours, setCountHours] = useState('00');
  const [countMinutes, setCountMinutes] = useState('00');
  const [countSeconds, setCountSeconds] = useState('00');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }
  const navigate = useNavigate(); 

  useEffect(() => {
    setDuration((prevDuration) => (timerValue !== null ? timerValue : prevDuration));
  }, [timerValue]);

  useEffect(() => {
      const interval = setInterval(() => {
        const seconds = Math.floor((duration / 1000) % 60);
        const minutes = Math.floor((duration / 1000 / 60) % 60);
        const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
        if (duration <= 0) {
          clearInterval(interval);
          
        } else {
          setCountHours(hours.toString().padStart(2, '0'));
          setCountMinutes(minutes.toString().padStart(2, '0'));
          setCountSeconds(seconds.toString().padStart(2, '0'));
          setDuration((prevDuration) => (prevDuration !== null) ? (prevDuration - 1000) : prevDuration);
          console.log(duration);
          if (duration <= 1000) {
            setIsModalOpen(true);
            clearInterval(interval);
          }
        }
      }, 1000)
      return () => clearInterval(interval);
    }, [duration]);

  return (
    <Flex
      bgColor='v1'
      justifyContent='center'
      alignItems='center'
      gap='0.5rem'
      height='100%'
    >
      <TimeIcon color='v6' />
      <span>{`${countHours} : ${countMinutes} : ${countSeconds}`}</span>
      <QuizSummaryModal open={isModalOpen} toggleIsOpen={toggleModal} />
    </Flex>
  );
}

export default Countdown;
