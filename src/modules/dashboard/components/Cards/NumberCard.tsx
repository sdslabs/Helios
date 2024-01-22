import { Card, Heading } from '@chakra-ui/react'
import { NumberCardType } from '../../types'

interface NumberCardProps {
  type: string
  quantity: number
}
const NumberCard: React.FC<NumberCardProps> = ({ type, quantity }: NumberCardProps) => {
  return (
    <Card
      w='12vw'
      backgroundColor='#EBE7F2'
      boxShadow='none'
      justify='center'
      rowGap='2vw'
      padding='2vh'
    >
      <Heading fontSize='6vh' textAlign='center' fontWeight='600' color='#604195'>
        {quantity}
      </Heading>
      <Heading fontSize='2vh' textAlign='center' fontWeight='400' color='#604195'>
        {type === NumberCardType.hosted ? 'Hosted' : 'Attempted'}
        <br />
        Quizzes
      </Heading>
    </Card>
  )
}

export default NumberCard
