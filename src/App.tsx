import { ChakraProvider } from '@chakra-ui/react'
import { Navigate, Route, Routes } from 'react-router-dom'
import theme from './common/theme'
import JoinUs from './modules/auth/joinUs'
import { Register } from './modules/auth/register'
import CreateQuiz from './modules/createQuiz'

function App() {
  const isLoggedIn = false // TODO: add logged in user logic

  if (!isLoggedIn) {
    return (
      <ChakraProvider theme={theme}>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<JoinUs />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </ChakraProvider>
    )
  }

  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path='/create/:quizID' element={<CreateQuiz />} />
      </Routes>
    </ChakraProvider>
  )
}

export default App
