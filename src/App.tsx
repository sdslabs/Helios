import { ChakraProvider } from '@chakra-ui/react'
import { Navigate, Route, Routes } from 'react-router-dom'
import theme from '@common/theme'
import JoinUs from './modules/auth/views/joinUs'
// import GiveQuiz from './modules/giveQuiz/views'
import { Register } from './modules/auth/views/register'
import CreateQuiz from './modules/createQuiz/views/createQuiz'
import GiveQuiz from './modules/giveQuiz/views/giveQuiz'

function App() {
  const isLoggedIn = false // TODO: add logged in user logic

  if (!isLoggedIn) {
    return (
      <ChakraProvider theme={theme}>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<JoinUs />} />
          <Route path='*' element={<Navigate to='/' />} />
          <Route path='/create/:quizID' element={<CreateQuiz />} />
          <Route path='/givequiz' element={<GiveQuiz />} />
        </Routes>
      </ChakraProvider>
    )
  }

  return (
    <ChakraProvider theme={theme}>
      <Routes>
      </Routes>
    </ChakraProvider>
  )
}

export default App
