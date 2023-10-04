import { VStack, Text, Flex, Spacer, Box, Button, Heading } from '@chakra-ui/react'

interface HighlightProps {
  HeadingText: string
  DescriptionText: string
  ButtonText: string
  AttemptedQuizes: number
  HostedQuizes: number
}

const Highlight = ({ HeadingText, DescriptionText, ButtonText, AttemptedQuizes, HostedQuizes, }: HighlightProps) => {
  return (
    <>
      <Box width='78%' margin={16} height={200}>
        <Flex height='100%'>
          <Box width='66%' bg='rgba(235, 231, 242, 0.4)'>
            <VStack alignItems='flex-start' color='brand' pt={12} pl={20}>
              <Heading fontSize='2rem'>{HeadingText}</Heading>
              <Text fontSize='larger' pb={4}>
                {DescriptionText}
              </Text>
              <Button colorScheme='purple' bgColor='brand' px={10}>
                {ButtonText}
              </Button>
            </VStack>
          </Box>
          <Spacer />
          <Box width='15%' bg='rgba(235, 231, 242, 0.4)'>
            <VStack alignItems='center' color='brand' pt={12}>
              <Heading fontSize='3rem' pb={2}>
                {AttemptedQuizes}
              </Heading>
              <Text align='center' width='60%' pb={4}>
                Attempted Quizes
              </Text>
            </VStack>
          </Box>
          <Spacer />
          <Box width='15%' bg='rgba(235, 231, 242, 0.4)'>
            <VStack alignItems='center' color='brand' pt={12}>
              <Heading fontSize='3rem' pb={2}>
                {HostedQuizes}
              </Heading>
              <Text align='center' width='60%' pb={4}>
                Hosted Quizes
              </Text>
            </VStack>
          </Box>
        </Flex>
      </Box>
    </>
  )
}
export default Highlight
