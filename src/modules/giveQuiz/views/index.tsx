import TopNav from '../../../common/components/topNav';
import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { StartModal } from '../components/StartQuiz';
import { RegisterModal } from '../components/RegistrationModal';

const GiveQuiz = () => { 
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

export default GiveQuiz