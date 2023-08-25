import { Button, ButtonProps } from '@chakra-ui/react'

const BasicNavButton = (props: ButtonProps) => (
  <Button {...props} variant='ghost' color='v6' w='100%' justifyContent='flex-start'>
    {props.children}
  </Button>
)

export default BasicNavButton
