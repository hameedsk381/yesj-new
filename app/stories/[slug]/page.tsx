import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { eq } from "drizzle-orm"
import { Calendar, User, ArrowLeft } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { db } from "@/lib/db"
import { stories } from "@/lib/db/schema"
import { siteConfig } from "@/lib/config"
import { BreadcrumbJsonLd } from "@/lib/breadcrumb-schema"
import { isRemoteImage } from "@/lib/utils"

export const dynamic = "force-dynamic"

async function getStory(slug: string) {
  try {
    return await db.query.stories.findFirst({ where: eq(stories.slug, slug) })
  } catch (error) {
    console.error("Failed to load story:", error)
    return null
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const story = await getStory(params.slug)
  if (!story) {
    return { title: "Story Not Found | YESJ" }
  }
  const description = story.excerpt || `${story.title} - Stories from YESJ`
  return {
    title: `${story.title} | YESJ Stories`,
    description,
    alternates: { canonical: `${siteConfig.url}/stories/${story.slug}` },
    openGraph: {
      type: "article",
      locale: "en_IN",
      url: `${siteConfig.url}/stories/${story.slug}`,
      siteName: "YESJ",
      title: story.title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description,
    },
  }
}

export default async function StoryDetailPage({ params }: { params: { slug: string } }) {
  const story = await getStory(params.slug)

  if (!story) {
    notFound()
  }

  const paragraphs = (story.content || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: siteConfig.url },
        { name: "Stories", url: `${siteConfig.url}/stories` },
        { name: story.title, url: `${siteConfig.url}/stories/${story.slug}` },
      ]} />
      <main className="flex-1">
        <article className="py-16 lg:py-24">
          <div className="container mx-auto px-6 max-w-3xl">
            <Link href="/stories" className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-8">
              <ArrowLeft className="h-4 w-4" /> Back to Stories
            </Link>

            <span className="inline-block px-4 py-1.5 bg-primary/10 rounded-md text-[10px] font-black uppercase tracking-widest text-primary mb-4">
              {story.category || "General"}
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 leading-tight mb-4">
              {story.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-gray-400 font-medium mb-8">
              <span className="flex items-center gap-1"><User className="w-3 h-3" /> {story.author || "YESJ Team"}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {story.createdAt ? new Date(story.createdAt).toLocaleDateString() : ""}</span>
            </div>

            {story.excerpt && (
              <p className="text-xl text-gray-600 font-light leading-relaxed mb-8 border-l-4 border-primary pl-5">
                {story.excerpt}
              </p>
            )}

            {story.imagePath && (
              <div className="relative aspect-video w-full mb-10 overflow-hidden rounded-md shadow-lg">
                <Image
                  src={story.imagePath}
                  alt={story.title}
                  fill
                  priority
                  unoptimized={isRemoteImage(story.imagePath)}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            )}

            {paragraphs.length > 0 ? (
              <div className="space-y-6">
                {paragraphs.map((p, i) => (
                  <p key={i} className="text-lg text-gray-700 leading-relaxed">{p}</p>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic">Full story coming soon.</p>
            )}

            <div className="mt-12 pt-8 border-t border-gray-100">
              <Link href="/stories" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                <ArrowLeft className="h-4 w-4" /> More Stories
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}