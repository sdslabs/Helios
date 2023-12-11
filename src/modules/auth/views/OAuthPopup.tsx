import { useEffect } from 'react'
const OAUTH_STATE_KEY = process.env.REACT_APP_OAUTH_STATE_KEY as string
const OAUTH_RESPONSE = process.env.REACT_APP_OAUTH_RESPONSE as string

const checkState = (recievedState: string) => {
  const state = sessionStorage.getItem(OAUTH_STATE_KEY)
  return state === recievedState
}

const querytoObject = (query: string) => {
  const parameters = new URLSearchParams(query)
  return Object.fromEntries(parameters.entries())
}

const OAuthPopup = (props: any) => {
  const { Component = <div style={{ margin: '1.2vh' }}>Loading</div> } = props
  useEffect(() => {
    const payload = querytoObject(window.location.search.split('?')[1])
    if (!window.opener) {
      throw new Error('No window opener')
    }
    window.opener.postMessage({
      type: OAUTH_RESPONSE,
      payload,
    })
  }, [])
  return Component
}

export default OAuthPopup
