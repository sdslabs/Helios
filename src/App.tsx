import { ChakraProvider, Spinner } from '@chakra-ui/react'
import { Navigate, Route, Routes } from 'react-router-dom'
import theme from '@common/theme'
import JoinUs from './modules/auth/views/joinUs'
import { Register } from './modules/auth/views/register'
import CreateQuiz from './modules/createQuiz/views/createQuiz'
import GiveQuiz from './modules/giveQuiz/views/giveQuiz'
import Dashboard from './modules/dashboard/views/Dashboard'
import useAuthStore from '@auth/store/authStore'
import { useAuth } from '@auth/api/useAuth'
import { useEffect, useState } from 'react'
import OAuthPopup from '@auth/views/OAuthPopup'
import { UserRoles } from './modules/types'

function App() {
  const authStore = useAuthStore()
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  const isLoggedIn = true;

  useEffect(() => {
    if (isFetched && !isLoading && !data) {
      refetch()
    } else if (isFetched && !isLoading && data.user !== null) {
      authStore.setUser(data.user)
      authStore.setOnboarded(data.onboarded)
      setIsLoggedIn(true)
    }
  }, [isFetched, isLoading, data])

  if (isLoading) {
    return (
      <ChakraProvider theme={theme}>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<JoinUs />} />
          <Route path='/callback' element={<OAuthPopup />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </ChakraProvider>
    )
  }

  if (isLoggedIn && !authStore.onboarded && !isLoading) {
    return (
      <ChakraProvider theme={theme}>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </ChakraProvider>
    )
  }

  return (
    <ChakraProvider theme={theme}>
      <Routes>
        {!isLoggedIn && !isLoading && data.user === null ? (
          <>
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<JoinUs />} />
            <Route path='/callback' element={<OAuthPopup />} />
            <Route path='*' element={<Navigate to='/' />} />
          </>
        ) : isLoggedIn && !authStore.onboarded && !isLoading ? (
          <>
            <Route path='/' element={<Register />} />
            <Route path='/register' element={<Register />} />
          </>
        ) : (
          <>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/' element={<Dashboard />} />
            {data.role===UserRoles.admin && <Route path='/create/:quizID' element={<CreateQuiz />} />}
            <Route path='/givequiz' element={<GiveQuiz />} />
          </>
        )}
      </Routes>
    </ChakraProvider>
  )
}

export default App
