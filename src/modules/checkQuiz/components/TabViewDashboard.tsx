import { useState, useEffect } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'
import Filters from './filters'
import Leaderboard from './Leaderboard'
import QuestionsBoard from './QuestionsBoard'
import { Section } from '@checkQuiz/types'
import { PublishResultModal } from './Modals/PublishQuizModal'
import { QuestionType } from '../../types'
import checkQuizStore from '@checkQuiz/store/checkQuizStore'

const TabViewDashboard = () => {
  const tabStyle = {
    _selected: { color: 'brand' },
    color: '#939393',
    fontSize: '0.875rem',
    fontWeight: '600',
  }
  const [sections, quizID] = checkQuizStore((state) => [
    state.sections,
    state.quizID,
  ])

  const [totalMCQs, setTotalMCQs] = useState<number>(0)
  useEffect(() => {
    if (sections) {
      let totalMCQsCount = 0
      sections.forEach((section: Section) => {
        section.questions.forEach((question: any) => {
          if (question.type === QuestionType.MCQ) {
            totalMCQsCount++
          }
        })
      })
      setTotalMCQs(totalMCQsCount)
    }
  }, [sections])

  return (
    <>
      <Tabs width={'100%'} variant={'line'} mt={8}>
        <TabList>
          <Tab {...tabStyle}>Question</Tab>
          <Tab {...tabStyle}>Participants</Tab>
        </TabList>
        <TabIndicator mt='-1.5px' height='2px' bg='brand' borderRadius='1px' />
        <TabPanels>
          <TabPanel>
            <Filters SelectFilter totalMCQs={totalMCQs} />
            {sections && <QuestionsBoard quizID={quizID} />}
          </TabPanel>
          <TabPanel>
            <Filters SearchBox totalMCQs={totalMCQs} />
            <Leaderboard />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default TabViewDashboard
