import axios from '@auth/api/axiosInstance'

export const logout = async () => {
  try {
      const response = await axios.post('/auth/logout');
      if (response.status === 200) {
          return true;
      } else {
          console.error('Failed to logout');
          return false;
      }
  } catch (error) {
      console.error('An error occurred during logout:', error);
      return false;
  }
}


export default logout