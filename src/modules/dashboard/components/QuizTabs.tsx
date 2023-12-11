import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Card, Heading, Flex } from '@chakra-ui/react'
import QuizSlider from './QuizSlider'
import CreatedQuizCard from './CreatedQuizCard'
import { QuizDetails } from '../types'

interface TabsProps {
  quizzes: QuizDetails[]
  createdQuizzes: any //this will have the type of array of quizSchema of backend
}

const QuizTabs: React.FC<TabsProps> = ({quizzes,createdQuizzes}:TabsProps) => {
  const date = new Date();

  const ongoingQuizzes = quizzes.filter((q:QuizDetails)=>{q.endDateTimestamp>date && q.startDateTimestamp<date})
  const upcomingQuizzes = quizzes.filter((q:QuizDetails)=>{q.startDateTimestamp>date})
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
            <Flex bgColor='#EBE7F2' height='4vh' align='center' justify='center'>
              <Heading
                bgColor='#EBE7F2'
                textAlign='center'
                color='#604195'
                fontSize='1.2vh'
                fontWeight='600'
              >
                Ongoing Quizzes
              </Heading>
            </Flex>
            <QuizSlider data={ongoingQuizzes}/>
            <Flex bgColor='#EBE7F2' height='4vh' align='center' justify='center'>
              <Heading
                bgColor='#EBE7F2'
                textAlign='center'
                color='#604195'
                fontSize='1.2vh'
                fontWeight='600'
              >
                Upcoming Quizzes
              </Heading>
            </Flex>
            <QuizSlider data={upcomingQuizzes}/>
          </TabPanel>
          <TabPanel borderColor='#E7E7E7'>
            <Flex flexDirection='column' gap='2.4vh'>
              {createdQuizzes.map((quiz:any, index:number) => {
                const date = new Date();
                const tags = [];
                if(date>quiz.endDateTimestamp && quiz.isPublished){
                  tags.push("Completed")
                }else if (date>quiz?.quizMetadata?.startDateTimestamp && date<quiz?.quizMetadata?.endDateTimestamp && quiz.isPublished){
                  tags.push("LIVE")
                }
                if(quiz.resultsPublished){
                  tags.push("Results Published")
                }
                return(
                <CreatedQuizCard
                  key={index}
                  image={quiz.quizMetadata.bannerImage} 
                  name={quiz.quizMetadata.name}
                  tags={tags}
                  content={quiz.quizMetadata.description}
                  schedule={quiz.quizMetadata.startDateTimestamp}
                  edit={quiz.isPublished}
                />
              )})}
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default QuizTabs
