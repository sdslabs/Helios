import { Box, HStack } from '@chakra-ui/react'
import SideNavWrapper from '../components/sideNav/Wrapper'

interface WithSidebarWrapperProps {
  children: React.ReactNode
  sidebarContent: React.ReactNode
}

const WithSidebarWrapper = ({ children, sidebarContent }: WithSidebarWrapperProps) => (
  <HStack alignItems='flex-start'>
    <SideNavWrapper>{sidebarContent}</SideNavWrapper>
    <Box as='main' flexGrow={1} alignItems='flex-start'>
      {children}
    </Box>
  </HStack>
)

export default WithSidebarWrapper
