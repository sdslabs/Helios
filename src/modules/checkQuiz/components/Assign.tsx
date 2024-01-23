import React from 'react'
import { Button, HStack, Text, Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'

interface AssignViewProps {
  AssignedTo: string[]
}

const AssignView: React.FC<AssignViewProps> = ({ AssignedTo }) => {
  if (AssignedTo.length == 0) {
    return (
      <Button color={'v6'} bg={'transparent'}>
        Assign
      </Button>
    )
  }

  return (
    <>
      <HStack>
        <AvatarGroup size='sm' spacing={-2} max={4}>
          {AssignedTo.map((assignee, index) => (
            <Avatar name={assignee} key={index} />
          ))}
        </AvatarGroup>
      </HStack>
    </>
  )
}

export default AssignView
