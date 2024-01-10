import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  Heading,
  VStack,
  Text,
  Checkbox,
  Box,
} from '@chakra-ui/react'
import { useState } from 'react'
import BasicNavButton from '@common/components/BasicNavButton'
import { GiveQuizSteps } from '@giveQuiz/types'
import AssignView from '@checkQuiz/components/Assign'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

const SideNavContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [Responses, setResponses] = useState([
    { name: 'Lakshya', status: 'checked' },
    { name: 'Nova', status: 'unchecked' },
  ])
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <Flex
        flexDirection='column'
        justifyContent='center'
        alignItems='flex-start'
        w='100%'
        h='100%'
        pl={6}
      >
        <Heading fontSize='xl' color='brand' pl={4} pb={6} mb={'1.5rem'}>
          Quiz Name
        </Heading>
        <Flex flexDirection={'row'} mb={4} w={'full'} alignItems={'center'}>
          <ChevronLeftIcon w={8} h={8} color={'v6'} />
          <Text color={'v6'} fontSize={'1.25rem'} fontWeight={600}>
            Section 1- Question 1
          </Text>
          <ChevronRightIcon w={8} h={8} color={'v6'} />
        </Flex>

        <Flex flexDirection={'row'} mb={5} bgColor={'v1'} p={3} w={'full'} borderRadius={'0.25rem'}>
          <Flex flexDirection={'column'} gap={2}>
            <Text fontSize={'0.75rem'} color={'accentBlack'}>
              Total Students:{' '}
              <Text as={'span'} color={'v6'} fontWeight={600}>
                100
              </Text>
            </Text>
            <Text fontSize={'0.75rem'} color={'accentBlack'}>
              Total Responses:{' '}
              <Text as={'span'} color={'v6'} fontWeight={600}>
                100
              </Text>
            </Text>
          </Flex>
          <Flex flexDirection={'column'} ml={8} gap={2}>
            <Text fontSize={'0.75rem'} color={'accentBlack'}>
              Checked:{' '}
              <Text as={'span'} color={'v6'} fontWeight={600}>
                60
              </Text>
            </Text>
            <Text fontSize={'0.75rem'} color={'accentBlack'}>
              Unchecked:{' '}
              <Text as={'span'} color={'v6'} fontWeight={600}>
                40
              </Text>
            </Text>
          </Flex>
        </Flex>
        <Flex flexDirection={'row'} w={'full'} alignItems={'center'} mb={5}>
          <Text color={'accentBlack'} fontSize={'0.875rem'} mr={2}>
            Assigned to:
          </Text>
          <AssignView AssignedTo={['Lakshya', 'Nova']} />
        </Flex>
        <Flex mb={4}>
          <Checkbox w={6} h={6} colorScheme='purple' />
          <Text fontSize={'0.875rem'} color={'accentBlack'}>
            Show only unchecked questions
          </Text>
        </Flex>
        <Flex
          bgColor={'v1'}
          color={'v6'}
          fontWeight={600}
          w={'full'}
          borderRadius={'0.25rem'}
          px={7}
          h={'3rem'}
          alignItems={'center'}
        >
          Name
        </Flex>
        <VStack flexGrow={1} w='100%' mt={8}>
          {Responses.map((response, index) => (
            <Flex key={index} flexDirection='row' w='100%' alignItems={'center'}>
              <Button
                bgColor={response.status === 'unchecked' ? 'yellowMarkedForReview' : 'green'}
                rounded={'full'}
                variant='outline'
                size={'sm'}
                borderColor={
                  response.status === 'unchecked'
                    ? 'markedForReviewBubbleBorder'
                    : 'answeredBubbleBorder'
                }
                _hover={{}}
                _focus={{}}
              />
              <Text color={'accentBlack'} ml={2}>
                {response.name}
              </Text>
            </Flex>
          ))}
        </VStack>
      </Flex>
      {/* <SubmitQuizModal open={isModalOpen} toggleIsOpen={toggleModal} /> */}
    </>
  )
}

export default SideNavContent
