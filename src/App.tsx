import { ChakraProvider } from '@chakra-ui/react'
import theme from './common/theme'
import CreateQuiz from './modules/createQuiz'
import TopNav from './modules/topNav'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <TopNav />
      <CreateQuiz />
    </ChakraProvider>
  )
}

export default App
