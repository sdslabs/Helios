import axiosInstance from '../api/axiosInstance'
import { useCallback, useRef, useState } from 'react'
import { generateState } from '@auth/tools/generateState'
import { POPUP_HEIGHT,POPUP_WIDTH } from '@auth/constants'

const OAUTH_STATE_KEY:string= process.env.REACT_APP_OAUTH_STATE_KEY || ''
const OAUTH_RESPONSE :string= process.env.REACT_APP_OAUTH_RESPONSE || ''

type UIState = {
  loading: boolean
  error: string | null
}

const saveState = (state: string): void => {
  sessionStorage.setItem(OAUTH_STATE_KEY, state)
}

const removeState = () => {
  sessionStorage.removeItem(OAUTH_STATE_KEY)
}

const openPopUp = (url: string): Window | null => {
  const top = window.outerHeight / 2 + window.screenY - POPUP_HEIGHT / 2
  const left = window.outerWidth / 2 + window.screenX - POPUP_WIDTH / 2
  return window.open(
    url,
    'OAuth2 Popup',
    `height=${POPUP_HEIGHT},width=${POPUP_WIDTH},top=${top},left=${left}`,
  )
}

const closePopup = (popupRef: React.RefObject<Window | undefined>) => {
  popupRef.current?.close()
}

const cleanup = (
  intervalRef: any,
  popupRef: React.RefObject<Window | undefined>,
  handleMessageListener: EventListener,
) => {
  clearInterval(intervalRef.current)
  closePopup(popupRef)
  removeState()
  window.removeEventListener('message', handleMessageListener)
}

export const useOAuth = (authType: string) => {
  const authUrl: string =
    authType === 'google'
      ? process.env.REACT_APP_GOOGLE_AUTH_URL || ''
      : process.env.REACT_APP_GITHUB_AUTH_URL || ''
  const popupRef = useRef<Window | null>()
  const intervalRef = useRef<any>()

  const [{ loading, error }, setUI] = useState<UIState>({ loading: false, error: null })

  const getAuth = useCallback(() => {
    setUI({
      loading: true,
      error: null,
    })

    const state = generateState()
    saveState(state)

    popupRef.current = openPopUp(authUrl)
    async function handleMessageListener(message: any) {
      try {
        const type = message?.data?.type
        if (type === OAUTH_RESPONSE) {
          const errorMaybe = message?.data?.error
          if (errorMaybe) {
            setUI({
              loading: false,
              error: errorMaybe || 'Unknown Error',
            })
          } else {
            const code = message?.data?.payload?.code
            const data: any = await axiosInstance.post(
              `/auth/${authType}/token?`,
              { code },
            )
            if (!(data.status === 200)) {
              setUI({
                loading: false,
                error: 'failed',
              })
            } else {
              setUI({
                loading: false,
                error: null,
              })
              window.location.reload()
            }
          }
        }
      } catch (error: any) {
        console.error(error)
        setUI({
          loading: false,
          error: error.toString(),
        })
      } finally {
        cleanup(intervalRef, popupRef, handleMessageListener)
      }
    }
    window.addEventListener('message', handleMessageListener)

    intervalRef.current = setInterval(() => {
      const popupClosed =
        !popupRef.current || !popupRef.current.window || popupRef.current.window.closed
      if (popupClosed) {
        setUI((ui) => ({
          ...ui,
          loading: false,
        }))
        console.warn('warning:popup closed before authentication')
        clearInterval(intervalRef.current)
        removeState()
        window.removeEventListener('message', handleMessageListener)
      }
    }, 250)
    return () => {
      window.removeEventListener('message', handleMessageListener)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])
  return { loading, error, getAuth }
}
