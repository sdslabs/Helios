import { Card, Heading } from '@chakra-ui/react'
import { NumberCardType } from '../../types'

interface NumberCardProps {
  type: string
  quantity: number
  total: number
}
const NumberCard: React.FC<NumberCardProps> = ({ type, quantity, total }: NumberCardProps) => {
  return (
    <Card
      w='12vw'
      backgroundColor='#EBE7F2'
      boxShadow='none'
      justify='center'
      rowGap='1vw'
      padding='1vh'
      height='28vh'
    >
      <Heading fontSize='7vh' textAlign='center' fontWeight='600' color='#604195'>
        {quantity}
      </Heading>
      <Heading fontSize='2.5vh' textAlign='center' fontWeight='400' color='#604195'>
        {type === NumberCardType.rank ? 'Rank' : 'Marks'}
      </Heading>
      <Heading fontSize='2vh' textAlign='center' fontWeight='200' color='#604195'>
        (Out of {total})
      </Heading>
    </Card>
  )
}

export default NumberCard
