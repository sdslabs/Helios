import axios from 'axios'
import axiosInstance from './axiosInstance'

export const checkAuth = async () => {
  try {
    const res = await axiosInstance.get('auth/user')
    return res.data
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      return e.response?.data || e.message
    }
    throw e
  }
}

export const onboard = async ({
  personalDetails,
  educationalDetails,
  socialMediaHandles,
  user,
}: any) => {
  try {
    const res = await axiosInstance.post('auth/onboard', {
      personalDetails,
      educationalDetails,
      socialMediaHandles,
      user,
    })
    return res.data
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      return e.response?.data || e.message
    }
    throw e
  }
}
