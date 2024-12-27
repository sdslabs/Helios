import { MultiSelect, type Option } from 'chakra-multiselect'
import { useState } from 'react'

const options: Option[] = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
]

const MultiSelectWithLabel = () => {
  const [value, setValue] = useState<Option[]>([])
  return (
    <MultiSelect
      options={options}
      value={value}
      label='Choose an item'
      onChange={(values) => setValue(Array.isArray(values) ? values : [values])}
    />
  )
}

export default MultiSelectWithLabel
