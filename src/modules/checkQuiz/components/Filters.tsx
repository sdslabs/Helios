import React, { useEffect, useState } from 'react'
import { Button, HStack, Input, IconButton, Select as SelectChakra, Text } from '@chakra-ui/react'
import { useLeaderboard } from '@checkQuiz/api/useLeaderboard'
import AutocheckModal from './Modals/Autocheck'
import useCheckQuizStore from '@checkQuiz/store/checkQuizStore'
import { Section } from '@checkQuiz/types'
import { useFetchDashboard } from '@checkQuiz/api/useDashboard'
import { AddIcon } from '@chakra-ui/icons';

interface FiltersProps {
  question?: boolean
  participants?: boolean
  sections: Section[]
}

const Filters: React.FC<FiltersProps> = ({
  question = false,
  participants = false,
  sections,
}) => {
  const [assignees, setAssignees] = useState<any>([])
  const [isAutocheckModalOpen, setIsAutocheckModalOpen] = useState<boolean>(false)
  const [totalAutocheckQuestions, setTotalAutocheckQuestions] = useState<number>(0)
  const [sectionIndex, setSectionIndex] = useState<number | null>(null)
  const [quizId] = useCheckQuizStore((state) => [state.quizId])
  const [leaderboard, setLeaderboard] = useCheckQuizStore((state) => [
    state.leaderboard,
    state.setLeaderboard,
  ])
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLocaleLowerCase())
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const { data, isFetched, refetch } = useFetchDashboard(quizId, sectionIndex, debouncedSearchQuery)

  useEffect(() => {
    if (isFetched && data) {
      if (sectionIndex === null) {
        if (data?.leaderboard?.length > 0) {
          setLeaderboard(data?.leaderboard[0]?.participants || [])
        }
      } else {
        if (data?.sectionLeaderboard?.length > 0) {
          setLeaderboard(data?.sectionLeaderboard[0].participants || [])
        }
      }
    } else {
      refetch()
    }
  }, [sectionIndex, isFetched, data])

  
  useEffect(() => {
    if (sections) {
      let totalAutocheckQuestionsCount = 0
      sections.forEach((section: Section) => {
        section.questions.forEach((question: any) => {
          if (question.autoCheck === true) {
            totalAutocheckQuestionsCount++
          }
        })
      })
      setTotalAutocheckQuestions(totalAutocheckQuestionsCount)
    }
  }, [sections, searchQuery])

  const { mutate: generateLeaderboard } = useLeaderboard()
  const {
    data: sectionData,
    isFetched: sectionDataIsFetched,
    refetch: sectionDataRefetch,
  } = useFetchDashboard(quizId, sectionIndex, debouncedSearchQuery)

  const handleLeaderboard = (sectionIndex: number | null) => {
    generateLeaderboard(
      { quizId, sectionIndex, searchQuery: debouncedSearchQuery }, // Correct property name
      {
        onSuccess: () => {
          console.log('Leaderboard generated successfully')
        },
      },
    )
  }
  

  // TODO: fetch assignees from athena
  const [availableAssignees] = useState([
    { value: '1', label: 'A' },
    { value: '2', label: 'B' },
    { value: '3', label: 'C' },
    { value: '4', label: 'D' },
    { value: '5', label: 'E' },
  ])

  const handleAssigneesChange = (selectedOptions: any) => {
    const selectedAssignees = Array.isArray(selectedOptions) ? selectedOptions : [selectedOptions]
    setAssignees(selectedAssignees)
  }

  const handleSectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value != '') {
      setSectionIndex(parseInt(e.target.value))
    } else {
      setSectionIndex(null)
    }
  }

  const handleAddClick = () => {
    console.log('Add button clicked');
  };

  useEffect(() => {
    sectionDataRefetch()
  }, [sectionIndex])

  return (
    <>
      <HStack spacing={4} alignItems='center' width='full' justifyContent='space-between' mt={6}>
        <HStack spacing={4} alignItems='center' width='full'>
          {question && (
            <>
            <Input
              maxWidth='20rem'
              placeholder='Search or add assignee'
              variant='outline'
              borderColor='#939393'
              borderRadius='0.25rem'
              fontSize='0.875rem'
              fontWeight='600'
              color='#939393'
              value={searchQuery}
              onChange={handleSearchChange}
              _placeholder={{ color: '#939393' }}
            />
            <IconButton
              aria-label="Add"
              icon={<AddIcon />}
              onClick={handleAddClick}
              size="sm"
              bgColor="brand"
              color="white"
              borderRadius="0.25rem"
            />
          </>
          )}

          {participants && (
            <>
            <Input
              maxWidth='20rem'
              placeholder='Search'
              variant='outline'
              borderColor='#939393'
              borderRadius='0.25rem'
              fontSize='0.875rem'
              fontWeight='600'
              color='#939393'
              value={searchQuery}
              onChange={handleSearchChange}
              _placeholder={{ color: '#939393' }}
            />
            <Text fontSize='0.875rem' color='#939393'>
              Sort by
            </Text>
            <SelectChakra
              width='12rem'
              placeholder='None'
              color='#939393'
              onChange={handleSectionChange}
            >
              {sections.map((section, index) => (
                <option value={index} key={section.name}>
                  {section.name}
                </option>
              ))}
            </SelectChakra>
          </>
          )}
        </HStack>
        {participants && (
          <Button
            colorScheme='purple'
            bgColor='brand'
            px={6}
            py={3}
            fontSize='0.875rem'
            fontWeight='400'
            onClick={() => {
              handleLeaderboard(sectionIndex)
              window.location.reload()
            }}
          >
            Generate Leaderboard
          </Button>
        )}

        {question && (
          <>
            <Button
              colorScheme='purple'
              bgColor='brand'
              px={6}
              py={3}
              fontSize='0.875rem'
              fontWeight='400'
              onClick={() => setIsAutocheckModalOpen(true)}
            >
              Autocheck
            </Button>
          </>
        )}
      </HStack>
      <AutocheckModal
        open={isAutocheckModalOpen}
        totalAutocheckQuestions={totalAutocheckQuestions}
        toggleIsOpen={() => setIsAutocheckModalOpen(!isAutocheckModalOpen)}
      />
    </>
  )
}

export default Filters
