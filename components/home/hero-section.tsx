"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"

export default function HeroSection() {
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  useEffect(() => {
    if (videoRef.current) {
      // Browsers often block autoplay with sound. 
      // We start muted to ensure autoplay works, then try to unmute.
      const attemptUnmute = async () => {
        if (!videoRef.current) return

        try {
          // If the user has "autoplay enabled" in browser settings, 
          // this might work without interaction.
          videoRef.current.muted = false
          await videoRef.current.play()
          setIsMuted(false)
        } catch (error) {
          // If it fails, we revert to muted autoplay
          videoRef.current.muted = true
          await videoRef.current.play()
          setIsMuted(true)
        }
      }

      attemptUnmute()
    }
  }, [])

  return (
    <section
      aria-label="Hero Video"
      className="relative w-full overflow-hidden bg-black h-[50dvh] md:h-[100svh] min-h-[350px] md:min-h-[560px]"
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-bottom"
        >
          <source src="https://storage.googleapis.com/yesj/website/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Mute/Unmute Toggle */}
      <div className="absolute bottom-6 right-6 z-20">
        <button
          onClick={toggleMute}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md border border-white/10 hover:bg-black/40 transition-all active:scale-95"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5 opacity-70" />
          ) : (
            <Volume2 className="h-5 w-5" />
          )}
        </button>
      </div>
    </section>
  )
}
