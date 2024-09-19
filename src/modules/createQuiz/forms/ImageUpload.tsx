import { Button, Center, Input, Text } from '@chakra-ui/react'
import { useRef, useState, useEffect } from 'react'

interface ImageUploadProps {
  onImageUpload: (imageUrl: string | null) => void
  initialImage?: string 
}

const ImageUpload = ({ onImageUpload, initialImage }: ImageUploadProps) => {
  const fileUploadInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    if (initialImage) {
      setImagePreview(initialImage)
    }
  }, [initialImage])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const imageUrl = URL.createObjectURL(file)
    setImagePreview(null)
    setImagePreview(imageUrl)
    onImageUpload(imageUrl)
  }

  const handleOpenFileUpload = () => {
    fileUploadInputRef.current?.click()
  }

  const handleDeleteImage = () => {
    setImagePreview(null)
    onImageUpload(null)
    if (fileUploadInputRef.current) {
      fileUploadInputRef.current.value = ''
    }
  }

  return (
    <Center
      h={270}
      w={270}
      bgColor='purple.50'
      borderRadius={4}
      border='1px dashed'
      borderColor='v6'
      flexDirection='column'
      position='relative'
      overflow='hidden'
    >
      {imagePreview ? (
        <>
          <img
            src={imagePreview}
            alt='Quiz Banner'
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
            }}
          />
          <Center
            position='absolute'
            bottom={0}
            width='100%'
            bgColor='v1'
            py={2}
            flexDirection='column'
            gap={2}
          >
            <Button variant='link' color='v6' size='sm' onClick={handleOpenFileUpload} p={2}>
              Change Banner
            </Button>
            <Button variant='link' color='v6' size='sm' onClick={handleDeleteImage} p={2}>
              Remove
            </Button>
          </Center>
        </>
      ) : (
        <Center
          h='100%'
          w='100%'
          flexDirection='column'
          cursor='pointer'
          onClick={handleOpenFileUpload}
        >
          <Text color='v6' textAlign='center' p={5} opacity={0.4}>
            Click here to upload Quiz banner
          </Text>
          <Text color='gray.500' as='i' fontSize='sm' textAlign='center' p={5} opacity={0.4}>
            Use a square image only with Max file size: 1MB <br />
            (Accepted file types: .jpg, .jpeg, .png)
          </Text>
        </Center>
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