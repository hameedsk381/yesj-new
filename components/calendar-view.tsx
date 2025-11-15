"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Event {
  date: string
  title: string
  type: string
  location: string
}

interface CalendarViewProps {
  events: Event[]
  onEventClick?: (event: Event) => void
}

export default function CalendarView({ events, onEventClick }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startDayOfWeek = firstDay.getDay()

    return { daysInMonth, startDayOfWeek, year, month }
  }

  const { daysInMonth, startDayOfWeek, year, month } = getDaysInMonth(currentDate)

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const getEventsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return events.filter(event => event.date.startsWith(dateStr))
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const today = new Date()
  const isToday = (day: number) => {
    return today.getFullYear() === year &&
           today.getMonth() === month &&
           today.getDate() === day
  }

  return (
    <div className="bg-white border border-primary/10 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-blue-50 border-b border-primary/10">
        <Button
          variant="ghost"
          size="icon"
          onClick={previousMonth}
          className="hover:bg-primary/10"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-5 w-5 text-primary" />
        </Button>
        <h3 className="text-lg font-light text-maroon">
          {monthNames[month]} {year}
        </h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={nextMonth}
          className="hover:bg-primary/10"
          aria-label="Next month"
        >
          <ChevronRight className="h-5 w-5 text-primary" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {dayNames.map(day => (
          <div
            key={day}
            className="bg-blue-50 p-2 text-center text-xs font-semibold text-muted-foreground"
          >
            {day}
          </div>
        ))}

        {Array.from({ length: startDayOfWeek }).map((_, index) => (
          <div key={`empty-${index}`} className="bg-gray-50 p-2 min-h-[80px] md:min-h-[100px]" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1
          const dayEvents = getEventsForDate(day)
          const isTodayDate = isToday(day)

          return (
            <div
              key={day}
              className={`bg-white p-2 min-h-[80px] md:min-h-[100px] border-l border-t border-gray-100 ${
                isTodayDate ? 'bg-primary/5' : ''
              }`}
            >
              <div
                className={`text-sm font-light mb-1 ${
                  isTodayDate
                    ? 'inline-flex items-center justify-center w-6 h-6 rounded-full bg-maroon text-white'
                    : 'text-muted-foreground'
                }`}
              >
                {day}
              </div>
              <div className="space-y-1">
                {dayEvents.map((event, idx) => (
                  <div
                    key={idx}
                    onClick={() => onEventClick?.(event)}
                    className="text-xs p-1 rounded bg-primary/10 hover:bg-primary/20 cursor-pointer transition-colors truncate"
                    title={event.title}
                  >
                    <div className="font-medium text-primary truncate">{event.title}</div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div className="p-4 bg-blue-50 border-t border-primary/10">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary/10"></div>
            <span>Event Day</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-maroon"></div>
            <span>Today</span>
          </div>
        </div>
      </div>
    </div>
  )
}
