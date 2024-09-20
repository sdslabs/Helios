import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'
import Filters from './Filters'
import Leaderboard from './Leaderboard'
import QuestionsBoard from './QuestionsBoard'
import checkQuizStore from '@checkQuiz/store/checkQuizStore'

const TabViewDashboard = () => {
  const tabStyle = {
    _selected: { color: 'brand' },
    color: '#939393',
    fontSize: '0.875rem',
    fontWeight: '600',
  }
  const [sections, quizId] = checkQuizStore((state) => [state.sections, state.quizId])

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
            <Filters sections={sections} question />
            {sections && <QuestionsBoard quizId={quizId} />}
          </TabPanel>
          <TabPanel>
            <Filters sections={sections} participants />
            <Leaderboard />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default TabViewDashboard
