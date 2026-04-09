"use client"

export default function HeroSection() {
  return (
    <section
      aria-label="Hero Video"
      className="relative w-full overflow-hidden bg-black h-[50dvh] md:h-[100svh] min-h-[350px] md:min-h-[560px]"
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-bottom"
        >
          <source src="https://storage.googleapis.com/yesj/website/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  )
}
