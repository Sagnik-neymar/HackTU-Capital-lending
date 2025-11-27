"use client"

import { useEffect, useState } from "react"

interface TypewriterTextProps {
  text: string
  speed?: number
  className?: string
}

export default function TypewriterText({ text, speed = 20, className }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setDisplayedText("")
    setCurrentIndex(0)
  }, [text])

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  return (
    <span className={className}>
      {displayedText}
      {currentIndex < text.length && <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse" />}
    </span>
  )
}
