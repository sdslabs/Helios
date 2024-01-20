import { useCallback } from 'react'
import { githubAuthURL, googleAuthURL } from '../../../config/config';

export const useOAuth = (authType: string) => {
  const authUrl: string =
    authType === 'google'
      ? googleAuthURL || ''
      : githubAuthURL || ''

  const getAuth = useCallback(() => {
    window.location.assign(authUrl);
  }, [])
  return { getAuth }
}
