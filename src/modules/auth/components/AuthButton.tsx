import { ChevronRightIcon } from '@chakra-ui/icons'
import { Button, ButtonProps } from '@chakra-ui/react'
import { AUTH_TYPES } from '../constants'
import { useOAuth } from '@auth/hooks/useOAuth'

interface AuthButtonProps extends ButtonProps {
  authType: AUTH_TYPES
}

export const AuthButton = ({ authType, ...props }: AuthButtonProps) => {
  const { loading, error, getAuth } = useOAuth(authType)

  const handleClick = () => {
    getAuth()
  }

  return (
    <Button
      {...props}
      as='a'
      onClick={handleClick}
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
