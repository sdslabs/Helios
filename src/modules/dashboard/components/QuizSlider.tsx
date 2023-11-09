import { Box, Flex, IconButton, Text, Slide,Icon } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import QuizCard from './QuizCard';

const QuizSlider: React.FC = () => {

  const cards = [
    { title: 'Recruitment Test', content: 'This quiz is for the recruitments of SDSLabs, PAG, DSG and InfoSec. And it is important do attend.',time:'26 Jun, 2021 03:00PM' },
    { title: 'Recruitment Test', content: 'This quiz is for the recruitments of SDSLabs, PAG, DSG and InfoSec. And it is important do attend.',time:'26 Jun, 2021 03:00PM' },
      ];


  return (
    <Box  m="auto" overflow='scroll'>
     <Flex gap='24px'>
      {cards.map((card,index)=>(
        <QuizCard title={card.title} key={index} content={card.content} time={card.time}/>
      ))}
     </Flex>
    </Box>
  );
};

export default QuizSlider;
