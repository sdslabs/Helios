import { ChakraProvider } from '@chakra-ui/react'
import { Navigate, Route, Routes } from 'react-router-dom'
import theme from './common/theme'
import JoinUs from './modules/auth/joinUs'
import { Register } from './modules/auth/register'
import Dashboard  from "./modules/dashboard"
import CreateQuiz from './modules/createQuiz'
import CheckQuiz from './modules/checkQuiz'

function App() {
  const isLoggedIn = true // TODO: add logged in user logic
  
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
        {/* <Route path='/create/:quizID' element={<CreateQuiz />} /> */}
        <Route path='/create' element={<CreateQuiz />} />
        <Route path='/dashboard' element={<Dashboard />} />
        {/* <Route path='/check/:quizID' element={<CheckQuiz/>} /> */}
        <Route path='/check' element={<CheckQuiz/>} />
      </Routes>
    </ChakraProvider>
  )
  // return (
  //   <ChakraProvider theme={theme}>
  //       <h1>HELLO</h1>
  //   </ChakraProvider>
  // )
}

export default App
