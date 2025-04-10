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
import useDebouncedValue from '@common/hooks/useDebouncedValue'

interface ManagerOption {
  label: string // name of user
  value: string // uid
  email: string
}

const SelectManagers = () => {
  const { setKey, details } = useQuizDetailsStore()

  // For populating already selected managers
  const {
    data: selectedManagersData,
    isFetched: selectedManagersFetched,
    isSuccess: selectedManagersSuccess,
  } = useSearchUsers({
    by: 'ids',
    searchParams: details.managers ?? [],
  })
  const [selectedManagers, setSelectedManagers] = useState<ManagerOption[]>([])

  useEffect(() => {
    if (details.managers && selectedManagersFetched && selectedManagersSuccess) {
      const initialOptions = selectedManagersData.users?.map(mapUserToOption)
      setSelectedManagers(initialOptions)
    }
  }, [details.managers, selectedManagersFetched, selectedManagersSuccess, selectedManagersData])

  // For searching managers
  const [inputString, setInputString] = useState('')
  const debouncedInput = useDebouncedValue(inputString, 300)
  const {
    data: searchedManagersData,
    isFetched: searchedManagersFetched,
    isSuccess: searchedManagersSuccess,
  } = useSearchUsers({
    by: 'query',
    searchParams: debouncedInput,
  })

  const loadOptions = async (input: string, callback: (options: ManagerOption[]) => void) => {
    setInputString(input)
    if (searchedManagersFetched && searchedManagersSuccess) {
      const filteredOptions = searchedManagersData.users.map(mapUserToOption)
      callback(filteredOptions)
    } else {
      callback([])
    }
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
        value={selectedManagers}
        onChange={(value: ManagerOption[]) =>
          setKey(
            'managers',
            value.map((manager: ManagerOption) => manager.value),
          )
        }
      />
      <FormHelperText color='gray.400' mt={1} textAlign='right' fontSize='xs'>
        Managers
      </FormHelperText>
    </FormControl>
  )
}

const mapUserToOption = (user: any): ManagerOption => ({
  label: user.personalDetails.name,
  value: user._id,
  email: user.personalDetails.emailAdd,
})

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
