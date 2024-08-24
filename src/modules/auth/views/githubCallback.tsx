import axiosInstance from '@auth/api/axiosInstance'
import Spin from '@common/components/Spinner';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { reactAppURL } from '../../../config/config'

const querytoObject = (query: string) => {
  const parameters = new URLSearchParams(query)
  return Object.fromEntries(parameters.entries())
}

const GithubCallback = () => {
  const navigate = useNavigate()
  useEffect(() => {
    ;(async function getToken() {
      const payload = querytoObject(window.location.search.split('?')[1])
      const { code } = payload
      const data = await axiosInstance.post(`/auth/github/token?`, { code })
      if (!(data.status === 200)) {
        alert('Login failed')
        navigate('/')
      } else {
        window.location.assign(`${reactAppURL}/dashboard`) //TODO
      }
    })()
  }, [])
  return (
    <Spin />
  )
}

export default GithubCallback
