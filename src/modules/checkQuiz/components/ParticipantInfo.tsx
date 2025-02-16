import { useState } from 'react'
import {
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  Divider,
  Input,
  Spinner,
  Alert,
  AlertIcon,
  InputGroup,
  InputRightElement,
  VisuallyHidden,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { getParticipantResponses, searchParticipant } from '@checkQuiz/api/getParticipantResponses'
import useCheckQuizStore from '@checkQuiz/store/checkQuizStore'

interface ParticipantResponseData {
  quizDetails: {
    id: string
    name: string
  }
  userDetails: {
    name: string
    email: string
    contact: string
  }
  registration: Array<{
    name: string
    value: string
  }>
  evaluation: {
    totalMarks: number
    status: 'Submitted' | 'Pending' | string
  }
  responses: Array<{
    responseId: string
    sectionDetails: string
    question: string
    marks: {
      max: number
      awarded?: number
    }
    response: {
      options?: string[]
      text?: string
      status: string
    }
  }>
}

const ParticipantInfo = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [userId, setUserId] = useState<string | null>(null)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const quizId = useCheckQuizStore((state) => state.quizId)

  const { data, isLoading, isError } = useQuery<ParticipantResponseData>({
    queryKey: ['participantResponses', quizId, userId],
    queryFn: () => getParticipantResponses(quizId!, userId!),
    enabled: !!userId && !!quizId,
  })

  const handleSearch = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim() && quizId) {
      try {
        setIsSearching(true)
        setSearchError(null)
        const response = await searchParticipant(quizId, searchQuery.trim())
        
        if (response?.userId) {
          setUserId(response.userId)
        } else {
          setSearchError('Participant not found')
        }
      } catch (error) {
        console.error('Search failed:', error)
        setSearchError('Search failed. Please try again.')
      } finally {
        setIsSearching(false)
      }
    }
  }

  return (
    <Box p={4}>
      <InputGroup mb={4}>
        <VisuallyHidden>
          <label htmlFor="searchParticipant">Search participant by email or mobile number</label>
        </VisuallyHidden>
        <Input
          id="searchParticipant"
          placeholder="Search by email or mobile number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
        <InputRightElement>
          {isSearching ? <Spinner size="sm" /> : null}
        </InputRightElement>
      </InputGroup>

      {searchError && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {searchError}
        </Alert>
      )}

      {isLoading && <Spinner size="lg" mx="auto" my={8} />}

      {isError && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          Failed to load participant data
        </Alert>
      )}

      {!data && !isLoading && (
        <Alert status="info" mb={4}>
          <AlertIcon />
          Search for a participant using email or mobile number
        </Alert>
      )}

      {data && (
        <>
          <Box>
            <Text fontWeight="semibold">Quiz: {data.quizDetails?.name}</Text>
            <Text fontSize="sm" color="gray.600">
              Quiz ID: {data.quizDetails?.id}
            </Text>
          </Box>

          <Box mt={4}>
            <Text fontWeight="semibold" mb={2}>
              Participant Details
            </Text>
            <HStack spacing={4}>
              <Badge colorScheme="blue">Name: {data.userDetails?.name}</Badge>
              <Badge colorScheme="blue">Email: {data.userDetails?.email}</Badge>
              <Badge colorScheme="blue">Mobile: {data.userDetails?.contact}</Badge>
            </HStack>
          </Box>

          <Box mt={4}>
            <Text fontWeight="semibold" mb={2}>
              Registration Details
            </Text>
            {data.registration?.length ? (
              data.registration.map((field, index) => (
                <HStack key={index} spacing={4}>
                  <Text fontSize="sm" minW="150px">
                    {field.name}:
                  </Text>
                  <Text>{field.value || 'N/A'}</Text>
                </HStack>
              ))
            ) : (
              <Text fontSize="sm">No registration details available</Text>
            )}
          </Box>

          <Box mt={4}>
            <Text fontWeight="semibold" mb={2}>
              Evaluation Summary
            </Text>
            <HStack spacing={4}>
              <Badge colorScheme="purple">
                Total Marks: {data.evaluation?.totalMarks}
              </Badge>
              <Badge
                colorScheme={
                  data.evaluation?.status === 'Submitted' ? 'green' : 'orange'
                }
              >
                Status: {data.evaluation?.status}
              </Badge>
            </HStack>
          </Box>

          <Divider my={4} />
          
          <Text fontSize="lg" fontWeight="bold">
            Responses
          </Text>
          
          {data.responses?.length ? (
            data.responses.map((response) => (
              <Box key={response.responseId} p={4} borderWidth={1} borderRadius="md" mb={4}>
                <Text fontWeight="semibold">{response.sectionDetails}</Text>
                <Text mt={2} isTruncated>{response.question}</Text>

                <HStack mt={2} spacing={4}>
                  <Badge colorScheme="blue">Max Marks: {response.marks.max}</Badge>
                  <Badge colorScheme={response.marks.awarded ? 'green' : 'gray'}>
                    Awarded: {response.marks.awarded || 'Pending'}
                  </Badge>
                </HStack>

                {response.response.options && (
                  <Box mt={2}>
                    <Text fontSize="sm">Selected Options:</Text>
                    <HStack mt={1} spacing={2}>
                      {response.response.options.map((option) => (
                        <Badge key={option} colorScheme="blue">
                          {option}
                        </Badge>
                      ))}
                    </HStack>
                  </Box>
                )}

                {response.response.text && (
                  <Box mt={2}>
                    <Text fontSize="sm">Written Answer:</Text>
                    <Text mt={1} p={2} bg="gray.50" borderRadius="md">
                      {response.response.text}
                    </Text>
                  </Box>
                )}

                <Badge
                  mt={2}
                  colorScheme={
                    response.response.status === 'Checked'
                      ? 'green'
                      : response.response.status === 'Pending'
                      ? 'orange'
                      : 'gray'
                  }
                >
                  {response.response.status}
                </Badge>
              </Box>
            ))
          ) : (
            <Text mt={4}>No responses found</Text>
          )}
        </>
      )}
    </Box>
  )
}

export default ParticipantInfo