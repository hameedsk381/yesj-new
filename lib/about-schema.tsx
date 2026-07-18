import { siteConfig } from "./config"

export function AboutPageJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About YESJ - Youth Empowering Service Jesuits",
    "description": "Learn about the Jesuit foundation of YESJ. Discover our story, the YES philosophy, and the principles guiding youth empowerment across Andhra Pradesh and Telangana since 2016.",
    "url": `${siteConfig.url}/about`,
    "mainEntity": {
      "@type": "Organization",
      "name": "YESJ - Youth Empowering Service Jesuits",
      "alternateName": "Youth Empowering Service - Jesuits",
      "url": siteConfig.url,
      "logo": `${siteConfig.url}/YESJ_Logo_Black-eaf43d27.png`,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
