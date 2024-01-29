import { Center, Button, Text } from '@chakra-ui/react'

interface BubbleProps {
  label: string
  value: number
  variant: string
  colorScheme: string
  textColor: string
}

const Bubble = ({ label, value, variant, colorScheme, textColor }: BubbleProps) => {
  return (
    <Center flexDirection='row' gap='1rem'>
      <Button
        colorScheme={colorScheme}
        variant={variant}
        textColor={textColor}
        rounded='full'
        width={1}
        boxShadow='inset 0 4px 4px 0 rgba(0,0,0,0.1)'
        _hover={{}}
        _focus={{}}
      >
        {value}
      </Button>
      <Text fontWeight={600}>{label}</Text>
    </Center>
  )
}

export default Bubble
