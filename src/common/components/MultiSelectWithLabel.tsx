import { Select, OptionBase, type ChakraStylesConfig } from 'chakra-react-select'
import { useState } from 'react'
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/react'

interface Option extends OptionBase {
  label: string
  value: string
}

const options: Option[] = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
]

const customStyles = {
  input: (base: ChakraStylesConfig['input']) => ({
    ...base,
    fontSize: '12',
    h: '10',
    paddingY: '2',
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

const MultiSelectWithLabel = () => {
  const [value, setValue] = useState<Option[]>([])
  return (
    <FormControl size='sm' color='gray.500'>
      <FormLabel fontWeight='500' fontSize='sm'>
        Managers
      </FormLabel>
      <Select
        isMulti
        id='managers'
        options={options}
        placeholder='Add Managers'
        closeMenuOnSelect={false}
        chakraStyles={customStyles}
        onChange={(value: Option[]) => {
          setValue(value)
          console.log(value)
        }}
      />
      <FormHelperText color='gray.400' mt={1} textAlign='right' fontSize='xs'>
        Managers
      </FormHelperText>
    </FormControl>
  )
}

export default MultiSelectWithLabel
