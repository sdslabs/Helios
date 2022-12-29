import { useState } from 'react'
import { useMount } from 'react-use'

const DEFAULT_HEIGHT = 48

const useGetTopNavHeight = () => {
  const [topNavHeight, setTopNavHeight] = useState(DEFAULT_HEIGHT)

  useMount(() => {
    const topNav = document.getElementById('top-nav')
    if (topNav) {
      setTopNavHeight(topNav.clientHeight)
    }
  })

  return topNavHeight
}

export default useGetTopNavHeight
