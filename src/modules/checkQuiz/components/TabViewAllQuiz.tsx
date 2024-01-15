import { useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'
import Filters from './filters'
import QuizCard from './QuizCard'

const TabViewAllQuiz = () => {
  const tabStyle = {
    _selected: { color: 'brand' },
    color: '#939393',
    fontSize: '0.875rem',
    fontWeight: '600',
  }

  return (
    <>
      <Tabs width={'100%'} variant={'line'} mt={8}>
        <TabList>
          <Tab {...tabStyle}>Quizzes</Tab>
          <Tab {...tabStyle}>Created Quizzes</Tab>
        </TabList>
        <TabIndicator mt='-1.5px' height='2px' bg='brand' borderRadius='1px' />
        <TabPanels>
          <TabPanel>
          </TabPanel>
          <TabPanel>
            <QuizCard quizName='Maths Quiz' quizDescription='This quiz is for the recruitments of SDSLabs, PAG, DSG and InfoSec. And it is important do attend. This quiz is for the recruitments of SDSLabs, PAG, DSG and InfoSec. And it is important do attend.' quizIcon='sdd' quizId='' quizStartTime='26 Jun, 2021 03:00 PM' />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default TabViewAllQuiz
