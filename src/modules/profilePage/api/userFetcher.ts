import axiosInstance from './axiosInstance'
import { AxiosError } from 'axios'

export const updateUser = async ({userID, body}: {userID: string, body: any}) => {
    try {
        const res = await axiosInstance.post(`/auth/onboard`, body)
        return res.data
      } catch (e: unknown) {
        if (e instanceof AxiosError) {
          return e.response?.data || e.message
        }
        throw e
      }
}