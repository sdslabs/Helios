import { Button, Center, Input, Text } from '@chakra-ui/react'
import { noop } from 'lodash'
import { useRef, useState } from 'react'

const ImageUpload = () => {
  const fileUploadInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImagePreview(URL.createObjectURL(file))
  }

  const handleOpenFileUpload = () => {
    fileUploadInputRef.current?.click()
  }

  return (
    <Center
      h={270}
      w={270}
      bgColor='purple.50'
      borderRadius={4}
      border='1px dashed'
      borderColor='v6'
      opacity={0.4}
      flexDirection='column'
      gap={8}
      onClick={imagePreview ? noop : handleOpenFileUpload}
      px={8}
      ml='auto'
    >
      {imagePreview ? (
        <>
          <img src={imagePreview} alt='Quiz Banner' height={150} width={150} />
          <Button variant='link' colorScheme='v6' size='sm' onClick={handleOpenFileUpload}>
            Change Image
          </Button>
        </>
      ) : (
        <>
          <Text color='v6' textAlign='center'>
            Click here to upload Quiz banner
          </Text>
          <Text color='gray.500' as='i' fontSize='sm' textAlign='center'>
            Use a square image only with Max file size: 1MB <br />
            (Accepted file types: .jpg, .jpeg, .png)
          </Text>
        </>
      )}
      <Input
        type='file'
        hidden
        ref={fileUploadInputRef}
        accept='image/*'
        onChange={handleFileUpload}
      />
    </Center>
  )
}

export default ImageUpload
