import TopNav from '@/modules/createQuiz/topNav';
import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { StartModal } from '@/modules/giveQuiz/StartQuiz';
import { RegisterModal } from '@/modules/giveQuiz/RegistrationModal';

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
       <RegisterModal open={isModalOpen} toggleIsOpen={toggleModal} />
       {/* <StartModal open={isModalOpen} toggleIsOpen={toggleModal} /> */}
    </>
  )
}

export default CreateQuiz