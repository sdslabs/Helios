import { useState } from 'react'
import WithSidebarWrapper from '@common/views/WithSidebarWrapper'
import { GiveQuizSteps } from '../types'
import Instructions from '@giveQuiz/components/Instructions'
import TopNav from '@common/components/TopNav'
import SideNavContent from '@giveQuiz/sideNav'
import SectionTopBar from '@giveQuiz/components/SectionTopBar'
import SectionInstructions from '@giveQuiz/components/SectionInstructions'
import QuestionView from '@giveQuiz/components/QuestionView'

const giveQuiz = () => {
  const [quizStage, setQuizStage] = useState<GiveQuizSteps>(0)

  const renderQuiz = () => {
    switch (quizStage) {
      case GiveQuizSteps.Instructions:
        return <Instructions stage={quizStage} setStage={setQuizStage} />
      case GiveQuizSteps.Sections:
        return <SectionInstructions stage={quizStage} setStage={setQuizStage} />
      case GiveQuizSteps.Questions:
        return <QuestionView />
      default:
        return null
    }
  }

  return (
    <>
      <TopNav />
      <WithSidebarWrapper
        sidebarContent={<SideNavContent stage={quizStage} setStage={setQuizStage} />}
      >
        <SectionTopBar />
        {renderQuiz()}
      </WithSidebarWrapper>
    </>
  )
}

export default giveQuiz
