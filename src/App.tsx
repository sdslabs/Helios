import { ChakraProvider } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import theme from './common/theme'
import CreateQuiz from './modules/createQuiz'
import TopNav from './modules/topNav'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <TopNav />
      <Routes>
        <Route path='/create/:quizID' element={<CreateQuiz />} />
      </Routes>
    </ChakraProvider>
  )
}

export default App
