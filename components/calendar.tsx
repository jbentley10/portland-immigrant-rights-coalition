"use client"

import type React from "react"
import { useState, useCallback, useMemo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Document } from "@contentful/rich-text-types"

export type EventType = {
    id: string
    name: string
    description?: { json: Document }
    dateAndTime: string // ISO string
    link?: string
}

const MonthSelector: React.FC<{
    currentDate: Date
    onMonthChange: (date: Date) => void
}> = ({ currentDate, onMonthChange }) => {
    const prevMonth = () => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
        onMonthChange(newDate)
    }

    const nextMonth = () => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
        onMonthChange(newDate)
    }

    return (
        <div className="flex items-center justify-between mb-4">
            <Button variant="outline" size="icon" onClick={prevMonth} aria-label="Go to previous month">
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2
                className="text-lg font-semibold"
                aria-live="polite"
                aria-label={`Current month: ${currentDate.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                })}`}
            >
                {currentDate.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                })}
            </h2>
            <Button variant="outline" size="icon" onClick={nextMonth} aria-label="Go to next month">
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    )
}

interface CalendarProps {
    events?: EventType[]
}

export default function Calendar({ events = [] }: CalendarProps) {
    const [currentDate, setCurrentDate] = useState(new Date())

    const handleMonthChange = useCallback((date: Date) => {
        setCurrentDate(date)
    }, [])

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const daysInMonth = lastDay.getDate()
        const startingDay = firstDay.getDay()

        return { daysInMonth, startingDay }
    }

    const { daysInMonth, startingDay } = getDaysInMonth(currentDate)

    const eventsByDate = useMemo(() => {
        const map = new Map<string, EventType[]>()
        events.forEach((event) => {
            const date = new Date(event.dateAndTime)
            const key = date.toDateString()
            if (!map.has(key)) {
                map.set(key, [])
            }
            map.get(key)!.push(event)
        })
        return map
    }, [events])

    const getEventsForDate = (date: Date) => {
        return eventsByDate.get(date.toDateString()) || []
    }

    return (
        <div>
            <MonthSelector currentDate={currentDate} onMonthChange={handleMonthChange} />
            <div className="grid grid-cols-7 gap-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center font-semibold">
                        {day}
                    </div>
                ))}
                {Array.from({ length: startingDay }).map((_, index) => (
                    <div key={`empty-${index}`} className="h-24 border rounded-md"></div>
                ))}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), index + 1)
                    const dayEvents = getEventsForDate(date)
                    return (
                        <div key={index} className="h-24 border rounded-md p-2 overflow-y-auto">
                            <div className="font-semibold mb-1">{index + 1}</div>
                            {dayEvents.map((event) => {
                                const EventBadge = (
                                    <Badge
                                        variant="secondary"
                                        className="mb-1 cursor-pointer block truncate w-full"
                                    >
                                        {new Date(event.dateAndTime).toLocaleString('en-US', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true,
                                            timeZone: 'UTC'
                                        })}{" "}
                                        - {event.name}
                                    </Badge>
                                );

                                return event.link ? (
                                    <a
                                        key={event.id}
                                        href={event.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full"
                                    >
                                        {EventBadge}
                                    </a>
                                ) : (
                                    <div key={event.id}>
                                        {EventBadge}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}