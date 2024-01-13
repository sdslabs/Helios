import axiosInstance from '@auth/api/axiosInstance'
import { Spinner } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const querytoObject = (query: string) => {
  const parameters = new URLSearchParams(query)
  return Object.fromEntries(parameters.entries())
}

const GoogleCallback = () => {
  const navigate = useNavigate()
  useEffect(() => {
    (async function getToken() {
      const payload = querytoObject(window.location.search.split('?')[1])
      const { code } = payload;
      const data = await axiosInstance.post(`/auth/google/token?`, { code })
      if (!(data.status === 200)) {
        alert("Login failed")
        navigate("/")
      } else {
        window.location.assign("http://localhost:3000/dashboard")//TODO
      }
    })()
  }, [])
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner size='xl' />
    </div>
  )
}

export default GoogleCallback
