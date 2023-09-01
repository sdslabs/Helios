import { FormControl, FormHelperText, FormLabel, Input, InputProps } from '@chakra-ui/react'
interface CustomInputWithLabelProps {
  label?: string
  isRequired?: boolean
  inputProps: InputProps
  subtext?: string
  value?: string
}

function CustomInputWithLabel({
  label,
  inputProps,
  isRequired,
  subtext,
}: CustomInputWithLabelProps) {
  return (
    <FormControl {...(isRequired && { isRequired })} size='sm' color='gray.500'>
      <FormLabel fontWeight='500' fontSize='sm'>
        {label}
      </FormLabel>
      <Input h={12} borderRadius={4} fontSize='sm' {...inputProps}></Input>
      {subtext ? (
        <FormHelperText color='gray.400' mt={1} textAlign='right' fontSize='xs'>
          {subtext}
        </FormHelperText>
      ) : null}
    </FormControl>
  )
}

export default CustomInputWithLabel