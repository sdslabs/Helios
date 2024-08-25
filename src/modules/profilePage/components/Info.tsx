import useUserDetailsStore from '../store/UserDetailsStore'
import { Flex } from '@chakra-ui/react'
import DetailsCard from './Cards/DetailsCard'
import NumberCard from './Cards/NumberCard'
import useQuizDetailsStore from '../store/QuizDetailsStore'

const Info: React.FC = () => {
  const {
    userID,
    firstName,
    lastName,
    instituteName,
    city,
    country,
    emailAdd,
    phoneNo,
    profileImage,
    socialHandles,
  } = useUserDetailsStore((state) => {
    return {
      userID: state.userID,
      firstName: state.firstName,
      lastName: state.lastName,
      instituteName: state.instituteName,
      city: state.city,
      country: state.country,
      emailAdd: state.emailAdd,
      phoneNo: state.phoneNo,
      profileImage: state.profileImage,
      socialHandles: state.socialHandles,
    }
  })

  const {
    attemptedQuizzesNo,
    hostedQuizzesNo,
  } = useQuizDetailsStore((state) => {
    return {
      attemptedQuizzesNo: state.attemptedQuizzes,
      hostedQuizzesNo: state.hostedQuizzes,
    }
  })

  return (
    <Flex paddingBottom='3vh' justifyContent='space-around'>
      <Flex>
        <DetailsCard
          userID={userID}
          firstName={firstName}
          lastName={lastName}
          instituteName={instituteName}
          city={city}
          country={country}
          emailAdd={emailAdd}
          phoneNo={phoneNo}
          profileImage={profileImage}
          socialHandles={socialHandles}
        />
      </Flex>
      <Flex paddingTop='2.5vh'>
        <NumberCard type='attempted' quantity={attemptedQuizzesNo} />
      </Flex>
      <Flex paddingTop='2.5vh'>
        <NumberCard type='hosted' quantity={hostedQuizzesNo} />
      </Flex>
    </Flex>
  )
}

export default Info
