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
import { IRegistrationForm } from '@giveQuiz/types'
interface RegistrationFormProps {
  form: IRegistrationForm
  setForm: (details: IRegistrationForm) => void
}
const RegistrationForm = ({form, setForm} : RegistrationFormProps) => {
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
      <VStack mt={6} gap={3}>
        <FormControl display='flex' alignItems='center' color='gray.500' gap={3}>
          <FormLabel mb='0' flexGrow={1}>
            Custom Field 1
          </FormLabel>
          <Text>Required</Text>
          <Switch id='cf-1' colorScheme='purple' />
        </FormControl>
        <InputField
          label='Field Name'
          inputProps={{
            placeholder: 'Enter a field name',
          }}
        />
        <InputField
          label='Field Label'
          inputProps={{
            placeholder: 'Enter a field label',
          }}
        />
      </VStack>
      <VStack mt={8} gap={3}>
        <FormControl display='flex' alignItems='center' color='gray.500' gap={3}>
          <FormLabel mb='0' flexGrow={1}>
            Custom Field 2
          </FormLabel>
          <Text>Required</Text>
          <Switch id='cf-1' colorScheme='purple' />
        </FormControl>
        <InputField
          label='Field Name'
          inputProps={{
            placeholder: 'Enter a field name',
          }}
        />
        <InputField
          label='Field Label'
          inputProps={{
            placeholder: 'Enter a field label',
          }}
        />
      </VStack>
      <VStack mt={8} gap={3}>
        <FormControl display='flex' alignItems='center' color='gray.500' gap={3}>
          <FormLabel mb='0' flexGrow={1}>
            Custom Field 3
          </FormLabel>
          <Text>Required</Text>
          <Switch id='cf-1' colorScheme='purple' />
        </FormControl>
        <InputField
          label='Field Name'
          inputProps={{
            placeholder: 'Enter a field name',
          }}
        />
        <InputField
          label='Field Label'
          inputProps={{
            placeholder: 'Enter a field label',
          }}
        />
      </VStack>
      <HStack justifyContent='end' my={12} gap={3}>
        <Button color='brand' colorScheme='purple' fontWeight='400' variant='outline'>
          Reset
        </Button>
        <Button color='white' colorScheme='purple' bgColor='brand' fontWeight='400'>
          Save & Continue
        </Button>
      </HStack>
    </Box>
  )
}

export default RegistrationForm
