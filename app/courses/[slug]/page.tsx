import type { Metadata } from "next"
import CourseDetailClient from "./client-page"
import { siteConfig } from "@/lib/config"

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const res = await fetch(`${siteConfig.url}/api/courses/${params.slug}`, { next: { revalidate: 60 } })
    if (!res.ok) return { title: "Course - YESJ" }
    const course = await res.json()
    return {
      title: `${course.title} - YESJ Courses`,
      description: course.shortDescription || course.description || `Enroll in ${course.title} at YESJ`,
      alternates: { canonical: `${siteConfig.url}/courses/${params.slug}` },
      openGraph: {
        title: `${course.title} - YESJ Courses`,
        description: course.shortDescription || `Enroll in ${course.title}`,
        url: `${siteConfig.url}/courses/${params.slug}`,
        siteName: "YESJ",
        locale: "en_IN",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: `${course.title} - YESJ Courses`,
        description: course.shortDescription || `Enroll in ${course.title}`,
      },
    }
  } catch {
    return { title: "Course - YESJ" }
  }
}

export default function CourseDetailPage({ params }: Props) {
  return <CourseDetailClient slug={params.slug} />
}
