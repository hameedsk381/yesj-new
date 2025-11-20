import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import PageHeader from "@/components/shared/page-header"
import SectionHeader from "@/components/shared/section-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Star, Gift, Backpack } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Get Involved - YESJ | Your YES Can Change Everything",
  description: "Join our movement to empower youth across Telugu states through volunteer service, donations, and partnerships.",
}

export default function VolunteerPage() {
  const fourTs = [
    {
      icon: <Clock className="h-12 w-12 text-primary" />,
      title: "TIME",
      subtitle: "Commitment Levels",
      commitments: [
        { level: "Micro (1-5 hours)", description: "Guest speaker, Career counseling" },
        { level: "Short-term (1 day - 1 month)", description: "Summer Shapes assistant, Event support" },
        { level: "Long-term (3-12 months)", description: "VIP, EOTT Ignitor, Program coordination" }
      ]
    },
    {
      icon: <Star className="h-12 w-12 text-primary" />,
      title: "TALENT",
      subtitle: "Skills We Need",
      commitments: [
        "Teaching & Training",
        "Counseling & Psychology",
        "Marketing & Communications",
        "IT & Technology",
        "Legal & Financial",
        "Mentorship abilities"
      ]
    },
    {
      icon: <Gift className="h-12 w-12 text-primary" />,
      title: "TREASURE",
      subtitle: "Financial Contributions",
      commitments: [
        "Monthly giving programs",
        "One-time donations",
        "In-kind donations (equipment, materials)",
        "Infrastructure support"
      ]
    },
    {
      icon: <Backpack className="h-12 w-12 text-primary" />,
      title: "TESTIMONY",
      subtitle: "Be an Ambassador",
      commitments: [
        "Share our story on social media",
        "Host awareness events",
        "Connect us with potential donors",
        "Advocate for youth empowerment"
      ]
    }
  ]

  const volunteerBenefits = [
    {
      title: "Professional Growth",
      items: [
        "Certificate of service",
        "Skill development",
        "Leadership experience"
      ]
    },
    {
      title: "Support Provided",
      items: [
        "Meals and accommodation",
        "Training and onboarding",
        "Ongoing mentorship"
      ]
    },
    {
      title: "Personal Impact",
      items: [
        "Personal transformation",
        "Meaningful connections",
        "Lifelong YESJ family"
      ]
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <PageHeader
          title="Your YES Can Change Everything"
          description="Three powerful ways to join the movement"
        />

        <section className="w-full py-12 md:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <SectionHeader
              title="PATHWAY 1: BECOME A VOLUNTEER"
              description="Give Your TIME, TALENT, TREASURE, TESTIMONY"
              subtitle="Four T's of Volunteering"
            />
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mt-12">
              {fourTs.map((t, index) => (
                <Card key={index} className="border-primary/10 hover:border-primary/30 transition-all text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      {t.icon}
                    </div>
                    <CardTitle className="text-primary text-4xl mb-2">{t.title}</CardTitle>
                    <CardDescription className="font-light text-lg">{t.subtitle}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-left">
                      {t.commitments.map((commitment, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-muted-foreground font-extralight">
                          <span className="text-primary font-bold">→</span>
                          {typeof commitment === 'string' ? (
                            <span>{commitment}</span>
                          ) : (
                            <div>
                              <span className="font-medium">{commitment.level}:</span> {commitment.description}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-20 bg-blue-50">
          <div className="container px-4 md:px-6">
            <SectionHeader
              title="Volunteer Benefits"
              description="What you gain from volunteering with YESJ"
              subtitle="Why Volunteer"
            />
            
            <div className="grid gap-8 md:grid-cols-3 mt-12">
              {volunteerBenefits.map((benefit, index) => (
                <Card key={index} className="border-primary/10 hover:border-primary/30 transition-all">
                  <CardHeader>
                    <CardTitle className="text-primary">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {benefit.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-muted-foreground font-extralight">
                          <span className="text-green-500">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg">
                Register as Volunteer
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}