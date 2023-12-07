import { Card, Heading } from '@chakra-ui/react'

const AttemptedQuizzesCard: React.FC<any> = ({ quantity }) => {
  return (
    <Card
      w='11vw'
      h='11vw'
      backgroundColor='#EBE7F2'
      boxShadow='none'
      justify='center'
      rowGap='1vw'
    >
      <Heading fontSize='56px' textAlign='center' fontWeight='600' color='#604195'>
        {quantity}
      </Heading>
      <Heading fontSize='20px' textAlign='center' fontWeight='400' color='#604195'>
        Attempted <br /> Quizzes
      </Heading>
    </Card>
  )
}

export default AttemptedQuizzesCard
