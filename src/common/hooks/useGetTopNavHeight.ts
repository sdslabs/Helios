import { useState } from 'react'
import { useMount } from 'react-use'

const DEFAULT_HEIGHT = 48

const useGetTopNavHeight = () => {
  const [topNavHeight, setTopNavHeight] = useState(DEFAULT_HEIGHT)

  useMount(() => {
    const TopNav = document.getElementById('top-nav')
    if (TopNav) {
      setTopNavHeight(TopNav.clientHeight)
    }
  })

  return topNavHeight
}

export default useGetTopNavHeight
