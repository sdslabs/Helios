import { useState, useEffect, useCallback } from 'react'

interface TimeDisplay {
  hours: string;
  minutes: string;
  seconds: string;
}

export const useCountdown = (
  initialDuration: number | null,
  onComplete?: () => void
): TimeDisplay => {
  const [duration, setDuration] = useState<number | null>(initialDuration)
  const [timeDisplay, setTimeDisplay] = useState<TimeDisplay>({
    hours: '00',
    minutes: '00',
    seconds: '00'
  })

  const updateDisplay = useCallback((ms: number) => {
    const seconds = Math.floor((ms / 1000) % 60)
    const minutes = Math.floor((ms / 1000 / 60) % 60)
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24)

    setTimeDisplay({
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0')
    })
  }, [])

  useEffect(() => {
    setDuration(initialDuration)
  }, [initialDuration])

  useEffect(() => {
    if (!duration || duration <= 0) return

    const interval = setInterval(() => {
      setDuration((prev: number | null) => {
        if (!prev) return prev
        const newDuration = prev - 1000
        updateDisplay(newDuration)
        
        if (newDuration <= 1000) {
          clearInterval(interval)
          onComplete?.()
        }
        
        return newDuration
      })
    }, 1000)

    updateDisplay(duration)
    return () => clearInterval(interval)
  }, [duration, onComplete, updateDisplay])

  return timeDisplay
}