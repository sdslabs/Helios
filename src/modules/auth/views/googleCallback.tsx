import axiosInstance from '@auth/api/axiosInstance'
import Spin from '@common/components/Spinner';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { reactAppURL } from '../../../config/config'

const querytoObject = (query: string) => {
  const parameters = new URLSearchParams(query)
  return Object.fromEntries(parameters.entries())
}

const GoogleCallback = () => {
  const navigate = useNavigate()
  useEffect(() => {
    ;(async function getToken() {
      const payload = querytoObject(window.location.search.split('?')[1])
      const { code } = payload
      const data = await axiosInstance.post(`/auth/google/token?`, { code })
      if (!(data.status === 200)) {
        alert('Login failed')
        navigate('/')
      } else {
        // TODO; some better solution for redirecting to dashboard
        window.location.assign(`${reactAppURL}/dashboard`)
      }
    })()
  }, [])
  return (
    <Spin />
  )
}

export default GoogleCallback
