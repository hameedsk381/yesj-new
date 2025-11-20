import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import PageHeader from "@/components/shared/page-header"
import SectionHeader from "@/components/shared/section-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Handshake, Users, TrendingUp, Globe, Heart } from "lucide-react"

export const metadata = {
  title: "Partner with YESJ",
  description: "Explore partnership opportunities to empower youth across Telugu states through collaborative initiatives and shared resources.",
}

export default function PartnersPage() {
  const partnershipBenefits = [
    {
      title: "Shared Impact",
      description: "Amplify your social impact by aligning with our mission to empower youth across Telugu states.",
      icon: <Handshake className="h-6 w-6 text-primary" />,
    },
    {
      title: "Community Reach",
      description: "Access our network of 50,000+ youth and community stakeholders across Andhra Pradesh and Telangana.",
      icon: <Users className="h-6 w-6 text-primary" />,
    },
    {
      title: "Brand Alignment",
      description: "Associate your brand with positive social change and youth empowerment initiatives.",
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
    },
    {
      title: "CSR Compliance",
      description: "Meet your corporate social responsibility goals through meaningful, measurable impact programs.",
      icon: <Globe className="h-6 w-6 text-primary" />,
    },
  ]

  const partnershipTypes = [
    {
      title: "Corporate Partnerships",
      description: "Collaborate on programs that align with your CSR objectives and business values.",
      benefits: [
        "Employee volunteering opportunities",
        "Cause marketing campaigns",
        "Skill-based pro bono services",
        "In-kind donations",
      ],
    },
    {
      title: "Educational Institutions",
      description: "Partner with us to extend our reach to students and faculty in your institution.",
      benefits: [
        "Student leadership programs",
        "Faculty development workshops",
        "Research collaborations",
        "Internship opportunities",
      ],
    },
    {
      title: "NGO & Community Organizations",
      description: "Work together to maximize our collective impact on youth empowerment.",
      benefits: [
        "Joint program implementation",
        "Resource sharing",
        "Capacity building",
        "Advocacy initiatives",
      ],
    },
    {
      title: "Government Agencies",
      description: "Collaborate on policy implementation and community development initiatives.",
      benefits: [
        "Program co-design",
        "Implementation support",
        "Monitoring & evaluation",
        "Knowledge sharing",
      ],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <PageHeader
          title="Partner with YESJ"
          description="Join hands with us to empower 50,000+ youth across Telugu states through collaborative initiatives."
        />

        <section className="w-full py-12 md:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <SectionHeader
              title="PATHWAY 3: PARTNER WITH US"
              description="Multiply Impact Through Strategic Partnerships"
              subtitle="Partnership Types"
            />
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <Card className="border-primary/10 hover:border-primary/30 transition-all text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Users className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-primary">Educational Institutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-left">
                    <li className="flex items-start gap-2 text-muted-foreground font-extralight">
                      <span className="text-primary font-bold">→</span>
                      <span>Establish MAGIC Youth chapters</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground font-extralight">
                      <span className="text-primary font-bold">→</span>
                      <span>Host PEP programs</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground font-extralight">
                      <span className="text-primary font-bold">→</span>
                      <span>Student volunteer placements</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground font-extralight">
                      <span className="text-primary font-bold">→</span>
                      <span>Research partnerships</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-primary/10 hover:border-primary/30 transition-all text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Globe className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-primary">Corporations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-left">
                    <li className="flex items-start gap-2 text-muted-foreground font-extralight">
                      <span className="text-primary font-bold">→</span>
                      <span>CSR program funding</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground font-extralight">
                      <span className="text-primary font-bold">→</span>
                      <span>Skill training collaborations</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground font-extralight">
                      <span className="text-primary font-bold">→</span>
                      <span>Employee volunteering</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground font-extralight">
                      <span className="text-primary font-bold">→</span>
                      <span>Placement partnerships</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-primary/10 hover:border-primary/30 transition-all text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Handshake className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-primary">NGOs & Organizations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-left">
                    <li className="flex items-start gap-2 text-muted-foreground font-extralight">
                      <span className="text-primary font-bold">→</span>
                      <span>Joint program implementation</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground font-extralight">
                      <span className="text-primary font-bold">→</span>
                      <span>Resource sharing</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground font-extralight">
                      <span className="text-primary font-bold">→</span>
                      <span>Network expansion</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground font-extralight">
                      <span className="text-primary font-bold">→</span>
                      <span>Best practice exchange</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-primary/10 hover:border-primary/30 transition-all text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <TrendingUp className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-primary">Government</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-left">
                    <li className="flex items-start gap-2 text-muted-foreground font-extralight">
                      <span className="text-primary font-bold">→</span>
                      <span>Skill India alignment</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground font-extralight">
                      <span className="text-primary font-bold">→</span>
                      <span>Rural development schemes</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground font-extralight">
                      <span className="text-primary font-bold">→</span>
                      <span>Youth empowerment initiatives</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground font-extralight">
                      <span className="text-primary font-bold">→</span>
                      <span>Policy input and feedback</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-primary/10 hover:border-primary/30 transition-all text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Heart className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-primary">Parishes & Churches</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-left">
                    <li className="flex items-start gap-2 text-muted-foreground font-extralight">
                      <span className="text-primary font-bold">→</span>
                      <span>Community mobilization</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground font-extralight">
                      <span className="text-primary font-bold">→</span>
                      <span>EOTT center establishment</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground font-extralight">
                      <span className="text-primary font-bold">→</span>
                      <span>Faith formation programs</span>
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground font-extralight">
                      <span className="text-primary font-bold">→</span>
                      <span>Social outreach collaboration</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-20 bg-blue-50">
          <div className="container px-4 md:px-6">
            <SectionHeader
              title="Partnership Opportunities"
              description="Explore different ways to collaborate with us"
              subtitle="How We Work Together"
            />
            
            <div className="grid gap-8 md:grid-cols-2 mt-12">
              {partnershipTypes.map((type, index) => (
                <Card key={index} className="border-primary/10 hover:border-primary/30 transition-all">
                  <CardHeader>
                    <CardTitle className="text-primary">{type.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="font-extralight mb-4">
                      {type.description}
                    </CardDescription>
                    <div className="space-y-2">
                      <h4 className="font-light text-primary">Key Benefits:</h4>
                      <ul className="space-y-1">
                        {type.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="text-muted-foreground font-extralight flex items-start gap-2">
                            <span className="text-primary">•</span> {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <SectionHeader
                title="Our Partnership Process"
                subtitle="How We Collaborate"
              />
              
              <div className="grid gap-6 mt-8">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-primary mb-2">Initial Discussion</h3>
                    <p className="text-muted-foreground font-extralight">
                      We start with a conversation to understand your goals, resources, and how they align with our mission.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-primary mb-2">Proposal Development</h3>
                    <p className="text-muted-foreground font-extralight">
                      Our team develops a customized partnership proposal outlining objectives, activities, and expected outcomes.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-primary mb-2">Agreement & Planning</h3>
                    <p className="text-muted-foreground font-extralight">
                      We formalize our partnership through a Memorandum of Understanding and develop detailed implementation plans.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-primary mb-2">Implementation & Monitoring</h3>
                    <p className="text-muted-foreground font-extralight">
                      We work together to implement the partnership activities with regular monitoring and communication.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-primary mb-2">Evaluation & Renewal</h3>
                    <p className="text-muted-foreground font-extralight">
                      We evaluate the partnership's impact and explore opportunities for continued collaboration.
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
                Together, We Say YES to 85 Million Dreams
              </h2>
              <p className="font-extralight mb-8 text-white/90">
                Join the movement that's transforming lives across Telugu states
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 mb-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold mb-2">500+</div>
                  <div className="text-sm font-extralight">Current Volunteers</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold mb-2">1000+</div>
                  <div className="text-sm font-extralight">Active Donors</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold mb-2">50+</div>
                  <div className="text-sm font-extralight">Partner Organizations</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold mb-2">50,000+</div>
                  <div className="text-sm font-extralight">Lives Impacted</div>
                </div>
              </div>
              
              <Button className="rounded-none bg-white text-primary hover:bg-white/90 px-8 py-3 text-lg">
                Find Your Place in the Movement
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}