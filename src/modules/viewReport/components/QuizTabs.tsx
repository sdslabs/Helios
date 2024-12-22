import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Card, Heading, Flex } from '@chakra-ui/react'
import SectionsScroll from './SectionsScroll'
import QuestionsScroll from './QuestionsScroll'

const QuizTabs: React.FC = () => {
  return (
    <>
      <Tabs>
        <TabList textColor='n6' borderColor='v1'>
          <Tab _selected={{ color: 'v6', borderColor: 'v6' }} borderColor='grey'>
            Questionwise Analysis
          </Tab>
          <Tab _selected={{ color: 'v6', borderColor: 'v6' }} borderColor='grey'>
            Markswise Analysis
          </Tab>
        </TabList>
        <TabPanels borderColor='v1'>
          <TabPanel borderColor='v1'>
            <QuestionsScroll />
          </TabPanel>
          <TabPanel borderColor='v1'>
            <SectionsScroll />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default QuizTabs
