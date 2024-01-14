import { useCallback } from 'react'

export const useOAuth = (authType: string) => {
  const authUrl: string =
    authType === 'google'
      ? process.env.REACT_APP_GOOGLE_AUTH_URL || ''
      : process.env.REACT_APP_GITHUB_AUTH_URL || ''

  const getAuth = useCallback(() => {
    window.location.assign(authUrl);
  }, [])
  return { getAuth }
}
