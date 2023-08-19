import { ChevronRightIcon } from '@chakra-ui/icons'
import { Button, ButtonProps } from '@chakra-ui/react'
import { AUTH_TYPES, AUTH_REDIRECT_URL } from '../constants'

interface AuthButtonProps extends ButtonProps {
  authType: AUTH_TYPES
}

export const AuthButton = ({ authType, ...props }: AuthButtonProps) => {
  return (
    <Button
      {...props}
      as='a'
      href={`${AUTH_REDIRECT_URL}/${authType}`}
      textTransform='capitalize'
      shadow='xl'
      backgroundColor='white'
      py={10}
      justifyContent='space-around'
      rightIcon={<ChevronRightIcon />}
      border='1px solid'
      borderColor='white'
      _hover={{
        borderColor: 'brand',
        bgColor: 'v1',
      }}
    >
      continue with {authType}
    </Button>
  )
}
