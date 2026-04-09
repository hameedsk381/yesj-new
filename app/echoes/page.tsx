import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { db } from "@/lib/db"
import { echoes } from "@/lib/db/schema"
import { desc } from "drizzle-orm"
import { Download, FileText, Calendar } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

export default async function EchoesPage() {
  const releases = await db.select().from(echoes).orderBy(desc(echoes.createdAt))

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-background pt-32 pb-24">
        <div className="container px-6 lg:px-12">
          <div className="max-w-4xl mb-16 space-y-6">
            <div className="text-primary uppercase tracking-[0.4em] text-xs font-bold">Newsletter</div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-tight">
              Echoes: Stories of Solidarity
            </h1>
            <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-2xl">
              Our periodic newsletter documenting the journeys, updates, and voices of transformation across our YESJ clusters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {releases.length === 0 ? (
              <div className="col-span-full py-20 text-center border-2 border-dashed rounded-3xl text-muted-foreground font-light">
                New editions of Echoes will be published here soon.
              </div>
            ) : (
              releases.map((release) => (
                <div key={release.id} className="group flex flex-col space-y-6">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-gray-100 shadow-xl border border-border/50">
                    {release.thumbnailPath ? (
                      <Image 
                        src={release.thumbnailPath} 
                        alt={release.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110" 
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-primary/20 bg-primary/5">
                        <FileText size={120} strokeWidth={1} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <a href={release.filePath} target="_blank" rel="noopener noreferrer">
                            <Button className="bg-white text-primary hover:bg-white/90 rounded-full h-14 w-14 shadow-2xl">
                                <Download />
                            </Button>
                        </a>
                    </div>
                  </div>
                  
                  <div className="space-y-3 px-2">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest">
                       <Calendar size={12} />
                       {release.edition || "Latest Issue"}
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                      {release.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 font-light leading-relaxed">
                      {release.description}
                    </p>
                    <div className="pt-2">
                        <a href={release.filePath} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-primary hover:underline gap-2">
                            Download PDF <Download size={14} />
                        </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
