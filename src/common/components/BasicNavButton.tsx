import { Button, ButtonProps } from '@chakra-ui/react'

const BasicNavButton = (props: ButtonProps) => (
  <Button {...props} variant='ghost' color='v6' width={'100%'} justifyContent='flex-start'>
    {props.children}
  </Button>
)

export default BasicNavButton
