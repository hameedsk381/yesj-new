"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Filter } from "lucide-react"

interface EventFiltersProps {
  onFilterChange: (filters: EventFilters) => void
}

export interface EventFilters {
  location: string
  month: string
  type: string
}

export default function EventFilters({ onFilterChange }: EventFiltersProps) {
  const [filters, setFilters] = useState<EventFilters>({
    location: "all",
    month: "all",
    type: "all",
  })

  const handleFilterChange = (key: keyof EventFilters, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const defaultFilters: EventFilters = {
      location: "all",
      month: "all",
      type: "all",
    }
    setFilters(defaultFilters)
    onFilterChange(defaultFilters)
  }

  const hasActiveFilters = Object.values(filters).some(v => v !== "all")

  return (
    <div className="bg-blue-50 border border-primary/10 rounded-lg p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-light text-primary">Filter Events</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-light text-muted-foreground mb-2">
            <MapPin className="inline h-4 w-4 mr-1" />
            Location
          </label>
          <Select value={filters.location} onValueChange={(value) => handleFilterChange("location", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="hyderabad">Hyderabad</SelectItem>
              <SelectItem value="chennai">Chennai</SelectItem>
              <SelectItem value="bangalore">Bangalore</SelectItem>
              <SelectItem value="vijayawada">Vijayawada</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-light text-muted-foreground mb-2">
            <Calendar className="inline h-4 w-4 mr-1" />
            Month
          </label>
          <Select value={filters.month} onValueChange={(value) => handleFilterChange("month", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Months" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Months</SelectItem>
              <SelectItem value="2025-06">June 2025</SelectItem>
              <SelectItem value="2025-07">July 2025</SelectItem>
              <SelectItem value="2025-08">August 2025</SelectItem>
              <SelectItem value="2025-09">September 2025</SelectItem>
              <SelectItem value="2026-01">January 2026</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-light text-muted-foreground mb-2">
            Event Type
          </label>
          <Select value={filters.type} onValueChange={(value) => handleFilterChange("type", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="camp">Leadership Camp</SelectItem>
              <SelectItem value="conference">Conference</SelectItem>
              <SelectItem value="dialogue">Dialogue</SelectItem>
              <SelectItem value="campaign">Campaign</SelectItem>
              <SelectItem value="cultural">Cultural Event</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-4">
          <Button
            onClick={clearFilters}
            variant="outline"
            className="rounded-none border-primary text-primary hover:bg-primary/10"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
