import { Flex } from '@chakra-ui/react'
import Banner from './Banner'
import NumberCard from './Cards/NumberCard'
import { NumberCardType } from '../types'

interface HeroProps {
  isAdmin?: boolean
  attemptedQuizzes: number
  hostedQuizzes: number
}

const Hero: React.FC<HeroProps> = ({
  isAdmin = false,
  attemptedQuizzes,
  hostedQuizzes,
}: HeroProps) => {
  return (
    <Flex gap='2.4vh' marginBottom='5vh'>
      <Banner />
      <NumberCard type={NumberCardType.attempted} quantity={attemptedQuizzes} />
      {isAdmin ? <NumberCard type={NumberCardType.hosted} quantity={hostedQuizzes} /> : null}
    </Flex>
  )
}

export default Hero
