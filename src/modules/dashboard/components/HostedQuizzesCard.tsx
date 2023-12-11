import { Card, Heading } from '@chakra-ui/react'

const HostedQuizzesCard: React.FC<any> = ({ quantity }) => {
  return (
    <Card
      w='12vw'
      h='12vw'
      backgroundColor='#EBE7F2'
      boxShadow='none'
      justify='center'
      rowGap='1.6vh'
    >
      <Heading fontSize='6vh' textAlign='center' fontWeight='600' color='#604195'>
        {quantity}
      </Heading>

      <Heading fontSize='2vh' textAlign='center' fontWeight='400' color='#604195'>
        Hosted <br /> Quizzes
      </Heading>
    </Card>
  )
}

export default HostedQuizzesCard
