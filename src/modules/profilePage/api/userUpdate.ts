import axios from 'axios'
import axiosInstance from './axiosInstance'

export const userUpdate = async ({
  personalDetails,
  educationalDetails,
  socialHandles,
  user,
}: any) => {
  try {
    const res = await axiosInstance.post('profile/update', {
      personalDetails,
      educationalDetails,
      socialHandles,
      user,
    })
    return res.data
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      return e.response?.data || e.message
    }
    throw e
  }
}
