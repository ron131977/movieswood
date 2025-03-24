"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

export default function GmtTime() {
  const [time, setTime] = useState<string>("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toUTCString())
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center bg-muted p-2 rounded-md text-sm">
      <Clock className="h-4 w-4 mr-2" />
      <span>GMT Time: {time}</span>
    </div>
  )
}

