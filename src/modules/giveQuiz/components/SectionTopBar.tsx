import { Button, HStack, Text, Box, Flex, Center } from '@chakra-ui/react'
import Countdown from './Countdown'

const SectionTopBar = () => {
  return (
    <HStack
      top={0}
      id='top-nav'
      bg='white'
      justifyContent='space-between'
      position={'sticky'}
      width={'100%'}
      borderBottom='1px solid #F1EEF5'
      height={'100%'}
    >
      <HStack spacing='2.5rem' height={'100%'}  px={12}
      py={3}>
        <Center flexDirection='row' gap={'1rem'}>
        <Button
          colorScheme='purple'
          variant='outline'
          color='v6'
          rounded={'full'}
          borderRadius='2.5rem'
          width='2.5rem'
          height='2.5rem'
          _hover={{  }}
          _focus={{  }}
        >
          0
        </Button>
        <Text fontWeight={600}>Not Visited</Text>
        </Center>
        <Center flexDirection='row' gap={'1rem'}>
        <Button
          colorScheme='purple'
          bgColor='accentYellow'
          variant='outline'
          color='white'
          borderColor='#FF8900'
          rounded={'full'}
          borderRadius='2.5rem'
          ml={4}
          width='2.5rem'
          height='2.5rem'
          _hover={{  }}
          _focus={{  }}
        >
          0
        </Button>
        <Text fontWeight={600}>Marked for Review</Text>
        </Center>
        <Center flexDirection='row' gap={'1rem'}>
        <Button
          colorScheme='purple'
          bgColor='green'
          variant='outline'
          color='white'
          borderColor='#27A624'
          rounded={'full'}
          borderRadius='2.5rem'
          width='2.5rem'
          height='2.5rem'
          _hover={{  }}
          _focus={{  }}
        >
          0
        </Button>
        <Text fontWeight={600}>Answered</Text>
        </Center>
        <Center flexDirection='row' gap={'1rem'}>
        <Button
          colorScheme='purple'
          bgColor='accentYellow'
          variant='outline'
          color='white'
          borderColor='#FF8900'
          rounded={'full'}
          borderRadius='2.5rem'
          width='2.5rem'
          height='2.5rem'
          _hover={{  }}
          _focus={{  }}
        >
          0
        </Button>
        <Text fontWeight={600}>Answered and Marked for Review</Text>
        </Center>
      </HStack>
      <Box justifySelf='end' color='v6' bgColor='v1' py={5} px={4} height='100%'>
        <Countdown />
        </Box>
    </HStack>
  )
}

export default SectionTopBar
