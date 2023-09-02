import { Button, ButtonProps } from '@chakra-ui/react'

const BasicNavButton = (props: ButtonProps) => (
  <Button variant='ghost' colorScheme={'purple'} justifyContent='flex-start' px={6} borderRadius={3} {...props}>
    {props.children}
  </Button>
)

export default BasicNavButton
