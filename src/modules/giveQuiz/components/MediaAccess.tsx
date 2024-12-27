import { useEffect, useRef } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import useMedia from '@giveQuiz/hooks/useMedia'

interface MediaAccessProps {
  hidden?: boolean
}

const MediaAccess = ({ hidden = true }: MediaAccessProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { startMedia, mediaStream, isMediaPermission } = useMedia()

  useEffect(() => {
    startMedia();
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.srcObject = mediaStream
      video.play()
    }
  }, [isMediaPermission, videoRef])

  return (
    <Flex
      direction='column'
      width='100%'
      height='100vh'
      justify='center'
      align='center'
      display={hidden ? 'none' : 'flex'}
    >
      <video ref={videoRef} style={{ transform: 'rotateY(180deg)' }} />
      <Text fontWeight='bold' fontSize='xl' pt={8}>
        You must be clearly visible in the video above (Video Proctoring)
      </Text>
    </Flex>
  )
}

export default MediaAccess
