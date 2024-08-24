import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Switch,
  Text,
  VStack,
} from '@chakra-ui/react'
import InputField from '@common/components/CustomInputWithLabel'
import { useUpdateQuizDetails } from '@createQuiz/api/useQuiz'
import useRegistrationFormStore, { CustomFields } from '@createQuiz/store/useRegistrationFormStore'
import useQuizDetailsStore from '@createQuiz/store/useQuizDetailsStore'
interface RegistrationFormProps {
  setQuizStage: (stage: number) => void
}

const RegistrationForm = ({ setQuizStage }: RegistrationFormProps) => {
  const { mutate } = useUpdateQuizDetails()
  const { registrationForm, setRegistrationForm } = useRegistrationFormStore((state) => state)
  const quizId = useQuizDetailsStore((state) => state.quizId)

  const handleChange = (key: keyof CustomFields, value: string | boolean, index: number) => {
    const updatedCustomFields = [...registrationForm.customFields];
    if (index + 1 > updatedCustomFields.length) {
      updatedCustomFields.push({
        name: '',
        label: '',
        isRequired: false,
      });
    }
    ;(updatedCustomFields[index] as any)[key] = value;
    if (!updatedCustomFields[index].name && !updatedCustomFields[index].label) {
      updatedCustomFields.splice(index, 1);
    }
    setRegistrationForm({
      customFields: updatedCustomFields,
    });
  };

  const handleSaveRegistrationForm = () => {
    mutate({ quizId, body: { registrationMetadata: registrationForm } })
    setQuizStage(2)
  }
  return (
    <Box w='980px' mx='auto' my={14}>
      <Heading fontSize='3xl' color='accentBlack'>
        Registration Form
      </Heading>
      <Grid
        templateColumns='repeat(2, 1fr)'
        templateRows='repeat(3, 1fr)'
        gap={6}
        pointerEvents='none'
        p={[4, 6]}
        my={4}
        bgColor='gray.50'
        borderRadius={4}
        border='1px dashed'
        borderColor='gray.200'
      >
        <GridItem colSpan={1}>
          <InputField
            label='First Name'
            inputProps={{
              value: 'Candidate’s first name',
              isReadOnly: true,
            }}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <InputField
            label='Last Name'
            inputProps={{
              value: 'Candidate’s last name',
              isReadOnly: true,
            }}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <InputField
            label='Email ID'
            inputProps={{
              value: 'Candidate’s e-mail ID',
              isReadOnly: true,
            }}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <InputField
            label='Contact Number'
            inputProps={{
              value: 'Candidate’s contact number',
              isReadOnly: true,
            }}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <InputField
            label='Organisation Name'
            inputProps={{
              value: 'Candidate’s Organisation name',
              isReadOnly: true,
            }}
          />
        </GridItem>
      </Grid>
      <Heading fontSize='xl' color='accentBlack' mt={8}>
        Additional Details
      </Heading>
      {[0, 1, 2].map((index) => (
        <VStack key={index} mt={8} gap={3}>
          <FormControl display='flex' alignItems='center' color='gray.500' gap={3}>
            <FormLabel mb='0' flexGrow={1} display='flex' alignItems='center'>
              Custom Field {index + 1}
              {registrationForm.customFields[index]?.isRequired && (
                <Text as='span' color='red.500' ml={1}>
                  *
                </Text>
              )}
            </FormLabel>
            <Text>Required</Text>
            <Switch
              id={`cf-${index + 1}`}
              colorScheme='purple'
              isChecked={registrationForm.customFields[index]?.isRequired}
              onChange={(e) => handleChange('isRequired', e.target.checked, index)}
            />
          </FormControl>
          <InputField
            label='Field Name'
            inputProps={{
              placeholder: 'Enter a field name',
              value: registrationForm.customFields[index]?.name || '',
              isReadOnly: registrationForm.customFields.length < index,
              onChange: (e) => handleChange('name', e.target.value, index),
            }}
          />
          <InputField
            label='Field Label'
            inputProps={{
              placeholder: 'Enter a field label',
              value: registrationForm.customFields[index]?.label || '',
              isReadOnly: registrationForm.customFields.length <= index,
              onChange: (e) => handleChange('label', e.target.value, index),
            }}
          />
        </VStack>
      ))}
      <HStack justifyContent='end' my={12} gap={3}>
        <Button color='brand' colorScheme='purple' fontWeight='400' variant='outline'>
          Reset
        </Button>
        <Button
          color='white'
          colorScheme='purple'
          bgColor='brand'
          fontWeight='400'
          onClick={handleSaveRegistrationForm}
        >
          Save & Continue
        </Button>
      </HStack>
    </Box>
  )
}

export default RegistrationForm
