import {
  AsyncSelect,
  type ChakraStylesConfig,
  type GroupBase,
  type SelectComponentsConfig,
  chakraComponents,
} from 'chakra-react-select'
import { FormControl, FormHelperText, FormLabel, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import useQuizDetailsStore from '@createQuiz/store/useQuizDetailsStore'
import { useSearchUsers } from '@createQuiz/api/useManager'
import { searchUsers } from '@createQuiz/api/managerFetcher'

interface ManagerOption {
  label: string // name of user
  value: string // uid
  email: string
}

const customComponents: SelectComponentsConfig<ManagerOption, true, GroupBase<ManagerOption>> = {
  ...chakraComponents,
  Option: ({ children, ...props }) => (
    <chakraComponents.Option {...props}>
      {children}
      <Text color='gray.400' ml={2}>
        ({props.data.email})
      </Text>
    </chakraComponents.Option>
  ),
  LoadingIndicator: (props) => (
    <chakraComponents.LoadingIndicator
      // The color of the main line which makes up the spinner
      // This could be accomplished using `chakraStyles` but it is also available as a custom prop
      color='currentColor' // <-- This default's to your theme's text color (Light mode: gray.700 | Dark mode: whiteAlpha.900)
      // The color of the remaining space that makes up the spinner
      emptyColor='transparent'
      // The `size` prop on the Chakra spinner
      // Defaults to one size smaller than the Select's size
      spinnerSize='md'
      // A CSS <time> variable (s or ms) which determines the time it takes for the spinner to make one full rotation
      speed='0.45s'
      // A CSS size string representing the thickness of the spinner's line
      thickness='2px'
      // Don't forget to forward the props!
      {...props}
    />
  ),
}

const SelectManagers = () => {
  const { setKey, details } = useQuizDetailsStore()

  const handleChange = (value: ManagerOption[]) => {
    const managerIds = value.map((manager) => manager.value)
    setKey('managers', managerIds)
  }

  const loadOptions = async (input: string, callback: (options: ManagerOption[]) => void) => {
    if (!input) {
      callback([])
      return
    }
    const data = await searchUsers(input)
    if (data.users) {
      const filteredOptions = data.users.map((user: any) => ({
        label: user.personalDetails.name,
        value: user._id,
        email: user.personalDetails.emailAdd,
      }))
      callback(filteredOptions)
    } else {
      callback([])
    }
  }

  useEffect(() => {
    console.log(details.managers)
  }, [details.managers])
  return (
    <FormControl size='sm' color='gray.500'>
      <FormLabel fontWeight='500' fontSize='sm'>
        Managers
      </FormLabel>
      <AsyncSelect
        isMulti
        id='managers'
        placeholder='Add Managers'
        closeMenuOnSelect={false}
        chakraStyles={customStyles}
        components={customComponents}
        loadOptions={loadOptions}
        onChange={handleChange}
      />
      <FormHelperText color='gray.400' mt={1} textAlign='right' fontSize='xs'>
        Managers
      </FormHelperText>
    </FormControl>
  )
}

const customStyles = {
  input: (base: ChakraStylesConfig['input']) => ({
    ...base,
    fontSize: '12',
    h: '10',
    paddingY: '0',
  }),
  placeholder: (base: ChakraStylesConfig['placeholder']) => ({
    ...base,
    fontSize: 'sm',
  }),
  multiValue: (base: ChakraStylesConfig['multiValue']) => ({
    ...base,
    color: 'v6',
    background: 'v1',
  }),
}

export default SelectManagers
