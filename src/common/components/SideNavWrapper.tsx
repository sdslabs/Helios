import { VStack } from '@chakra-ui/react'
import useGetTopNavHeight from '../hooks/useGetTopNavHeight'

interface SideNavWrapperProps {
  children: React.ReactNode
}

export const SIDE_NAV_WIDTH = 80

const SideNavWrapper = ({ children }: SideNavWrapperProps) => {
  const topNavHeight = useGetTopNavHeight()

  return (
    <VStack
      flexShrink={0}
      w={SIDE_NAV_WIDTH}
      borderRight='2px solid #F1EEF5'
      height={`calc(100vh - ${topNavHeight}px)`}
      alignItems='flex-start'
      px={2}
      py={8}
      id='side-nav'
      pos='sticky'
      top={`${topNavHeight}px`}
      left={0}
      bg='white'
      zIndex='docked'
    >
      {children}
    </VStack>
  )
}

export default SideNavWrapper
