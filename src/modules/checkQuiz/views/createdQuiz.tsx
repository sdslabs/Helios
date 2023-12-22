import { useEffect, useState } from 'react'
import TopNav from '@common/components/TopNav'
import { Flex } from '@chakra-ui/react'
import CreatedQuizHeader from '@checkQuiz/components/CreatedQuizHeader'
import TabViewAllQuiz from '@checkQuiz/components/TabViewAllQuiz'

const CreatedQuiz = () => {

  useEffect(() => {
    
  }, [])

  const [attemptedQuiz, setattemptedQuiz] = useState(3)
  const [hostedQuiz, sethostedQuiz] = useState(10)

  return (
    <>
      <TopNav isDashboard isAdmin />
      <Flex flexDirection={'column'} alignItems={'center'}>
        <Flex
          w='80%'
          h='100%'
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          marginY={'20'}
        >
          <CreatedQuizHeader attemptedQuiz={attemptedQuiz} hostedQuiz={hostedQuiz} />
          <TabViewAllQuiz />
        </Flex>
      </Flex>
    </>
  )
}

export default CreatedQuiz
