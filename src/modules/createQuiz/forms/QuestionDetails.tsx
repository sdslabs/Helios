import {
  Box,
  Button,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  List,
  ListIcon,
  ListItem,
  Select,
  Switch,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import CustomRichTextEditor from '@common/components/CustomRichTextEditor'
import { QuestionType } from '../../types'
import { DeleteIcon } from '@chakra-ui/icons'
import { CircleIconOutlined } from '@common/components/Icons'

const QuestionDetails = () => {
  const [val1, setVal1] = useState<string>('')
  const [val2, setVal2] = useState<string>('')
  const [type, setType] = useState<QuestionType>(QuestionType.SUB)

  const handleChangeVal1 = (value?: string) => {
    setVal1(value ?? '')
  }
  const handleChangeVal2 = (value?: string) => {
    setVal2(value ?? '')
  }
  const handleChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as QuestionType)
  }

  const renderChoiceBuilder = () => {
    if (type === QuestionType.SUB) return null

    return (
      <>
        <List spacing={3}>
          <ListItem as={HStack}>
            <ListIcon as={CircleIconOutlined} opacity={0.5} />
            <Editable defaultValue='Option 1' flexGrow={1} fontSize='sm'>
              <EditablePreview bgColor='purple.50' w='100%' px={2} />
              <EditableInput px={2} />
            </Editable>
            <IconButton
              icon={<DeleteIcon />}
              aria-label=''
              variant='ghost'
              color='brand'
              size='sm'
              opacity={0.8}
            />
          </ListItem>
        </List>
        <Button
          variant='outline'
          colorScheme='purple'
          color='brand'
          w='max-content'
          size='sm'
          fontWeight='400'
        >
          + Add Option
        </Button>
      </>
    )
  }

  return (
    <Box w='930px' mx='auto' my={14}>
      <Heading fontSize='3xl' color='accentBlack'>
        (Section Name)
      </Heading>
      <VStack gap={4} mt={8} alignItems='stretch'>
        <HStack justifyContent='space-between'>
          <Text color='accentBlack' fontWeight='600'>
            Question (number)
          </Text>
          <Select value={type} onChange={handleChangeType} w={48}>
            <option value={QuestionType.SUB}>{QuestionType.SUB}</option>
            <option value={QuestionType.MCQ}>{QuestionType.MCQ}</option>
          </Select>
        </HStack>
        <FormControl>
          <FormLabel fontWeight='400' fontSize='sm' color='gray.500'>
            Question Description
          </FormLabel>
          <CustomRichTextEditor value={val1} onChange={handleChangeVal1} />
        </FormControl>
        {renderChoiceBuilder()}
        <Divider borderWidth={1} borderColor='v1' />
      </VStack>
      <HStack my={8} justifyContent='space-between'>
        <HStack>
          <Text color='accentBlack' fontSize='sm'>
            Marks:
          </Text>
          <Input type='number' w={20} />
        </HStack>
        {type === QuestionType.MCQ && (
          <>
            <HStack>
              <Text color='accentBlack' fontSize='sm'>
                Autocheck:
              </Text>
              <Switch colorScheme='purple' />
            </HStack>
            <HStack>
              <Text color='accentBlack' fontSize='sm'>
                Answer:
              </Text>
              <Select w={48}>
                <option value='1'>1</option>
                <option value='2'>2</option>
              </Select>
            </HStack>
          </>
        )}
      </HStack>
      {type === QuestionType.SUB && (
        <FormControl>
          <FormLabel fontWeight='400' fontSize='sm' color='gray.500'>
            Checker&#39;s notes
          </FormLabel>
          <CustomRichTextEditor value={val2} onChange={handleChangeVal2} />
        </FormControl>
      )}
      <HStack justifyContent='end' my={12} gap={3}>
        <Button color='brand' colorScheme='purple' fontWeight='400' variant='outline'>
          Discard changes
        </Button>
        <Button color='white' colorScheme='purple' bgColor='brand' fontWeight='400'>
          Save changes
        </Button>
      </HStack>
    </Box>
  )
}

export default QuestionDetails
