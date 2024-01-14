import useSectionStore, { Section } from '../store/useSectionStore'
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'
import useGetTopNavHeight from '@common/hooks/useGetTopNavHeight'
import InputField from '@common/components/CustomInputWithLabel'
import CustomRichTextEditor from '@common/components/CustomRichTextEditor'
import { useUpdateSection } from '@createQuiz/api/useSection'
import useQuizDetailsStore from '@createQuiz/store/useQuizDetailsStore'

const SectionDetails = () => {
  const { sections, setSections, currentSectionIdx, setSectionMetadata } = useSectionStore((state) => state)
  const quizId = useQuizDetailsStore((state) => state.quizId)
  const activeSection = currentSectionIdx !== null ? sections[currentSectionIdx] : null
  const topNavHeight = useGetTopNavHeight()
  const { mutate } = useUpdateSection()


  const handleChangeSectionInstructions = (value?: string) => {
    setSectionMetadata(currentSectionIdx ?? 0, 'instructions', value ?? '')
  }
  const handleResetSection = () => {
    setSectionMetadata(currentSectionIdx ?? 0, 'instructions', '')
    setSectionMetadata(currentSectionIdx ?? 0, 'name', 'Section ' + ((currentSectionIdx ?? 0) + 1))
    mutate({ quizId, sectionIdx: currentSectionIdx, body: { name: 'Section ' + ((currentSectionIdx ?? 0) + 1), instructions: '' } })
  }

  const handleSectionSave = () => {
    if (activeSection && currentSectionIdx !== null ) {
      const updatedSection = { ...activeSection, name: activeSection.name, instructions: activeSection.instructions }
      const updatedSections = [...sections]
      updatedSections[currentSectionIdx] = updatedSection
      setSections(updatedSections)
      mutate({ quizId, sectionIdx: currentSectionIdx, body: updatedSection })
    }
  }

  if (!activeSection) {
    return (
      <Center h={`calc(100vh - ${topNavHeight}px)`} flexDirection='column' gap={4}>
        <Text color='accentBlack'>No sections available</Text>
        <Text color='accentBlack'>👈 Add new section </Text>
      </Center>
    )
  }

  return (
    <Box w='930px' mx='auto' my={14}>
      <Heading fontSize='3xl' color='accentBlack'>
        Section Description
      </Heading>
      <VStack gap={4} mt={8} alignItems='stretch'>
        <InputField
          label='Section Name'
          inputProps={{
            placeholder: 'Enter section name',
            value: activeSection.name,
            onChange: (e) => setSectionMetadata(currentSectionIdx ?? 0, 'name', e.target.value),
          }}
          subtext='0/15 characters'
        />
        <FormControl>
          <FormLabel fontWeight='400' fontSize='sm' color='gray.500'>
            Section Instructions
          </FormLabel>
          <CustomRichTextEditor
            value={activeSection.instructions ?? ''}
            onChange={handleChangeSectionInstructions}
          />
        </FormControl>
        <HStack justifyContent='end' my={12} gap={3}>
          <Button color='brand' colorScheme='purple' fontWeight='400' variant='outline' onClick={handleResetSection}>
            Reset
          </Button>
          <Button color='white' colorScheme='purple' bgColor='brand' fontWeight='400' onClick={handleSectionSave}>
            Save & Continue
          </Button>
        </HStack>
      </VStack>
    </Box>
  )
}

export default SectionDetails
