import { Center, Button, Text } from '@chakra-ui/react'
import { Color } from 'chart.js'

interface BubbleProps {
  Label: string
  Value: number
  BgColor: string
  BorderColor: string
  FontColor: string
}

const Bubble = ({ Label, Value, BgColor, BorderColor, FontColor }: BubbleProps) => {
  return (
    <Center flexDirection='row' gap='1rem'>
      <Button
        bgColor={BgColor}
        variant='outline'
        color={FontColor}
        borderColor={BorderColor}
        rounded='full'
        borderRadius='2.5rem'
        width='2.5rem'
        height='2.5rem'
        _hover={{}}
        _focus={{}}
      >
        {Value}
      </Button>
      <Text fontWeight={600}>{Label}</Text>
    </Center>
  )
}

export default Bubble
