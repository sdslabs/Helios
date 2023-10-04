import { Box, Stack, Heading, Tabs, TabList, TabPanels, TabPanel, Tab } from '@chakra-ui/react'
import Highlight from '../components/Highlight'
import HorizontalScrollView from '../components/HorizontalScrollView'
import TopNav from '@common/components/TopNav'

const Quizzes = () => {
  return (
    <>
      <Box width='100%' display='flex' justifyContent='center' alignItems='center'>
        <Box
          width='100%'
          height={12}
          bg='rgba(235, 231, 242, 0.4)'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Heading opacity='2.5' fontSize='large' color='brand'>
            Ongoing Quizzes
          </Heading>
        </Box>
      </Box>

      <Box width='100%' display='flex' justifyContent='center' alignItems='center'>
        <HorizontalScrollView />
      </Box>

      <Box width='100%' display='flex' justifyContent='center' alignItems='center'>
        <Box
          width='100%'
          height={12}
          mt={4}
          bg='rgba(235, 231, 242, 0.4)'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Heading opacity='2.5' fontSize='large' color='brand'>
            Upcoming Quizzes
          </Heading>
        </Box>
      </Box>
      <Box width='100%' display='flex' justifyContent='center' alignItems='center'>
        <HorizontalScrollView />
      </Box>
    </>
  )
}
const Dashboard = () => {
  return (
    <>
      <Stack spacing={0}>
        <TopNav />
        <Box width='100%' display='flex' justifyContent='center' alignItems='center'>
          <Highlight />
        </Box>
        <Box width='100%' display='flex' justifyContent='center' alignItems='center'>
          <Tabs
            colorScheme='purple'
            size='sm'
            width='78%'
            justifyContent='flex-start'
            display='flex'
            flexDirection='column'
          >
            <TabList mb={'1.5rem'} minWidth='max-content'>
              <Tab>Quizzes</Tab>
              <Tab>Created Quizzes</Tab>
            </TabList>
            <TabPanels minWidth={'100%'}>
              <TabPanel px={0}>{Quizzes()}</TabPanel>
              <TabPanel>{}</TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Stack>
    </>
  )
}
export default Dashboard
