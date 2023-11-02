import { ChevronRightIcon } from '@chakra-ui/icons'
import { Button, ButtonProps } from '@chakra-ui/react'
import axios from 'axios'
import { AUTH_TYPES} from '../constants'
import useAuthStore from '@auth/store/authStore'

interface AuthButtonProps extends ButtonProps {
  authType: AUTH_TYPES
}

export const AuthButton = ({ authType, ...props }: AuthButtonProps) => {

  return (
    <Button
      {...props}
      as='a'
      href={authType==='google'?process.env.REACT_APP_GOOGLE_AUTH_URL:process.env.REACT_APP_GITHUB_AUTH_URL}
      // onClick={handleClick}
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
