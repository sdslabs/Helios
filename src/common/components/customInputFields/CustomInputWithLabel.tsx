import { FormControl, FormHelperText, FormLabel, Input, InputProps } from '@chakra-ui/react'
interface CustomInputWithLabelProps {
  label: string
  inputProps: InputProps
  subtext?: string
}

const CustomInputWithLabel = ({ label, inputProps, subtext }: CustomInputWithLabelProps) => (
  <FormControl size='sm' color='gray.500'>
    <FormLabel fontWeight='400' fontSize='sm'>
      {label}
    </FormLabel>
    <Input {...inputProps} h={12} borderRadius={4} />
    {subtext ? (
      <FormHelperText color='gray.400' mt={1} textAlign='right' fontSize='xs'>
        {subtext}
      </FormHelperText>
    ) : null}
  </FormControl>
)

export default CustomInputWithLabel
