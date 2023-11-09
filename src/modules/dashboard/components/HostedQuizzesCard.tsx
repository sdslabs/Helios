import { Card, Heading } from '@chakra-ui/react'

const HostedQuizzesCard: React.FC <any>= ({quantity}) => {
  return (
    <Card
      w='208px'
      h='208px'
      backgroundColor='#EBE7F2'
      boxShadow='none'
      justify='center'
      rowGap='16px'
    >
      <Heading fontSize='56px' textAlign='center' fontWeight='600' color='#604195'>
        {quantity}
      </Heading>

      <Heading fontSize='20px' textAlign='center' fontWeight='400' color='#604195'>
        Hosted <br /> Quizzes
      </Heading>
    </Card>
  )
}

export default HostedQuizzesCard
