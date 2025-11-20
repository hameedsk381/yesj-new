"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { CAROUSEL } from "@/lib/constants"

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  autoPlay?: boolean
  autoPlayInterval?: number
  onSlideChange?: (index: number) => void
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ className, children, autoPlay = true, autoPlayInterval = CAROUSEL.AUTO_PLAY_INTERVAL, onSlideChange, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const childrenArray = React.Children.toArray(children)
    const totalSlides = childrenArray.length

    // Call onSlideChange callback when currentIndex changes
    React.useEffect(() => {
      if (onSlideChange) {
        onSlideChange(currentIndex)
      }
    }, [currentIndex, onSlideChange])

    React.useEffect(() => {
      if (!autoPlay || totalSlides <= 1) return

      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
      }, autoPlayInterval)

      return () => clearInterval(interval)
    }, [autoPlay, autoPlayInterval, totalSlides])

    const goToPrevious = () => {
      const newIndex = (currentIndex - 1 + totalSlides) % totalSlides
      setCurrentIndex(newIndex)
    }

    const goToNext = () => {
      const newIndex = (currentIndex + 1) % totalSlides
      setCurrentIndex(newIndex)
    }

    return (
      <div className={cn("relative overflow-hidden", className)} {...props} ref={ref}>
        <div
          className="flex transition-transform duration-500 ease-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {childrenArray.map((child, index) => (
            <div key={index} className="w-full flex-shrink-0 h-full">
              {child}
            </div>
          ))}
        </div>

        {totalSlides > 1 && (
          <>
            <button
              onClick={() => {
                const newIndex = (currentIndex - 1 + totalSlides) % totalSlides
                setCurrentIndex(newIndex)
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-lg transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => {
                const newIndex = (currentIndex + 1) % totalSlides
                setCurrentIndex(newIndex)
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-lg transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {childrenArray.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    currentIndex === index ? "bg-white w-8" : "bg-white/50"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    )
  }
)
Carousel.displayName = "Carousel"

export { Carousel }
