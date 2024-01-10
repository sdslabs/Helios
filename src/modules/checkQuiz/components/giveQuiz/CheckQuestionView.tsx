import { useState } from 'react'
import WithSidebarWrapper from '@common/views/WithSidebarWrapper'
import TopNav from '@common/components/TopNav'
import SideNavContent from '@checkQuiz/components/giveQuiz/sideNav'
import SectionTopBar from '@checkQuiz/components/giveQuiz/SectionTopBar'
import QuestionView from '@checkQuiz/components/giveQuiz/QuestionView'
import { useParams } from 'react-router-dom'

const CheckQuestionView = () => {
  const { quizID, questionID } = useParams() as { quizID: string, questionID: string }

  const renderQuiz = () => {
    return <QuestionView quizID={quizID} questionID={questionID}/>
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
