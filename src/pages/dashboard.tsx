import TopNav from "../modules/onboarding/topNav"
import { Button } from '@chakra-ui/react';
import { QuizCardModal } from "@/modules/onboarding/components/card";
import { useState } from 'react';

const CreateQuiz = () => { 
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
  return (
    <>
      <TopNav />
      <Button colorScheme='purple' bgColor='brand' px={10} onClick={toggleModal}>
            Register
       </Button>
       <QuizCardModal open={isModalOpen} toggleIsOpen={toggleModal} />
    </>
  )
}

export default CreateQuiz
