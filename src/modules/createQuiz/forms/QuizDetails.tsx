import { Box, Button, Grid, GridItem, Heading, VStack, HStack } from '@chakra-ui/react'
import InputField from '../../../common/components/customInputFields/CustomInputWithLabel'
import ImageUpload from './ImageUpload'

const QuizDetails = () => {
  return (
    <Box w='930px' mx='auto' my={14}>
      <Heading fontSize='3xl' color='accentBlack'>
        Quiz Details
      </Heading>
      <Grid templateColumns='repeat(5, 1fr)' templateRows='repeat(3, 1fr)' gap={6} mt={8}>
        <GridItem colSpan={3}>
          <InputField
            label='Quiz Name'
            inputProps={{
              placeholder: 'Enter quiz name',
            }}
          />
        </GridItem>
        <GridItem colSpan={2} rowSpan={3}>
          <ImageUpload />
        </GridItem>
        <GridItem colSpan={1}>
          <InputField
            label='Start Date'
            inputProps={{
              type: 'date',
            }}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <InputField
            label='Start Time'
            inputProps={{
              type: 'time',
            }}
          />
        </GridItem>
        <GridItem colSpan={1} />
        <GridItem colSpan={1}>
          <InputField
            label='End Date'
            inputProps={{
              type: 'date',
            }}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <InputField
            label='End Time'
            inputProps={{
              type: 'time',
            }}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <InputField
            label='Quiz Duration'
            inputProps={{
              placeholder: 'HH:MM',
            }}
          />
        </GridItem>
      </Grid>
      <VStack mt={8} spacing={6} alignItems='stretch'>
        <InputField
          label='Owners'
          inputProps={{
            placeholder: 'Add owners',
          }}
          subtext='TODO: Add tags'
        />
        <InputField
          label='Access Code (Optional)'
          inputProps={{
            placeholder: 'Enter the quiz access code Eg: F4CSeb',
          }}
          subtext='0/15 characters'
        />
        <InputField
          label='Quiz Description'
          inputProps={{
            placeholder: 'Enter a quiz description',
          }}
          subtext='0/150 characters'
        />
        <InputField
          label='Quiz Instructions'
          inputProps={{
            placeholder: 'Enter quiz instruction',
          }}
          subtext='TODO: Replace with a rich text editor'
        />
      </VStack>
      <HStack justifyContent='end' my={12}>
        <Button color='white' colorScheme='purple' bgColor='brand' fontWeight='400'>
          Save & Continue
        </Button>
      </HStack>
    </Box>
  )
}

export default QuizDetails
