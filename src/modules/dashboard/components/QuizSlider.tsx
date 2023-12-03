import { Box, Flex, IconButton, Text, Slide, Icon } from '@chakra-ui/react'
import QuizCard from './QuizCard'

const QuizSlider: React.FC = () => {

  const cards = [
    {
      title: 'Recruitment Test',
      content:
        'This quiz is for the recruitments of SDSLabs, PAG, DSG and InfoSec. And it is important do attend.',
      time: '26 Jun, 2021 03:00PM',
    },
    {
      title: 'Recruitment Test',
      content:
        'This quiz is for the recruitments of SDSLabs, PAG, DSG and InfoSec. And it is important do attend.',
      time: '26 Jun, 2021 03:00PM',
    },
    {
      title: 'Recruitment Test',
      content:
        'This quiz is for the recruitments of SDSLabs, PAG, DSG and InfoSec. And it is important do attend.',
      time: '26 Jun, 2021 03:00PM',
    }, {
      title: 'Recruitment Test',
      content:
        'This quiz is for the recruitments of SDSLabs, PAG, DSG and InfoSec. And it is important do attend.',
      time: '26 Jun, 2021 03:00PM',
    },
    {
      title: 'Recruitment Test',
      content:
        'This quiz is for the recruitments of SDSLabs, PAG, DSG and InfoSec. And it is important do attend.',
      time: '26 Jun, 2021 03:00PM',
    },
  ]

  return (
    <Flex zIndex='5' >  
        <Flex overflowY='scroll' gap='10px' backgroundImage='linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0),rgba(255, 255, 255, 0),rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.8))'>
            {cards.map((card, index) => (
              <QuizCard title={card.title} key={index} content={card.content} time={card.time} />
            ))}
        </Flex>
    </Flex>
  )
}

export default QuizSlider
