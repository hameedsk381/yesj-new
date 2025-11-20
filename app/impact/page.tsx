import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import PageHeader from "@/components/shared/page-header"
import SectionHeader from "@/components/shared/section-header"
import NewsletterSection from "@/components/home/newsletter-section"
import Image from "next/image"
import { Users, MapPin, GraduationCap, Trophy } from "lucide-react"

export const metadata = {
  title: "Impact & Stories - YESJ | This Is What YES Looks Like",
  description: "Discover the transformative impact of YESJ programs across Telugu states. 50,000+ lives transformed. 50,000+ stories of hope.",
}

export default function ImpactPage() {
  const stats = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      number: "50,000+",
      label: "Youth Directly Impacted"
    },
    {
      icon: <MapPin className="h-8 w-8 text-primary" />,
      number: "15",
      label: "Districts Covered"
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-primary" />,
      number: "10+",
      label: "Programs Running"
    },
    {
      icon: <Trophy className="h-8 w-8 text-primary" />,
      number: "3,000+",
      label: "Youth Leaders Trained"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      number: "500+",
      label: "Annual Volunteers"
    },
    {
      icon: <Trophy className="h-8 w-8 text-primary" />,
      number: "85%",
      label: "Employment Success Rate"
    }
  ]

  const stories = [
    {
      name: "Lakshmi, 22",
      role: "Summer Shapes Graduate | Customer Care Executive",
      quote: "\"In my village, English was not a language—it was a wall. A wall that kept people like me out of opportunities, out of cities, out of dreams.\"",
      content: [
        "Lakshmi grew up in a family of agricultural laborers in Guntur district. She completed B.Com from a Telugu-medium college but couldn't find work beyond local shops paying ₹5,000/month due to her limited English.",
        "After joining Summer Shapes, Lakshmi transformed in just 30 days. The immersive English-only environment, supportive peer community, and personality development sessions gave her the confidence she needed.",
        "Today, she's a customer care executive at a tech company in Hyderabad earning ₹18,000/month, supporting her family and funding her younger sister's education."
      ],
      metrics: [
        { value: "260%", label: "Income Increase" },
        { value: "9/10", label: "Confidence Score" },
        { value: "6", label: "Family Members Supported" }
      ],
      image: "/assets/gallery/pro1.jpg"
    },
    {
      name: "Ravi Kumar, 35",
      role: "MuST - Driving Program | Professional Driver",
      quote: "\"I watched my classmates go to college while I mixed cement. Society wrote me off as another dropout. I started believing them.\"",
      content: [
        "Ravi dropped out after Class 10 when his father fell ill. He worked construction sites for ₹300/day with no prospects for the future. At 18, a YESJ volunteer told him about the MuST Driving program.",
        "The 4-month program changed everything. He learned commercial driving and basic mechanics, receiving hands-on training and certification.",
        "Now he works at a company earning ₹25,000/month—more than his father ever earned. He's building his family's first pucca house and ensuring his younger brother finishes school."
      ],
      metrics: [
        { value: "533%", label: "Income Increase" },
        { value: "Building", label: "First Family Home" },
        { value: "2", label: "Siblings Supported" }
      ],
      image: "/assets/gallery/pro2.jpg"
    },
    {
      name: "Srinivas, 20",
      role: "Scholar Support Program | Engineering Student",
      quote: "\"I watched my admission deadline pass. The day I should've been starting college, I was working in the fields. That was my reality.\"",
      content: [
        "Srinivas scored 95% in Class 12 and ranked in the top 1% of state engineering entrance exams. But his parents—daily wage agricultural workers—couldn't afford ₹2 lakhs/year for B.Tech.",
        "Through SSP's rigorous selection process, Srinivas received full scholarship support. Beyond tuition, he got mentorship, career counseling, and emotional support.",
        "Now in 3rd year of B.Tech (Computer Science) with 8.5 CGPA, he's secured a summer internship at a major tech company. After graduation, he plans to join civil services to reform rural education."
      ],
      metrics: [
        { value: "8.5", label: "CGPA" },
        { value: "Secured", label: "Summer Internship" },
        { value: "Civil Services", label: "Future Goal" }
      ],
      image: "/assets/gallery/pro3.jpg"
    },
    {
      name: "Priya, 24",
      role: "MuST - Tailoring | Entrepreneur",
      quote: "\"I loved my family, but I felt invisible. I had no income, no voice in financial decisions, no identity beyond 'mother' and 'wife.'\"",
      content: [
        "Priya was married at 17 and dropped out of school at Class 8. For six years, she was economically dependent on her husband with two young children.",
        "Despite initial resistance, her mother-in-law supported her joining YESJ's tailoring program. The 3-month training covered not just sewing but business management and pricing strategies.",
        "Today, Priya runs her own tailoring business from home earning ₹15,000-20,000/month. She's employed two other women from her neighborhood, creating a ripple effect of empowerment."
      ],
      metrics: [
        { value: "₹15-20k", label: "Monthly Income" },
        { value: "2", label: "Women Employed" },
        { value: "Major", label: "Household Contributor" }
      ],
      image: "/assets/gallery/pro4.jpg"
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <PageHeader
          title="This Is What YES Looks Like"
          description="50,000 lives transformed. 50,000 stories of hope."
        />

        <section className="w-full py-12 md:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <SectionHeader
              title="Impact Dashboard"
              description="Measuring our transformational impact across communities"
              subtitle="By the Numbers"
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="p-6 bg-gradient-to-br from-blue-50 to-primary/5 rounded-lg border border-primary/10 text-center hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground font-extralight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-20 bg-blue-50">
          <div className="container px-4 md:px-6">
            <SectionHeader
              title="Transformation Stories"
              description="Real stories of real people whose lives have been transformed"
              subtitle="Impact in Action"
            />
            
            <div className="space-y-16 mt-12">
              {stories.map((story, index) => (
                <div key={index} className={`bg-white rounded-lg shadow-lg overflow-hidden ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:flex`}>
                  <div className="md:w-1/2">
                    <Image
                      src={story.image}
                      alt={story.name}
                      width={600}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <h3 className="text-2xl font-light text-primary mb-2">{story.name}</h3>
                    <p className="text-muted-foreground mb-6">{story.role}</p>
                    <blockquote className="text-lg italic text-muted-foreground border-l-4 border-primary pl-4 mb-6">
                      {story.quote}
                    </blockquote>
                    <div className="space-y-4 mb-6">
                      {story.content.map((paragraph, idx) => (
                        <p key={idx} className="text-muted-foreground font-extralight">{paragraph}</p>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                      {story.metrics.map((metric, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-xl font-bold text-primary">{metric.value}</div>
                          <div className="text-sm text-muted-foreground">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}