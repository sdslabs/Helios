import { Select, OptionBase, type ChakraStylesConfig } from 'chakra-react-select'
import { useState } from 'react'
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/react'

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

interface MultiSelectWithLabelProps {
  label: string
  helperText?: string
  options: OptionBase[]
  value: OptionBase[]
  setValue: (value: OptionBase[]) => void
}

const MultiSelectWithLabel = (props: MultiSelectWithLabelProps) => {
  return (
    <FormControl size='sm' color='gray.500'>
      <FormLabel fontWeight='500' fontSize='sm'>
        {props.label}
      </FormLabel>
      <Select
        isMulti
        id='managers'
        options={props.options}
        placeholder='Add Managers'
        closeMenuOnSelect={false}
        chakraStyles={customStyles}
        onChange={(value: OptionBase[]) => {
          props.setValue(value)
        }}
      />
      {props.helperText && (
        <FormHelperText color='gray.400' mt={1} textAlign='right' fontSize='xs'>
          {props.helperText}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default MultiSelectWithLabel
