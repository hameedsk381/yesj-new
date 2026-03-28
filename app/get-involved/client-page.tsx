"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, GraduationCap, Handshake, Heart, Users } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"

const involvementOptions = [
  {
    title: "Volunteer",
    description:
      "Give your time and talent. Whether for a day, a week, or a year, your presence matters across VIP, MAGIC, EOTT, and Compassion Connect.",
    href: "/contact?program=vip&subject=Volunteer%20Application#contact-form",
    cta: "Apply as Volunteer",
    icon: <Users className="h-5 w-5" aria-hidden="true" />,
  },
  {
    title: "Donate",
    description:
      "Your contribution directly funds training, scholarships, and relief support for young people and families who need it most.",
    href: "/donate",
    cta: "Donate Now",
    icon: <Heart className="h-5 w-5" aria-hidden="true" />,
  },
  {
    title: "Partner",
    description:
      "If your institution or company wants to build social impact with YES-J, we can co-create meaningful programmes and collaborations.",
    href: "/contact?subject=Partnership%20Inquiry#contact-form",
    cta: "Partner with Us",
    icon: <Handshake className="h-5 w-5" aria-hidden="true" />,
  },
  {
    title: "Intern",
    description:
      "Join YES-J for 1 to 6 months and contribute through field visits, coordination, communications, and programme support while learning by doing.",
    href: "/contact?subject=Internship%20Application#contact-form",
    cta: "Apply for Internship",
    icon: <GraduationCap className="h-5 w-5" aria-hidden="true" />,
  },
]

const internshipDetails = [
  { label: "Duration", value: "1 month to 6 months" },
  {
    label: "Who Can Apply",
    value:
      "Students of any discipline, with social work, management, communications, education, and psychology especially relevant.",
  },
  {
    label: "What You Do",
    value: "Support programme delivery, content creation, field visits, and administrative tasks.",
  },
  {
    label: "What You Gain",
    value: "Real-world exposure, mentoring, a certificate, and a reference letter.",
  },
  {
    label: "Stipend",
    value: "As per YES-J capacity. Final confirmation happens during selection.",
  },
  {
    label: "How to Apply",
    value: "Submit through the YES-J contact form with the subject line Internship Application.",
  },
]

export default function GetInvolvedClientPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border bg-background pt-32 lg:pt-36">
          <div className="container px-6 py-16 lg:px-8 lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl space-y-5"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                Get Involved
              </p>
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-5xl">
                Your YES Makes All the Difference
              </h1>
              <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                There are many ways to walk with YES-J. Find the one that fits you.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="border-b border-border bg-background">
          <div className="container px-6 py-16 lg:px-8 lg:py-20">
            <div className="grid gap-6 lg:grid-cols-2">
              {involvementOptions.map((option, index) => (
                <motion.article
                  key={option.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="flex h-full flex-col border border-border bg-card p-7 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 text-primary">
                    {option.icon}
                    <h2 className="text-2xl font-semibold text-foreground">{option.title}</h2>
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">
                    {option.description}
                  </p>
                  <Button asChild className="mt-6 w-fit rounded-md bg-primary text-white hover:bg-primary/90">
                    <Link href={option.href}>
                      {option.cta}
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="internship-details" className="scroll-mt-32 border-b border-border bg-background">
          <div className="container px-6 py-16 lg:px-8 lg:py-20">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                Internship Details
              </p>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                A structured way to learn while contributing
              </h2>
              <p className="text-base leading-8 text-muted-foreground">
                Internship roles are designed for students who want field exposure, strong
                mentoring, and direct involvement in youth programmes.
              </p>
            </div>

            <div className="mt-10 overflow-hidden border border-border bg-background">
              <dl className="divide-y divide-border">
                {internshipDetails.map((item) => (
                  <div
                    key={item.label}
                    className="grid gap-2 px-5 py-4 md:grid-cols-[220px_minmax(0,1fr)] md:gap-6"
                  >
                    <dt className="text-sm font-semibold text-foreground">{item.label}</dt>
                    <dd className="text-sm leading-7 text-muted-foreground">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="rounded-md bg-primary text-white hover:bg-primary/90">
                <Link href="/contact?subject=Internship%20Application#contact-form">
                  Apply for Internship
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-md">
                <Link href="/volunteer">Explore Volunteering</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
