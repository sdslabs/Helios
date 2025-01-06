import {
  AsyncSelect,
  type ChakraStylesConfig,
  type GroupBase,
  type SelectComponentsConfig,
  chakraComponents,
} from 'chakra-react-select'
import { FormControl, FormHelperText, FormLabel, Text } from '@chakra-ui/react'
import { useState } from 'react'
import useQuizDetailsStore from '@createQuiz/store/useQuizDetailsStore'
import { useSearchUsers } from '@createQuiz/api/useManager'
import useDebouncedValue from '@common/hooks/useDebouncedValue'

interface ManagerOption {
  label: string // name of user
  value: string // uid
  email: string
}

const SelectManagers = () => {
  const { setKey } = useQuizDetailsStore()
  const [inputString, setInputString] = useState('')
  const debouncedInput = useDebouncedValue(inputString, 300)
  const { data, isFetched, isSuccess } = useSearchUsers(debouncedInput)

  const loadOptions = async (input: string, callback: (options: ManagerOption[]) => void) => {
    setInputString(input)
    if (isFetched && isSuccess) {
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

  const handleChange = (value: ManagerOption[]) => {
    const managerIds = value.map((manager) => manager.value)
    setKey('managers', managerIds)
  }

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
      color='currentColor'
      emptyColor='transparent'
      spinnerSize='md'
      speed='0.45s'
      thickness='2px'
      {...props}
    />
  ),
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
