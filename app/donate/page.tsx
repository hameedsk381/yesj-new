import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import PageHeader from "@/components/shared/page-header"
import SectionHeader from "@/components/shared/section-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, TrendingUp, Heart } from "lucide-react"

export const metadata = {
  title: "Donate to YESJ",
  description: "Support our mission to empower 50,000+ youth across Telugu states through education, leadership, and community service.",
}

export default function DonatePage() {
  const donationImpact = [
    {
      amount: "₹500",
      description: "Provides educational materials for one student for a month",
      icon: <Users className="h-6 w-6 text-primary" />,
    },
    {
      amount: "₹1,500",
      description: "Supports a student's monthly stipend for skill development",
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
    },
    {
      amount: "₹5,000",
      description: "Funds a leadership workshop for 20 youth",
      icon: <Heart className="h-6 w-6 text-primary" />,
    },
    {
      amount: "₹15,000",
      description: "Sponsors one student's annual educational expenses",
      icon: <DollarSign className="h-6 w-6 text-primary" />,
    },
  ]

  const donationOptions = [
    {
      title: "One-time Donation",
      description: "Make a single contribution to support our programs",
      options: ["₹500", "₹1,000", "₹2,500", "₹5,000", "Other"],
    },
    {
      title: "Monthly Giving",
      description: "Become a sustaining donor with automatic monthly contributions",
      options: ["₹500/mo", "₹1,000/mo", "₹2,500/mo", "₹5,000/mo", "Custom"],
    },
    {
      title: "Corporate Partnership",
      description: "Engage your organization in meaningful social impact",
      options: ["Sponsorship", "Employee Matching", "In-kind Donations"],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <PageHeader
          title="Donate to YESJ"
          description="Your generosity empowers 50,000+ youth across Telugu states to break barriers and build futures."
        />

        <section className="w-full py-12 md:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <SectionHeader
              title="PATHWAY 2: DONATE / SPONSOR"
              description="Invest in Futures, Not Just Programs"
              subtitle="Specific Programs"
            />
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mt-12">
              <Card className="border-primary/10 hover:border-primary/30 transition-all text-center">
                <CardHeader>
                  <CardTitle className="text-primary text-3xl mb-2">₹25,000</CardTitle>
                  <CardDescription className="font-light text-lg">Summer Shapes Participant</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-extralight">
                    Full 30-day residential program with updates, progress reports, and optional meet with your sponsored participant.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-primary/10 hover:border-primary/30 transition-all text-center">
                <CardHeader>
                  <CardTitle className="text-primary text-3xl mb-2">₹50,000</CardTitle>
                  <CardDescription className="font-light text-lg">Skill Training Student</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-extralight">
                    Complete MuST program for one student including job placement support and documented transformation.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-primary/10 hover:border-primary/30 transition-all text-center">
                <CardHeader>
                  <CardTitle className="text-primary text-3xl mb-2">₹2,00,000</CardTitle>
                  <CardDescription className="font-light text-lg">Scholar (SSP) - Per Year</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-extralight">
                    Full academic year support with mentorship, holistic development, annual updates, and optional personal interaction.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-primary/10 hover:border-primary/30 transition-all text-center">
                <CardHeader>
                  <CardTitle className="text-primary text-3xl mb-2">₹1,00,000</CardTitle>
                  <CardDescription className="font-light text-lg">EOTT Learning Center</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-extralight">
                    Support 50+ children's literacy, employ one ignitor, community-level impact, and named center recognition.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-20 bg-blue-50">
          <div className="container px-4 md:px-6">
            <SectionHeader
              title="Donor Benefits & Recognition"
              subtitle="All Donors"
            />
            
            <div className="grid gap-8 md:grid-cols-3 mt-12">
              <Card className="border-primary/10 hover:border-primary/30 transition-all">
                <CardHeader>
                  <CardTitle className="text-primary">All Donors</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-muted-foreground font-extralight">
                      <span className="text-green-500">✓</span>
                      <span>Tax exemption certificate (80G)</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground font-extralight">
                      <span className="text-green-500">✓</span>
                      <span>Email updates on impact</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground font-extralight">
                      <span className="text-green-500">✓</span>
                      <span>Annual report mailed</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground font-extralight">
                      <span className="text-green-500">✓</span>
                      <span>Invitation to YESJ events</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-primary/10 hover:border-primary/30 transition-all">
                <CardHeader>
                  <CardTitle className="text-primary">Major Donors (₹1,00,000+)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-muted-foreground font-extralight">
                      <span className="text-green-500">✓</span>
                      <span>Personalized impact reports</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground font-extralight">
                      <span className="text-green-500">✓</span>
                      <span>Site visit and observation</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground font-extralight">
                      <span className="text-green-500">✓</span>
                      <span>Website recognition</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground font-extralight">
                      <span className="text-green-500">✓</span>
                      <span>Naming opportunities</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-primary/10 hover:border-primary/30 transition-all">
                <CardHeader>
                  <CardTitle className="text-primary">Founding Circle (₹10,00,000+)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-muted-foreground font-extralight">
                      <span className="text-green-500">✓</span>
                      <span>Board interaction</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground font-extralight">
                      <span className="text-green-500">✓</span>
                      <span>Strategic program input</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground font-extralight">
                      <span className="text-green-500">✓</span>
                      <span>Permanent recognition</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground font-extralight">
                      <span className="text-green-500">✓</span>
                      <span>Legacy partnership</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <SectionHeader
                title="Other Ways to Support"
                subtitle="Beyond Financial Contributions"
              />
              
              <div className="grid gap-6 mt-8">
                <div className="flex items-start gap-4">
                  <Heart className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-light text-primary mb-2">In-kind Donations</h3>
                    <p className="text-muted-foreground font-extralight">
                      Donate books, educational materials, or equipment that support our programs and activities.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-light text-primary mb-2">Skill-based Volunteering</h3>
                    <p className="text-muted-foreground font-extralight">
                      Offer your professional skills in areas like marketing, finance, legal, or technology to support our mission.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <TrendingUp className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-light text-primary mb-2">Corporate Partnerships</h3>
                    <p className="text-muted-foreground font-extralight">
                      Engage your organization in our mission through employee volunteering, cause marketing, or strategic partnerships.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-20 bg-gradient-to-r from-primary to-blue-700 text-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-light tracking-tighter sm:text-4xl mb-6">
                Ready to Transform Lives?
              </h2>
              <p className="font-extralight mb-8 text-white/90">
                Every contribution, no matter the size, helps us empower more youth to break barriers and build futures.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="rounded-none bg-white text-primary hover:bg-white/90 px-8">
                  Donate Now
                </Button>
                <Button variant="outline" className="rounded-none border-white text-white hover:bg-white/10">
                  Contact Development Team
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}