import { useEffect, useState } from 'react'
import WithSidebarWrapper from '@common/views/WithSidebarWrapper'
import TopNav from '@common/components/TopNav'
import SideNavContent from '@checkQuiz/components/giveQuiz/SideNav'
import SectionTopBar from '@checkQuiz/components/giveQuiz/SectionTopBar'
import QuestionView from '@checkQuiz/components/giveQuiz/QuestionView'
import { useNavigate, useParams } from 'react-router-dom'
import useCheckQuizStore from '@checkQuiz/store/checkQuizStore'

const CheckQuestionView = () => {
  const { quizId, questionIdParam } = useParams() as { quizId: string; questionIdParam: string }
  const [sections, currentQuestionIndex, currentSectionIndex, currentResponseIndex, setCurrentSection] =
    useCheckQuizStore((state) => [
      state.sections,
      state.currentQuestionIndex,
      state.currentSectionIndex,
      state.currentResponseIndex,
      state.setCurrentSection
    ])
  const navigate = useNavigate()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (sections.length === 0) {
      navigate(`/check-quiz/${quizId}`)
    } else if (!isInitialized) {
      setIsInitialized(true)
    }
  }, [sections.length, navigate, quizId, isInitialized])

  useEffect(() => {
    if (!isInitialized || sections.length === 0) return

    const validateAndUpdateState = () => {
      let foundSectionIndex = -1
      let foundQuestionIndex = -1

      sections.forEach((section, sIdx) => {
        const qIdx = section.questions.findIndex((q) => q._id === questionIdParam)
        if (qIdx !== -1) {
          foundSectionIndex = sIdx
          foundQuestionIndex = qIdx
        }
      })

      if (foundSectionIndex === -1 || foundQuestionIndex === -1) {
        const firstQuestionId = sections[0]?.questions[0]?._id
        if (firstQuestionId) {
          navigate(`/check-quiz/${quizId}/${firstQuestionId}`, { replace: true })
          useCheckQuizStore.setState({
            currentSectionIndex: 1,
            currentQuestionIndex: 1,
            currentResponseIndex: 0,
            allResponsesId: [],
            allResponsesStatus: [],
            currentSection: sections[0]
          })
        }
        return
      }

      if (currentSectionIndex !== foundSectionIndex + 1 || 
          currentQuestionIndex !== foundQuestionIndex + 1) {
        useCheckQuizStore.setState({
          currentSectionIndex: foundSectionIndex + 1,
          currentQuestionIndex: foundQuestionIndex + 1,
          currentResponseIndex: 0,
          allResponsesId: [],
          allResponsesStatus: [],
          currentSection: sections[foundSectionIndex]
        })
      }
    }

    validateAndUpdateState()
  }, [questionIdParam, sections, quizId, navigate, currentSectionIndex, 
      currentQuestionIndex, isInitialized])

  useEffect(() => {
    if (sections.length > 0 && currentSectionIndex > 0) {
      const sectionData = sections[currentSectionIndex - 1]
      if (sectionData) {
        setCurrentSection(sectionData)
      }
    }
  }, [sections, currentSectionIndex, setCurrentSection])

  useEffect(() => {
    if (!isInitialized || sections.length === 0) return

    const currentSection = sections[currentSectionIndex - 1]
    if (!currentSection) return

    if (currentQuestionIndex > currentSection.questions.length) {
      if (currentSectionIndex < sections.length) {
        const nextSection = sections[currentSectionIndex]
        const nextQuestionId = nextSection.questions[0]._id
        
        navigate(`/check-quiz/${quizId}/${nextQuestionId}`)
        useCheckQuizStore.setState({
          currentSectionIndex: currentSectionIndex + 1,
          currentQuestionIndex: 1,
          currentResponseIndex: 0,
          allResponsesId: [],
          allResponsesStatus: [],
          currentSection: nextSection
        })
      }
    }
  }, [currentQuestionIndex, currentSectionIndex, sections, quizId, 
      navigate, isInitialized])

  if (!isInitialized || sections.length === 0) {
    return null 
  }

  return (
    <>
      <TopNav />
      <WithSidebarWrapper sidebarContent={<SideNavContent />}>
        <SectionTopBar />
        <QuestionView
          key={`${questionIdParam}-${currentResponseIndex}`}
          quizId={quizId}
          questionId={questionIdParam}
        />
      </WithSidebarWrapper>
    </>
  )
}

export default CheckQuestionView