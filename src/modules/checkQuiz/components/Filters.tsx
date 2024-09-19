import React, { useEffect, useState } from 'react'
import { Button, HStack, Input, IconButton, Select as SelectChakra, Text } from '@chakra-ui/react'
import { useLeaderboard } from '@checkQuiz/api/useLeaderboard'
import AutocheckModal from './Modals/Autocheck'
import useCheckQuizStore from '@checkQuiz/store/checkQuizStore'
import { Section } from '@checkQuiz/types'
import { useFetchDashboard } from '@checkQuiz/api/useDashboard'
import { AddIcon } from '@chakra-ui/icons';
import useDebouncedValue from '@checkQuiz/hooks/useDebouncedValue'
import { useNavigate, useLocation } from 'react-router-dom'; // For URL handling

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
  const [sectionIndex, setSectionIndex] = useState<number | null>(null) // Actual sectionIndex state
  const [tempSectionIndex, setTempSectionIndex] = useState<number | null>(null) // Temporary sectionIndex state
  const [quizId] = useCheckQuizStore((state) => [state.quizId])
  const [leaderboard, setLeaderboard] = useCheckQuizStore((state) => [
    state.leaderboard,
    state.setLeaderboard,
  ])
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebouncedValue(searchQuery, 300)

  const navigate = useNavigate(); 
  const location = useLocation(); 

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLocaleLowerCase())
  }

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
    }
  }, [sectionIndex, isFetched, data, setLeaderboard])

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

  const handleLeaderboard = () => {
    setSectionIndex(tempSectionIndex);
    generateLeaderboard(
      { quizId, sectionIndex: tempSectionIndex, searchQuery: debouncedSearchQuery }, 
      {
        onSuccess: () => {
          refetch() 
        },
      },
    )
  }

  const handleSectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value !== '') {
      setTempSectionIndex(parseInt(value, 10)); 
    } else {
      setTempSectionIndex(null); 
    }
  }

  const handleAddClick = () => {
    console.log('Add button clicked');
  };

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
              borderColor='grey'
              borderRadius='0.25rem'
              fontSize='0.875rem'
              fontWeight='600'
              color='grey'
              value={searchQuery}
              onChange={handleSearchChange}
              _placeholder={{ color: 'grey' }}
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
              borderColor='grey'
              borderRadius='0.25rem'
              fontSize='0.875rem'
              fontWeight='600'
              color='grey'
              value={searchQuery}
              onChange={handleSearchChange}
              _placeholder={{ color: 'grey' }}
            />
            <Text fontSize='0.875rem' color='grey'>
              Sort by
            </Text>
            <SelectChakra
              width='12rem'
              placeholder='None'
              color='grey'
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
            onClick={handleLeaderboard} 
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

export default Filters;
