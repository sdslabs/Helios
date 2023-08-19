import useSectionStore from '../hooks/useSectionStore'
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
import useGetTopNavHeight from '../../../common/hooks/useGetTopNavHeight'
import InputField from '../../../common/components/customInputFields/CustomInputWithLabel'
import CustomRichTextEditor from '../../../common/components/customRichTextEditor'
import { useState } from 'react'

const SectionDetails = () => {
  const sections = useSectionStore((state) => state.sections)
  const currentSectionIdx = useSectionStore((state) => state.currentSectionIdx)
  const activeSection = currentSectionIdx !== null ? sections[currentSectionIdx] : null

  const topNavHeight = useGetTopNavHeight()

  const [sectionInstructions, setSectionInstructions] = useState<string>('')
  const handleChangeSectionInstructions = (value?: string) => {
    setSectionInstructions(value ?? '')
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
          }}
          subtext='0/15 characters'
        />
        <FormControl>
          <FormLabel fontWeight='400' fontSize='sm' color='gray.500'>
            Section Instructions
          </FormLabel>
          <CustomRichTextEditor
            value={sectionInstructions}
            onChange={handleChangeSectionInstructions}
          />
        </FormControl>
        <HStack justifyContent='end' my={12} gap={3}>
          <Button color='brand' colorScheme='purple' fontWeight='400' variant='outline'>
            Reset
          </Button>
          <Button color='white' colorScheme='purple' bgColor='brand' fontWeight='400'>
            Save & Continue
          </Button>
        </HStack>
      </VStack>
    </Box>
  )
}

export default SectionDetails
