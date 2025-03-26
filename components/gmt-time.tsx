// "use client"

// import { useState, useEffect } from "react"
// import { Clock } from "lucide-react"

// export default function GmtTime() {
//   const [time, setTime] = useState<string>("")

//   useEffect(() => {
//     const updateTime = () => {
//       const now = new Date()
//       setTime(now.toUTCString())
//     }

//     updateTime()
//     const interval = setInterval(updateTime, 1000)

//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <div className="flex items-center justify-center bg-muted p-2 rounded-md text-sm">
//       <Clock className="h-4 w-4 mr-2" />
//       <span>GMT Time: {time}</span>
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAllTimeZones, convertToTimeZone } from "@/lib/live-broadcast"

export default function GmtTime() {
  const [time, setTime] = useState<string>("")
  const [selectedTimeZone, setSelectedTimeZone] = useState<string>("UTC")
  const timeZones = getAllTimeZones()

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      if (selectedTimeZone === "UTC") {
        setTime(now.toUTCString())
      } else {
        setTime(convertToTimeZone(now, selectedTimeZone))
      }
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [selectedTimeZone])

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 bg-muted p-2 rounded-md text-sm">
      <div className="flex items-center">
        <Clock className="h-4 w-4 mr-2" />
        <span className="whitespace-nowrap">Current Time:</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-medium">{time}</span>
        <Select value={selectedTimeZone} onValueChange={setSelectedTimeZone}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Time Zone" />
          </SelectTrigger>
          <SelectContent>
            {timeZones.map((tz) => (
              <SelectItem key={tz.value} value={tz.value}>
                {tz.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

