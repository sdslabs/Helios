import { useUpdateQuizDetails } from "@createQuiz/api/useQuiz";
import { useToast } from '@chakra-ui/react'

const useUpdateDetails = (quizId : string, details : any) => {
  console.log('useUpdateDetails', quizId, details)
  const { mutate } = useUpdateQuizDetails()
  const toast = useToast()
  mutate({quizId, details }, {
    onSuccess: () => {
      toast({
        title: 'Quiz details updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    },
    onError: (err) => {
      toast({
        title: 'An error occurred',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    },
  })
}

export default useUpdateDetails