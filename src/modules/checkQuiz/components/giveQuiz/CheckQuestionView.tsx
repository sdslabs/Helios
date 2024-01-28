import { useEffect, useState } from 'react'
import WithSidebarWrapper from '@common/views/WithSidebarWrapper'
import TopNav from '@common/components/TopNav'
import SideNavContent from '@checkQuiz/components/giveQuiz/SideNav'
import SectionTopBar from '@checkQuiz/components/giveQuiz/SectionTopBar'
import QuestionView from '@checkQuiz/components/giveQuiz/QuestionView'
import { useNavigate, useParams } from 'react-router-dom'
import useCheckQuizStore from '@checkQuiz/store/checkQuizStore'
import { useAllResponse } from '@checkQuiz/api/useResponse'

const CheckQuestionView = () => {
  const { quizId, questionIdParam } = useParams() as { quizId: string; questionIdParam: string }
  const [sections] = useCheckQuizStore((state) => [state.sections])
  const [currentQuestionIndex, currentSectionIndex] = useCheckQuizStore((state) => [
    state.currentQuestionIndex,
    state.currentSectionIndex,
  ])
  const Navigate = useNavigate()
  const [questionId, setQuestionId] = useState(questionIdParam)

  if (sections.length == 0) {
    Navigate(`/check-quiz/${quizId}`)
  }

  useEffect(() => {
    if (sections[currentSectionIndex - 1]?.questions[currentQuestionIndex - 1]) {
      setQuestionId(sections[currentSectionIndex - 1]?.questions[currentQuestionIndex - 1]?._id)
    }
  }, [currentQuestionIndex, currentSectionIndex])

  const renderQuiz = () => {
    return <QuestionView quizId={quizId} questionId={questionId} key={questionId} />
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
