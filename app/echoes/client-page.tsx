"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Download, Eye, FileText, Search, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

type Echo = {
  id: number
  title: string
  edition: string
  filePath: string
  thumbnailPath: string
  description: string
  releaseDate: string
}

function PDFThumbnail({ url }: { url: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const renderThumbnail = async () => {
      try {
        // Load pdf.js from CDN dynamically if not available
        const pdfjsLib = (window as any)['pdfjs-dist/build/pdf']
        if (!pdfjsLib) {
          const script = document.createElement('script')
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'
          script.onload = () => renderThumbnail()
          document.head.appendChild(script)
          return
        }

        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'

        const loadingTask = pdfjsLib.getDocument(url)
        const pdf = await loadingTask.promise
        const page = await pdf.getPage(1)
        
        const viewport = page.getViewport({ scale: 0.5 })
        const canvas = canvasRef.current
        if (!canvas) return

        const context = canvas.getContext('2d')
        canvas.height = viewport.height
        canvas.width = viewport.width

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        }
        await page.render(renderContext).promise
        setLoading(false)
      } catch (err) {
        console.error("Error rendering PDF thumbnail:", err)
        setError(true)
        setLoading(false)
      }
    }

    renderThumbnail()
  }, [url])

  return (
    <div className="relative w-full h-full bg-muted flex items-center justify-center overflow-hidden">
      {loading && (
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Rendering...</span>
        </div>
      )}
      {error ? (
        <FileText className="h-12 w-12 text-muted-foreground opacity-20" />
      ) : (
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      )}
    </div>
  )
}

export default function EchoesPage() {
  const [echoes, setEchoes] = useState<Echo[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchEchoes = async () => {
      try {
        const res = await fetch("/api/echoes")
        if (res.ok) {
          const data = await res.json()
          setEchoes(data)
        }
      } catch (err) {
        console.error("Failed to fetch echoes", err)
      } finally {
        setLoading(false)
      }
    }
    fetchEchoes()
  }, [])

  const filteredEchoes = echoes.filter(
    (echo) =>
      echo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      echo.edition.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 bg-background pt-32 pb-20">
        {/* Hero Section */}
        <section className="container px-5 mb-16">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-6">
                ECHOES <span className="text-primary italic">PERIODICALS</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Discover the journey, stories, and impact of YESJ through our official publications. 
                Experience the voices of resilience and transformation preserved in every edition.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 relative max-w-md"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search editions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              />
            </motion.div>
          </div>
        </section>

        {/* Display Showcase */}
        <section className="container px-5">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/5] bg-muted rounded-xl mb-4" />
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12">
              {filteredEchoes.map((echo, index) => (
                <motion.div
                  key={echo.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group"
                >
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(189,153,61,0.25)]">
                    {/* Use static thumbnail if it's not a placeholder, otherwise use live PDF preview */}
                    {echo.thumbnailPath && !echo.thumbnailPath.includes('placehold.co') ? (
                      <Image
                        src={echo.thumbnailPath}
                        alt={echo.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        unoptimized={echo.thumbnailPath.includes('storage.googleapis.com')}
                      />
                    ) : (
                      <PDFThumbnail url={echo.filePath} />
                    )}
                    
                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 z-20">
                      <Button asChild variant="outline" className="bg-white text-black border-none hover:bg-white/90 rounded-full px-6">
                        <a href={echo.filePath} target="_blank" rel="noopener noreferrer">
                          <Eye className="mr-2 h-4 w-4" /> View
                        </a>
                      </Button>
                      <Button asChild variant="ghost" className="text-white hover:bg-white/20 rounded-full px-6">
                        <a href={echo.filePath} download>
                          <Download className="mr-2 h-4 w-4" /> Download
                        </a>
                      </Button>
                    </div>
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-primary text-black text-[10px] font-black px-2 py-1 rounded tracking-tighter uppercase">
                        {echo.edition}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-5">
                    <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                      {echo.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Released {new Date(echo.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && filteredEchoes.length === 0 && (
            <div className="py-20 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
              <p className="text-muted-foreground font-medium">No editions found matching your search.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
