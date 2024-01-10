import { useState } from 'react'
import { TimeIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/react'

function Countdown() {
  const [countHours, setCountHours] = useState('00')
  const [countMinutes, setCountMinutes] = useState('00')
  const [countSeconds, setCountSeconds] = useState('00')

  return (
    <Flex
      bgColor='v1'
      justifyContent='center'
      alignItems='center'
      gap='0.5rem'
      height='100%' >
      <TimeIcon color='v6' />
      <span>
        {`${countHours.toString().padStart(2, '0')} : ${countMinutes.toString().padStart(2, '0')} : ${countSeconds.toString().padStart(2, '0')}`}
      </span>
    </Flex>
  )
}

export default Countdown
