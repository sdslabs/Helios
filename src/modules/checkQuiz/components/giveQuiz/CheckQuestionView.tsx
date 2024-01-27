import { useEffect, useState } from 'react'
import WithSidebarWrapper from '@common/views/WithSidebarWrapper'
import TopNav from '@common/components/TopNav'
import SideNavContent from '@checkQuiz/components/giveQuiz/sideNav/index'
import SectionTopBar from '@checkQuiz/components/giveQuiz/SectionTopBar'
import QuestionView from '@checkQuiz/components/giveQuiz/QuestionView'
import { useNavigate, useParams } from 'react-router-dom'
import useCheckQuizStore from '@checkQuiz/store/checkQuizStore'
import { useAllResponse } from '@checkQuiz/api/useResponse'

const CheckQuestionView = () => {
  const { quizID, questionIDParam } = useParams() as { quizID: string; questionIDParam: string }
  const [sections] = useCheckQuizStore((state) => [state.sections])
  const [currentQuestionIndex, currentSectionIndex] = useCheckQuizStore((state) => [
    state.currentQuestionIndex,
    state.currentSectionIndex,
  ])
  const Navigate = useNavigate()
  const [questionID, setQuestionID] = useState(questionIDParam)

  if (sections.length == 0) {
    Navigate(`/check-quiz/${quizID}`)
  }

  useEffect(() => {
    if (sections[currentSectionIndex - 1]?.questions[currentQuestionIndex - 1]) {
      setQuestionID(sections[currentSectionIndex - 1]?.questions[currentQuestionIndex - 1]?._id)
    }
  }, [currentQuestionIndex, currentSectionIndex])

  const renderQuiz = () => {
      return <QuestionView quizID={quizID} questionID={questionID} key={questionID} />
  }

  return (
    <>
      <TopNav />
      <WithSidebarWrapper sidebarContent={<SideNavContent />}>
        <SectionTopBar />
        {renderQuiz()}
      </WithSidebarWrapper>
    </>
  )
}

export default CheckQuestionView
