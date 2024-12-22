import { Card, Heading } from '@chakra-ui/react'
import { NumberCardType } from '../../types'
import theme from '@common/theme'

interface NumberCardProps {
  type: string
  quantity: number
}
const NumberCard: React.FC<NumberCardProps> = ({ type, quantity }: NumberCardProps) => {
  return (
    <Card
      w='12vw'
      backgroundColor={theme.colors.v1}
      boxShadow='none'
      justify='center'
      rowGap='1vw'
      padding='1vh'
      height='28vh'
    >
      <Heading fontSize='7vh' textAlign='center' fontWeight='600' color={theme.colors.v6}>
        {quantity}
      </Heading>
      <Heading fontSize='2.5vh' textAlign='center' fontWeight='400' color={theme.colors.v6}>
        {type === NumberCardType.hosted ? 'Hosted' : 'Attempted'}
        <br />
        Quizzes
      </Heading>
    </Card>
  )
}

export default NumberCard
