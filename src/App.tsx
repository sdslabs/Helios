import { ChakraProvider } from '@chakra-ui/react'
import { Navigate, Route, Routes } from 'react-router-dom'
import theme from '@common/theme'
import JoinUs from './modules/auth/views/joinUs'
import { Register } from './modules/auth/views/register'
import CreateQuiz from './modules/createQuiz/views/createQuiz'

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
