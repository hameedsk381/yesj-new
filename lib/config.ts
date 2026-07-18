export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "YESJ - Youth Empowering Service Jesuits",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://yesj.org",
  description: "Empowering 70,000+ youth across Telugu states to break barriers and build futures. Join YESJ to make a difference in your community.",

  social: {
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || "https://instagram.com/yesj.official",
    facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || "https://facebook.com/yesj.official",
    twitter: process.env.NEXT_PUBLIC_SOCIAL_TWITTER || "https://x.com/yesj.official",
    youtube: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || "https://youtube.com/yesj.official",
    linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || "https://linkedin.com/company/yesj.official",
  },

  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@yesj.org",
    directorEmail: "directoryesj@gmail.com",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+91-868-672-7202",
    whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || "+91-868-672-7202",
  },

  analytics: {
    googleId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_CODE,
  },
}
