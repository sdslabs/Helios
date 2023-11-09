import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Card, Heading, Flex } from '@chakra-ui/react'
import QuizSlider from './QuizSlider'
import CreatedQuizCard from './CreatedQuizCard'

const QuizTabs: React.FC = () => {
  const createdQuizzes = [
    {
      image: '',
      name: 'Recruitment test',
      tags: ['Live'],
      content:
        'This quiz is for the recruitments of SDSLabs, PAG, DSG and InfoSec. And it is important do attend. This quiz is for the recruitments of SDSLabs, PAG, DSG and InfoSec. And it is important do attend. ',
      schedule: '26 Jun, 2021 03:00 PM',
      edit: false,
    },
    {
      image: '',
      name: 'Recruitment test',
      tags: ['Completed', 'Results Published'],
      content:
        'This quiz is for the recruitments of SDSLabs, PAG, DSG and InfoSec. And it is important do attend. This quiz is for the recruitments of SDSLabs, PAG, DSG and InfoSec. And it is important do attend. ',
      schedule: '26 Jun, 2021 03:00 PM',
      edit: false,
    },
  ]

  return (
    <>
      <Tabs>
        <TabList textColor='#939393' borderColor='#E7E7E7'>
          <Tab _selected={{ color: '#604195', borderColor: '#604195' }} borderColor='#939393'>
            Quizzes
          </Tab>
          <Tab _selected={{ color: '#604195', borderColor: '#604195' }} borderColor='#939393'>
            Created Quizzes
          </Tab>
        </TabList>

        <TabPanels borderColor='#E7E7E7'>
          <TabPanel borderColor='#E7E7E7'>
            <Flex bgColor='#EBE7F2' height='40px' align='center' justify='center'>
              <Heading
                bgColor='#EBE7F2'
                textAlign='center'
                color='#604195'
                fontSize='14px'
                fontWeight='600'
              >
                Ongoing Quizzes
              </Heading>
            </Flex>
            <QuizSlider />
            <Flex bgColor='#EBE7F2' height='40px' align='center' justify='center'>
              <Heading
                bgColor='#EBE7F2'
                textAlign='center'
                color='#604195'
                fontSize='14px'
                fontWeight='600'
              >
                Upcoming Quizzes
              </Heading>
            </Flex>
            <QuizSlider />
          </TabPanel>
          <TabPanel borderColor='#E7E7E7'>
            <Flex flexDirection='column' gap='24px'>
              {createdQuizzes.map((quiz, index) => (
                <CreatedQuizCard
                  key={index}
                  image={quiz.image}
                  name={quiz.name}
                  tags={quiz.tags}
                  content={quiz.content}
                  schedule={quiz.schedule}
                  edit={quiz.edit}
                />
              ))}
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default QuizTabs
