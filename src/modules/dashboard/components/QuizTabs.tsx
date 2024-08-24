import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Card, Heading, Flex } from '@chakra-ui/react'
import QuizSlider from './QuizSlider'
import CreatedQuizCard from './Cards/CreatedQuizCard'
import { QuizDetails, QuizType } from '../types'
import NoQuizzesCard from './Cards/NoQuizzesCard'

interface TabsProps {
  isAdmin?: boolean
  quizzes: QuizDetails[]
  createdQuizzes: any //this will have the type of array of quizSchema of backend
}

const QuizTabs: React.FC<TabsProps> = ({ isAdmin = false, quizzes, createdQuizzes }: TabsProps) => {
  const date = new Date()

  const ongoingQuizzes = quizzes?.filter((q: QuizDetails) => {
    const quizendTimeStamp = new Date(q.endDateTimestamp)
    const quizstartTimeStamp = new Date(q.startDateTimestamp)
    return quizendTimeStamp > date && quizstartTimeStamp < date
  })

  const upcomingQuizzes = quizzes?.filter((q: QuizDetails) => {
    const quizstartTimeStamp = new Date(q.startDateTimestamp)
    return quizstartTimeStamp > date
  })
  return (
    <>
      <Tabs>
        <TabList textColor='n6' borderColor='v1'>
          <Tab _selected={{ color: 'v6', borderColor: 'v6' }} borderColor='grey'>
            Quizzes
          </Tab>
          {isAdmin ? (
            <Tab _selected={{ color: 'v6', borderColor: 'v6' }} borderColor='grey'>
              Created Quizzes
            </Tab>
          ) : null}
        </TabList>

        <TabPanels borderColor='v1'>
          <TabPanel borderColor='v1'>
            <Flex bgColor='v1' align='center' justify='center'>
              <Heading
                bgColor='v1'
                textAlign='center'
                color='v6'
                fontSize='1rem'
                fontWeight='500'
                padding={'2'}
              >
                Ongoing Quizzes
              </Heading>
            </Flex>
            <QuizSlider data={ongoingQuizzes} type={QuizType.ongoing} />
            <Flex bgColor='v1' align='center' justify='center'>
              <Heading
                bgColor='v1'
                textAlign='center'
                color='v6'
                fontSize='1rem'
                fontWeight='500'
                padding={'2'}
              >
                Upcoming Quizzes
              </Heading>
            </Flex>
            <QuizSlider data={upcomingQuizzes} type={QuizType.upcoming} />
          </TabPanel>
          {isAdmin && (
            <TabPanel borderColor='v1'>
              <Flex flexDirection='column' gap='2.4vh'>
                {createdQuizzes.length != 0 ? (
                  createdQuizzes.map((quiz: any, index: number) => {
                    const date = new Date()
                    const tags = []
                    if (date > quiz.endDateTimestamp && quiz.isPublished) {
                      tags.push('Completed')
                    } else if (
                      date > quiz?.quizMetadata?.startDateTimestamp &&
                      date < quiz?.quizMetadata?.endDateTimestamp &&
                      quiz.isPublished
                    ) {
                      tags.push('LIVE')
                    }
                    if (quiz.resultsPublished) {
                      tags.push('Results Published')
                    }
                    return (
                      <CreatedQuizCard
                        key={index}
                        image={quiz?.quizMetadata?.bannerImage}
                        quizId={quiz?._id}
                        name={quiz?.quizMetadata?.name}
                        tags={tags}
                        content={quiz?.quizMetadata?.description}
                        schedule={quiz?.quizMetadata?.startDateTimestamp}
                        edit={date.getTime() < new Date(quiz?.quizMetadata?.startDateTimestamp).getTime()}
                        id={quiz._id}
                      />
                    )
                  })
                ) : (
                  <NoQuizzesCard />
                )}
                {}
              </Flex>
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </>
  )
}

export default QuizTabs
