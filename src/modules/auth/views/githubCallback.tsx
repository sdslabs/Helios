import axiosInstance from '@auth/api/axiosInstance'
import { Spinner } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const querytoObject = (query: string) => {
  const parameters = new URLSearchParams(query)
  return Object.fromEntries(parameters.entries())
}

const GithubCallback = (props: any) => {
  const navigate = useNavigate()
  const { Component = <div
    style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Spinner size='xl' />
  </div> } = props
  useEffect(() => {
    (async function getToken() {
      const payload = querytoObject(window.location.search.split('?')[1])
      const { code } = payload;
      const data = await axiosInstance.post(`/auth/github/token?`, { code })
      if (!(data.status === 200)) {
        alert("Login failed")
        navigate("/")
      } else {
        navigate("/")
        window.location.reload()
      }
    })()
  }, [])
  return Component
}

export default GithubCallback
