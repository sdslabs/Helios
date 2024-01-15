import { useEffect, useRef } from 'react'
import { Flex, Text } from '@chakra-ui/react';

interface MediaAccessProps {
  setIsMediaPermission: (value: boolean) => void
  hidden?: boolean
}

const MediaAccess = ({ setIsMediaPermission, hidden = true }: MediaAccessProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        console.log('audio and video are available', {
          stream,
          audio: stream.getAudioTracks(),
          video: stream.getVideoTracks(),
        })
        const video = videoRef.current
        if(video){
          video.srcObject = stream
          video.play()
        }

        // disable audio
        stream.getAudioTracks().forEach((audioTrack) => audioTrack.stop())

        setIsMediaPermission(true)
      })
      .catch((err) => {
        setIsMediaPermission(false)
        console.log('Error getting camera and microphone permission:', err)
      })
  }

  useEffect(() => {
    getVideo()
  }, [videoRef])

  return (
    <Flex
      direction="column"
      width="100%"
      height="100vh"
      justify="center"
      align="center"
      display={hidden ? 'none' : 'flex'}
    >
      <video
        ref={videoRef}
        style={{ transform: 'rotateY(180deg)' }}
      />
      <Text fontWeight="bold" fontSize="xl" pt={8}>
        You must be clearly visible in the video above (Video Proctoring)
      </Text>
    </Flex>
  );
}

export default MediaAccess
