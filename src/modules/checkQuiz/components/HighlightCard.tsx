import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'

interface HighlightCardProps {
  title: string
  value: number
}

const HighlightCard: React.FC<HighlightCardProps> = ({ title, value }) => {
  return (
    <Flex flexDirection='row' gap={10}>
      <Box bgColor='v1' borderRadius={4}>
        <Flex flexDirection='column' justifyContent='center' alignItems='center' px={6} py={9}>
          <Text fontSize='3.5rem' fontWeight={600} color='v6'>
            {value}
          </Text>
          <Text fontSize='1.25rem' color='v6' textAlign='center'>
            {title}
          </Text>
        </Flex>
      </Box>
    </Flex>
  )
}

export default HighlightCard
